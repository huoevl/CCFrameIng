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
    Client = "c",
    /** 仅服务端 */
    Sever = "s",
    /** 两端 */
    CS = "cs",
}

/** 字段类型 */
const enum FiledTypes {
    int = "int",
    string = "string",
    localstring = "localstring",//需要处理多语言的字符串
    map = "map",//暂未实现
}


/** xlsx类型对应真实类型数据 */
type TXlsxTypeToReal = {
    /** 类型 */
    type?: string,
    /** 数组长度 */
    arrLen?: number
}
/** 正在解析的表的数据 */
type TXlsxParseIng = {
    name?: string;
    row?: number,
    col?: number,
    colChar?: string,
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
    /** 注释 */
    comment?: string;
    /** 字段 */
    filed?: string;

}

export class CmdXlsx {
    /** 表json数据，客户端 */
    tabJsonObj: { [tabName: string]: Object } = {};
    /** lua数据，服务端 */
    tabLuaObj = {};
    /** 转ts代码数据 */
    tabToTsObj: { [tabName: string]: TTabData } = {};

    /** 表头几行数据 */
    headObj: { [tabName: string]: TTabHead } = {};
    /** 正在解析的表参数 */
    currXlsxObj: TXlsxParseIng = {};

    /** 缓存xlsx列计算过的转换数据 */
    tempNumToCharObj: { [num: number]: string } = {};
    /** 缓存xlsx填写类型对应的是实际类型 */
    tempXlsxFiledType: { [type: string]: TXlsxTypeToReal } = {}
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
        for (let tabelName in itself.tabJsonObj) {
            fileUtils.outputJsonSync(_path.join(__dirname, "../", "xlsx", tabelName + ".json"), itself.tabJsonObj[tabelName], { spaces: 4 });
            fileUtils.outputJsonToLuaSync(_path.join(__dirname, "../", "xlsx", tabelName + ".lua"), itself.tabJsonObj[tabelName]);
        }
    }

    /**
     * 读xlsx文件
     * @param src 
     */
    private readXlsx(src: string) {
        let itself = this;
        let xlsxName = itself.getXlsxName(src);
        itself.currXlsxObj = {};
        itself.currXlsxObj.name = xlsxName;
        logger.info("正在解析", xlsxName, "...")
        let data = _xlsx.readFile(src);
        let sheetNames = data.SheetNames || [];
        let sheetJson = data.Sheets[config_xlsx.languageMain];
        if (!sheetJson) {
            itself.logErr(true, `没有名称为${config_xlsx.languageMain}的Sheet!`);
        }
        //除了类型提示，数据都会生成，只是不写入文件
        if (config_xlsx.tansType & TransType.clientData || config_xlsx.tansType & TransType.severData) {
            //主数据
            itself.parseXlsxJson(sheetJson);
            //多语言
            for (let index = 0, len = sheetNames.length; index < len; index++) {
                if (sheetNames[index] == config_xlsx.languageMain) {
                    continue;
                }
            }
        }
        //生成提示文件
        if (config_xlsx.tansType & TransType.clientTs) {
            itself.parseXlsxTs(sheetJson);
        }
        fileUtils.outputJsonSync(_path.join(__dirname, "../", "xlsx", xlsxName + "_xlsx.json"), data);
    }

    private parseXlsxTs(data: _xlsx.WorkSheet) {
        let itself = this;
        let range = itself.getRange(data);//todo 
        if (!range) {
            return;
        }
        itself.calcHeadObj(data, range);
        let xlsxName = itself.currXlsxObj.name;
        let headObj = itself.headObj[xlsxName];
        let tabObj = itself.tabJsonObj[xlsxName] || (itself.tabJsonObj[xlsxName] = {});
        let numToChar = itself.tempNumToCharObj;
        let idObj: { [id: string]: boolean } = {};
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
        let xlsxName = itself.currXlsxObj.name;
        let headObj = itself.headObj[xlsxName];
        let tabObj = itself.tabJsonObj[xlsxName] || (itself.tabJsonObj[xlsxName] = {});
        let idObj: { [id: string]: boolean } = {};
        for (let rowIndex = RowType.data; rowIndex <= range.rowE; rowIndex++) {
            let tabRowObj = {};
            itself.currXlsxObj.row = rowIndex;
            for (let useIndex = 0, len = headObj.useCols.length; useIndex < len; useIndex++) {
                let colIndex = headObj.useCols[useIndex];
                let colChar = itself.getXlsxCharByCol(colIndex);
                itself.currXlsxObj.col = colIndex;
                itself.currXlsxObj.colChar = colChar;
                let xlsxValue = data[colChar + rowIndex] as _xlsx.CellObject;
                let isValid = itself.isValid(xlsxValue);
                let isId = headObj.fileds[useIndex] == "id";
                if (!isValid && isId) {
                    break;//没有id，不取这行数据
                }
                if (!isValid) {
                    continue;
                }
                let type = headObj.filedTypes[useIndex];
                let value = itself.getXlsxValue(xlsxValue.w.trim(), type);
                if (isId) {
                    if (idObj[value]) {
                        itself.logErr(false, `id重复：${value}，已跳过此行`)
                        continue;
                    }
                    idObj[value] = true;
                    tabObj[value] = tabObj[value] || tabRowObj;
                }
                tabRowObj[headObj.fileds[useIndex]] = value;
            }
        }
    }
    /**
     * 计算获取正确的数据
     * @param value 
     * @param xlsxType 
     * @returns 
     */
    private getXlsxValue(value: string, xlsxType: string): any {
        let itself = this;
        let typeObj = itself.tempXlsxFiledType[xlsxType];
        if (!typeObj) {
            xlsxType = itself.getReallyType(xlsxType);
            let obj = {} as TXlsxTypeToReal;
            obj.type = xlsxType.match(/[a-zA-Z]+/)[0];
            obj.arrLen = xlsxType.match(/\[\]/g)?.length || 0;
            typeObj = itself.tempXlsxFiledType[xlsxType] = obj;
        }
        let parseResult = function (value: string, type: string, arrLen: number) {
            let result: string | number = value;
            if (arrLen <= 0) {
                switch (type) {
                    case `number`: {
                        result = +value;
                        if (isNaN(result)) {
                            itself.logErr(true, `数值【${value}】与类型【${type}】不匹配`);
                        }
                    } break;
                }
                return result;
            }
            let arr = [];
            let tempLen = arrLen--;
            if (tempLen == 1) {
                let valueArr = value.split("|");
                for (let index = 0, len = valueArr.length; index < len; index++) {
                    arr.push(parseResult(valueArr[index], type, arrLen));
                }
                return arr;
            }
            if (tempLen == 2) {
                let valueArr = value.split(";");
                for (let index = 0, len = valueArr.length; index < len; index++) {
                    arr.push(parseResult(valueArr[index], type, arrLen));
                }
                return arr;
            }
        }
        return parseResult(value, typeObj.type, typeObj.arrLen);
    }

    /**
     * 获取ts可用的（真实的）类型
     * @param filedType 表格填的类型
     * @param isComment 是否ts注释
     * @returns 
     */
    getReallyType(filedType: string, isComment?: boolean) {
        let [result, filed, array] = filedType.match(/([a-zA-Z]+)(\S*)/);
        let arrLen = 0;
        if (array == "[]") {
            arrLen = 1;
        } else if (array == "[][]") {
            arrLen = 2;
        }
        switch (filed) {
            case FiledTypes.int: {
                filed = filed.replace(filed, "number");
            } break;
            case FiledTypes.string:
            case FiledTypes.localstring: {
                filed = filed.replace(filed, "string");
            } break;
            default: {

            } break
        }
        //注释加上readonly防止被改数据
        if (!isComment) {
            return filed + array;
        }
        let readonly = function (filed: string, arrLen: number): string {
            if (arrLen <= 0) {
                return filed;
            }
            return `Readonly<${readonly(filed, --arrLen)}[]>`
        }
        filedType = readonly(filed, arrLen);
        return filedType;
    }

    /**
     * 计算表头
     * @param data xlsx数据
     * @param range 范围
     * @returns 
     */
    private calcHeadObj(data: _xlsx.WorkSheet, range: TXlsxRange) {
        let itself = this;
        let colStart = itself.getXlsxColByChar(range.colS);
        let colEnd = itself.getXlsxColByChar(range.colE);
        let xlsxName = itself.currXlsxObj.name;
        itself.currXlsxObj.row = range.rowS;
        let headObj = itself.headObj[xlsxName] || (itself.headObj[xlsxName] = {});

        headObj.useCols = [];
        headObj.comment = [];
        headObj.fileds = [];
        headObj.filedTypes = [];
        for (let colIndex = colStart; colIndex <= colEnd; colIndex++) {
            let colChar = itself.getXlsxCharByCol(colIndex);
            itself.currXlsxObj.col = colIndex;
            itself.currXlsxObj.colChar = colChar;
            let xlsxValue = data[colChar + range.rowS] as _xlsx.CellObject;
            if (!itself.isValid(xlsxValue)) {
                itself.logWarn("未配置C或S或者CS");
                continue;
            }
            let value = xlsxValue.w.trim().toLowerCase();
            if (config_xlsx.tansType & TransType.clientData && value.match(CSType.Client)) {
                headObj.useCols.push(colIndex);
            }
            if (config_xlsx.tansType & TransType.severData && value.match(CSType.Sever)) {
                headObj.useCols.push(colIndex);
            }
        }
        for (let rowIndex = range.rowS + 1; rowIndex <= range.rowE; rowIndex++) {
            itself.currXlsxObj.row = rowIndex;
            for (let useIndex = 0, len = headObj.useCols.length; useIndex < len; useIndex++) {
                let colIndex = headObj.useCols[useIndex];
                let colChar = itself.getXlsxCharByCol(colIndex);
                itself.currXlsxObj.col = colIndex;
                itself.currXlsxObj.colChar = colChar;
                let xlsxValue = data[colChar + rowIndex] as _xlsx.CellObject;
                let value = (xlsxValue?.w || "").trim().toLowerCase();
                switch (rowIndex) {
                    case RowType.field: {
                        if (!value) {
                            itself.logErr(true, `未配置字段名`);
                        }
                        if (headObj.fileds.indexOf(value) >= 0) {
                            itself.logErr(true, `字段名重复：${value}`);
                        }
                        headObj.fileds.push(xlsxValue.w);
                    } break;
                    case RowType.filedType: {
                        if (!value) {
                            itself.logErr(true, `未配置字段类型`);
                        }
                        let [result, filed, array] = value.match(/([a-zA-Z]+)(\S*)/);
                        if (array && array != "[]" && array != "[][]") {
                            itself.logErr(true, `数据类型配置错误：${value}`);
                        }
                        if (filed != FiledTypes.int && filed != FiledTypes.string && filed != FiledTypes.localstring) {
                            itself.logErr(true, `数据类型配置错误：${value}`);
                        }
                        headObj.filedTypes.push(value)
                    } break;
                    case RowType.comment: {
                        if (!value) {
                            itself.logErr(false, `注释为空`);
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
            logger.error("表没数据：", itself.currXlsxObj)
            return null;
        }
        let [mathc, colS, rowS, colE, rowE] = data["!ref"].match(/([a-zA-Z]+)([0-9]+)\:([a-zA-Z]+)([0-9]+)/);
        //列
        let colEnd = itself.getXlsxColByChar(colE);
        let colSatrt = itself.getXlsxColByChar(colS);
        for (let colIndex = colSatrt; colIndex <= colEnd; colIndex++) {
            let colChar = itself.getXlsxCharByCol(colIndex);
            let xlsxValue = data[colChar + rowS] as _xlsx.CellObject;
            if (!itself.isValid(xlsxValue)) {
                colE = itself.getXlsxCharByCol(Math.max(colIndex - 1, colSatrt));
                break;
            }
        }
        //行
        colEnd = itself.getXlsxColByChar(colE);
        for (let rowIndex = +rowS, rowEnd = +rowE; rowIndex <= rowEnd; rowIndex++) {
            let isEmpty = true;
            for (let colIndex = colSatrt; colIndex <= colEnd; colIndex++) {
                let colChar = itself.getXlsxCharByCol(colIndex);
                let xlsxValue = data[colChar + rowIndex] as _xlsx.CellObject;
                if (itself.isValid(xlsxValue)) {
                    isEmpty = false;
                    break;
                }
            }
            if (isEmpty) {
                rowE = "" + Math.max(rowIndex - 1, +rowS);
                break;
            }
        }
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
     * @param colNum 
     */
    private getXlsxCharByCol(colNum: number): string {
        let itself = this;
        if (itself.tempNumToCharObj[colNum]) {
            return itself.tempNumToCharObj[colNum];
        }
        let char = "";
        let yushu = colNum % 26 || 26;
        char += String.fromCharCode(yushu + 64);
        if (colNum <= 26) {
            itself.tempNumToCharObj[colNum] = char;
            return char;
        }
        let beishu = (colNum - yushu) / 26;//减余数之后有多少个26
        let next = this.getXlsxCharByCol(beishu);
        itself.tempNumToCharObj[colNum] = next + char;
        return next + char;
    }

    /**
     * 输出错误信息
     * @param isExit 是否退出
     * @param err 
     */
    private logErr(isExit: boolean, ...err: string[]) {
        let itself = this;
        let obj = itself.currXlsxObj;
        let name = obj.name ? `表【${obj.name}】` : "";
        let row = obj.row ? `第${obj.row}行` : "";
        let col = obj.col ? `第${obj.col} (${obj.colChar}) 列：` : "";
        logger.error(name + row + col, err);
        if (isExit) {
            process.exit();
        }
    }
    private logWarn(...err: string[]) {
        let itself = this;
        let obj = itself.currXlsxObj;
        let name = obj.name ? `表【${obj.name}】` : "";
        let row = obj.row ? `第${obj.row}行` : "";
        let col = obj.col ? `第${obj.col} (${obj.colChar}) 列：` : "";
        logger.warn(name + row + col, err);
    }
}
new CmdXlsx().exec();