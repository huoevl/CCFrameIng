import _path from "path";
import _xlsx from "xlsx";
import * as fileUtils from "../base/FileUtils";
import { logger } from "../base/Logger";
import { config_xlsx, TransType } from "../config/config_xlsx";

/** 前几行的类型 */
const enum RowType {
    /** 客户端还是服务端：c,s */
    cOrs = 1,
    /** 字段 */
    field = 2,
    /** 字段类型 */
    filedType = 3,
    /** 字段注释 */
    comment = 4,
    /** 数据开始行 */
    data = 5,
}
/** 客户端服务端类型 */
const enum CSType {
    /** 仅客户端 */
    C = "c",
    /** 仅服务端 */
    S = "s",
    /** 两端 */
    CS = "cs",
}


/** xlsx表格的开始行结束行，开始列结束列 */
type TXlsxRange = {
    colS?: string;
    colE?: string;
    rowS?: number;
    rowE?: number;
}
/** 表头 */
type TTabHead = {
    /** 使用到的列，根据cs判断 */
    useCols?: number[];
    /** 字段名 */
    fileds?: string[];
    /** 字段类型 */
    filedTypes?: string[];
    /** 注释 */
    comment?: string[];
}
/** 表数据 */
type TTabData = {

}

export class CmdXlsx {
    /** json数据，客户端 */
    private _jsonObj = {};
    /** lua数据，服务端 */
    private _luaObj = {};
    /** 正在解析的表名称 */
    currXlsxName = "";
    /** 缓存xlsx列计算过的转换数据 */
    numToCharObj: { [num: number]: string } = {};
    /** 表头几行数据 */
    headObj: { [tabName: string]: TTabHead } = {};
    /** 表数据 */
    tabObj: { [tabName: string]: Object } = {};

    /** 执行函数 */
    exec() {
        let itself = this;
        let bastPath = _path.join(__dirname, "../");
        let dir = _path.join(bastPath, "xlsx");
        let dirlist = fileUtils.getDirList(dir);
        logger.info(dirlist)
        for (let index = 0, len = dirlist.length; index < len; index++) {
            let name = dirlist[index];
            let suffix = _path.extname(name);
            if (suffix != ".xlsx") {
                continue;
            }
            if (!name.match(/^[a-zA-Z0-9]+/)) {
                continue;
            }
            let filePath = _path.join(dir, dirlist[index]);
            itself.readXlsx(filePath);
        }
        //写入

    }

    /**
     * 读xlsx文件
     * @param src 
     */
    private readXlsx(src: string) {
        let itself = this;
        let xlsxName = itself.getXlsxName(src);
        itself.currXlsxName = xlsxName;
        logger.info("正在解析", xlsxName, "...")
        let data = _xlsx.readFile(src);
        let sheetNames = data.SheetNames || [];
        for (let index = 0, len = sheetNames.length; index < len; index++) {
            let sheetJson = data.Sheets[sheetNames[index]];
            itself.parseXlsxJson(sheetJson);
        }
        fileUtils.outputJsonSync(_path.join(__dirname, "../", "xlsx", xlsxName + ".json"), data);
    }

    /**
     * 解析xlsx的sheet数据，定义看配置：config_xlsx.ts
     * @param data 
     */
    private parseXlsxJson(data: _xlsx.WorkSheet) {
        let itself = this;
        let range = itself.getRange(data);
        if (!range) {
            return;
        }
        itself.calcHeadObj(data, range);
        let headObj = itself.headObj[itself.currXlsxName];
        let numToChar = itself.numToCharObj;
        for (let rowIndex = RowType.data; rowIndex <= range.rowE; rowIndex++) {
            for (let useIndex = 0, len = headObj.useCols.length; useIndex < len; useIndex++) {
                let colIndex = headObj.useCols[useIndex];
                let colChar = numToChar[colIndex] || (numToChar[colIndex] = itself.getXlsxCharByCol(useIndex));
                let xlsxValue = data[colChar + rowIndex] as _xlsx.CellObject;
                let isValid = itself.isValid(xlsxValue);
                if (!isValid && headObj.fileds[useIndex] == "id") {
                    break;//没有id，不取这行数据
                }
                if (isValid) {
                    continue;
                }
                let value = xlsxValue.w.trim();

            }
        }
    }
    private calcHeadObj(data: _xlsx.WorkSheet, range: TXlsxRange) {
        let itself = this;
        let colStart = itself.getXlsxColByChar(range.colS);
        let colEnd = itself.getXlsxColByChar(range.colE);
        let numToChar = itself.numToCharObj;

        let headObj = itself.headObj[itself.currXlsxName] || (itself.headObj[itself.currXlsxName] = {});
        headObj.useCols = [];
        headObj.comment = [];
        headObj.fileds = [];
        headObj.filedTypes = [];
        for (let colIndex = colStart; colIndex <= colEnd; colIndex++) {
            let colChar = numToChar[colIndex] || (numToChar[colIndex] = itself.getXlsxCharByCol(colIndex));
            let xlsxValue = data[colChar + range.rowS] as _xlsx.CellObject;
            if (!itself.isValid(xlsxValue)) {
                logger.warn(`第一行第${colIndex}（${colChar}）列未配置C或S或者CS`, itself.currXlsxName);
                continue;
            }
            let value = xlsxValue.w;
            if (config_xlsx.tansType == TransType.C && value.match(CSType.C)) {
                headObj.useCols.push(colIndex);
            } else if (config_xlsx.tansType == TransType.S && value.match(CSType.S)) {
                headObj.useCols.push(colIndex);
            } else if (config_xlsx.tansType == TransType.CS) {
                headObj.useCols.push(colIndex);
            }
        }
        for (let rowIndex = range.rowS + 1; rowIndex <= range.rowE; rowIndex++) {
            for (let useIndex = 0, len = headObj.useCols.length; useIndex < len; useIndex++) {
                let colIndex = headObj.useCols[useIndex];
                let colChar = numToChar[colIndex] || (numToChar[colIndex] = itself.getXlsxCharByCol(useIndex));
                let xlsxValue = data[colChar + rowIndex] as _xlsx.CellObject;
                let value = (xlsxValue?.w || "").trim().toLowerCase();
                switch (rowIndex) {
                    case RowType.field: {
                        if (!value) {
                            logger.error(`第${rowIndex}行第${colIndex}（${colChar}）列未配置字段名`, itself.currXlsxName);
                            process.exit();
                        }
                        if (headObj.fileds.indexOf(value) >= 0) {
                            logger.error(`第${rowIndex}行第${colIndex}（${colChar}）列字段名重复`, itself.currXlsxName);
                            process.exit();
                        }
                        headObj.fileds.push(value);
                    } break;
                    case RowType.filedType: {
                        if (!value) {
                            logger.error(`第${rowIndex}行第${colIndex}（${colChar}）列未配置字段类型`, itself.currXlsxName);
                            process.exit();
                        }
                        headObj.filedTypes.push(value)
                    } break;
                    case RowType.comment: {
                        if (!value) {
                            logger.warn(`第${rowIndex}行第${colIndex}（${colChar}）列注释为空`, itself.currXlsxName);
                            process.exit()
                        }
                        headObj.comment.push(value)
                    } break;
                    default: {
                        return;
                    }
                }
            }
        }
    }
    /**
     * 获取xlsx文件名
     * @param src 
     */
    private getXlsxName(src: string) {
        let xlsxName = _path.basename(src);
        let matchName = xlsxName.match(/[a-zA-Z0-9]+/) || [];
        let name = matchName[0] || "";
        return name;
    }
    /**
     * 获取表格范围
     * @param data 
     */
    private getRange(data: _xlsx.WorkSheet) {
        let itself = this;
        if (!data || !data["!ref"]) {//ref是代表表的开始和结束：如 "A1:D6"
            logger.error("表没数据：", itself.currXlsxName)
            return null;
        }
        let [mathc, colS, rowS, colE, rowE] = data["!ref"].match(/([a-zA-Z]+)([0-9]+)\:([a-zA-Z]+)([0-9]+)/);
        return {
            colS: colS,
            rowS: +rowS,
            colE: colE,
            rowE: +rowE,
        } as TXlsxRange;
    }
    /**
     * 是否有效的
     * @param value 
     * @returns 
     */
    private isValid(value: _xlsx.CellObject) {
        return value && value.w;
    }
    /**
     * 通过字母（字符）获取xlsx的列
     * @param char 
     * @returns 
     */
    private getXlsxColByChar(char: string) {
        let xlsxIndex = 0;
        char = char.toUpperCase();//转大写
        for (let index = 0, len = char.length; index < len; index++) {
            let code = char.charCodeAt(index) - 64;//A的ascii是65
            xlsxIndex += code * Math.pow(26, len - index - 1);//ABCD次方从后往前算  3210
        }
        return xlsxIndex;
    }
    /**
     * 通过的列获取xlsx列的字母（字符）
     * @param num 
     */
    private getXlsxCharByCol(num: number): string {
        let char = "";
        let yushu = num % 26 || 26;
        char += String.fromCharCode(yushu + 64);
        if (num <= 26) {
            return char;
        }
        let beishu = (num - yushu) / 26;//减余数之后有多少个26
        return this.getXlsxCharByCol(beishu) + char;
    }
}
new CmdXlsx().exec();