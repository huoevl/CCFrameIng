import _path from "path";
import _xlsx from "xlsx";
import * as fileUtils from "../base/FileUtils";
import { logger } from "../base/Logger";
import { configBase, maxNum, RowType, TransType, ValueTransType } from "../config/config_xlsx";


/** 客户端服务端类型 */
const enum CSType {
    /** 客户端 */
    Client = "c",
    /** 服务端 */
    Sever = "s",
    /** 两端 */
    CS = "cs",
}

/** 字段类型 */
const enum FieldTypes {
    int = "int",
    string = "string",
    localstring = "localstring",//需要处理多语言的字符串
    map = "map",
    float = "float",
}

/** xlsx类型对应真实类型数据 */
type TXlsxTypeToReal = {
    /** 基础类型，比如int string 没有[] */
    baseType?: string,
    /** 数组长度 */
    arrLen?: number,
    /** 实际类型 比如int  int[] */
    realType?: string,
    /** ts提示的类型 */
    realTsType?: string,
}
/** 正在解析的表的数据 */
type TXlsxParseIng = {
    comment?: string;//表中文名
    name?: string;//表英文名
    row?: number;
    col?: number;
    colChar?: string;//列对应的英文
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
    fields?: string[];
    /** 字段类型 */
    xlsxTypes?: string[];
    /** 注释 */
    comment?: string[];
    /** lua数组字段 */
    luaFields?: string[];
}
/** 字段 */
type TFields = {
    /** 注释 */
    comment?: string;
    /** 类型 */
    type?: string;
    /** 字段名 */
    field?: string;
}
/** 表数据 */
type TTabToTs = {
    /** 表名 */
    tabName?: string
    /** 表注释 */
    tabComment?: string;
    /** 字段集  */
    fieldObj?: { [field: string]: TFields };
}

export class CmdXlsx {
    /** 表json数据，客户端 */
    tabJsonObj: { [tabName: string]: Object } = {};
    /** lua数据，服务端 */
    tabLuaObj: { [tabName: string]: Object } = {};
    /** 转ts代码数据 */
    tabToTsObj: { [tabName: string]: TTabToTs } = {};

    /** 表头几行数据 */
    headObj: { [tabName: string]: TTabHead } = {};
    /** 正在解析的表参数 */
    currXlsxObj: TXlsxParseIng = {};

    /** 缓存xlsx列计算过的转换数据 */
    tempNumToCharObj: { [num: number]: string } = {};
    /** 缓存xlsx填写类型对应的是实际类型 */
    tempXlsxFieldType: { [type: string]: TXlsxTypeToReal } = {};
    /** 缓存解析过的表名 */
    tempXlsxName: { [name: string]: boolean } = {};

    /** 是否生成客户端数据 */
    isClient = false;
    /** 是否生成服务端数据 */
    isServer = false;
    /** 是否生成ts提示文件 */
    isTsComment = false;
    /** 执行函数 */
    exec() {
        let itself = this;
        itself.isClient = Boolean(configBase.tansType & TransType.clientData);
        itself.isServer = Boolean(configBase.tansType & TransType.severData);
        itself.isTsComment = Boolean(configBase.tansType & TransType.clientTs);

        let dir = _path.join(__dirname, configBase.xlsxPath);
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
        itself.writeToFile();
    }

    /** 写入文件 */
    private writeToFile() {
        let itself = this;
        //写入
        for (let tabelName in itself.tabJsonObj) {
            if (itself.isClient) {
                fileUtils.outputJsonSync(_path.join(__dirname, configBase.jsonPath, tabelName + ".json"), itself.tabJsonObj[tabelName], { spaces: 4 });
            }
            if (itself.isServer) {
                fileUtils.outputJsonToLuaSync(_path.join(__dirname, configBase.luaPath, tabelName + ".lua"), itself.tabLuaObj[tabelName]);
            }
        }
        if (itself.isTsComment) {
            let cfgNameInfo1Str = "/**\n* 配置名称相关常量（程序自动生成）\n*/\nexport class CfgNameInfo1 {\n";
            let initConfigStr = "";
            let initConfigStr2 = "export class InitConfig {\n\tpublic constructor() {\n";
            let globalConfigStr = "";
            let globalConfigStr2 = "export class CONFIG {\n";

            let cfgNameInfo1Path = _path.join(__dirname, configBase.initConfigPath, "CfgNameInfo1.ts");
            let initConfigPath = _path.join(__dirname, configBase.initConfigPath, "InitConfig.ts");
            let globalConfigPath = _path.join(__dirname, configBase.globalConfigPath, "GlobalConfig.ts");

            for (let tabelName in itself.tabToTsObj) {
                let tabTsData = itself.tabToTsObj[tabelName];
                //cfgNameInfo1
                cfgNameInfo1Str += `\t/** ${tabTsData.tabComment} */\n\t${tabelName} = "${tabelName}";\n`;
                //initConfig
                let fromPath = _path.join(__dirname, configBase.configClassPath, tabelName + ".ts");
                let relativePath = fileUtils.getRelativePath(initConfigPath, fromPath);
                initConfigStr += `import { ${tabelName} } from "${relativePath}";\n`;
                initConfigStr2 += `\t\tGAME.CfgMgr.register(CfgConst.CfgName.${tabelName}, ${tabelName});\n`;
                //globalConfig
                fromPath = _path.join(__dirname, configBase.configClassPath, tabelName + ".ts");
                relativePath = fileUtils.getRelativePath(globalConfigPath, fromPath);
                globalConfigStr += `import { ${tabelName} } from "${relativePath}";\n`;
                globalConfigStr2 += `\t/** ${tabTsData.tabComment} */\n\tpublic static get ${tabelName}(): ${tabelName} {\n\treturn GAME.CfgMgr.getConfig<${tabelName}>(CfgConst.CfgName.${tabelName});\n\t}\n`;
                //VO
                let voName = tabelName.match("config") ? tabelName.replace("config", "VO") : tabelName + "VO";
                let clazzVoStr = `/**\n* ${tabTsData.tabComment}\n*/\nexport class ${voName} {\n`;
                let fieldObj = tabTsData.fieldObj || {};
                for (let field in fieldObj) {
                    let fieldData = fieldObj[field];
                    clazzVoStr += `\t/** ${fieldData.comment} */\n\treadonly ${field}: ${fieldData.type};\n`;
                }
                clazzVoStr += "}";
                fileUtils.outputFileSync(_path.join(__dirname, configBase.voPath, `${voName}.ts`), clazzVoStr);
                //class
                let classPath = _path.join(__dirname, configBase.configClassPath, tabelName + ".ts");
                if (!fileUtils.existsSync(classPath)) {
                    fromPath = _path.join(__dirname, configBase.voPath, voName + ".ts");
                    relativePath = fileUtils.getRelativePath(classPath, fromPath);
                    let classStr = `import { ${voName} } from "${relativePath}";\n`;
                    classStr += `/**\n* ${tabTsData.tabComment} 相关配置\n*/\n`;
                    classStr += `export class ${tabelName} extends BaseConfig<${voName}>{\n};`;
                    fileUtils.outputFileSync(classPath, classStr);
                }
            }
            cfgNameInfo1Str += "}";
            initConfigStr2 += `\t}\n`;
            initConfigStr += initConfigStr2 + "}";
            globalConfigStr += globalConfigStr2 + "}";
            fileUtils.outputFileSync(cfgNameInfo1Path, cfgNameInfo1Str);
            fileUtils.outputFileSync(initConfigPath, initConfigStr);
            fileUtils.outputFileSync(globalConfigPath, globalConfigStr);
        }
    }

    /**
     * 读xlsx文件
     * @param src 
     */
    private readXlsx(src: string) {
        let itself = this;
        let xlsxName = itself.getXlsxName(src);
        if (itself.tempXlsxName[xlsxName]) {
            itself.logErr(true, "表名重复")
        }
        itself.tempXlsxName[xlsxName] = true;
        itself.currXlsxObj = {};
        itself.currXlsxObj.name = xlsxName;
        let fileName = _path.basename(src).replace(".xlsx", "");
        itself.currXlsxObj.comment = fileName.slice(xlsxName.length);
        logger.info("正在解析", xlsxName, "...")
        let data = _xlsx.readFile(src);
        let sheetNames = data.SheetNames || [];
        let sheetJson = data.Sheets[configBase.languageMain];
        if (!sheetJson) {
            itself.logErr(true, `没有名称为${configBase.languageMain}的Sheet!`);
        }
        //除了类型提示，数据都会生成，只是不写入文件
        if (itself.isClient || itself.isServer) {
            //主数据
            itself.parseXlsxJson(sheetJson);
            //多语言
            for (let index = 0, len = sheetNames.length; index < len; index++) {
                if (sheetNames[index] == configBase.languageMain) {
                    continue;
                }
                //todo
            }
        }
        //生成提示文件
        if (itself.isTsComment) {
            itself.parseXlsxTs(sheetJson);
        }
    }

    /**
     * 生成ts提示文件
     * @param data 
     * @returns 
     */
    private parseXlsxTs(data: _xlsx.WorkSheet) {
        let itself = this;
        let range = itself.getRange(data);//todo 
        if (!range) {
            return;
        }
        itself.calcHeadObj(data, range);
        let xlsxName = itself.currXlsxObj.name;
        let headObj = itself.headObj[xlsxName];
        let tabTsObj = itself.tabToTsObj[xlsxName] = {} as TTabToTs;
        tabTsObj.tabComment = itself.currXlsxObj.comment;
        tabTsObj.tabName = xlsxName;
        let fieldObj = tabTsObj.fieldObj = {} as { [field: string]: TFields };
        for (let useIndex = 0, len = headObj.useCols.length; useIndex < len; useIndex++) {
            let field = headObj.fields[useIndex];
            let obj = fieldObj[field] = fieldObj[field] || {};
            obj.comment = headObj.comment[useIndex];
            obj.field = field;
            obj.type = itself.getReallyType(headObj.xlsxTypes[useIndex]).realTsType;
        }
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
        let tabObj = itself.tabJsonObj[xlsxName] = {};
        let luaObj = itself.tabLuaObj[xlsxName] = {};
        let idObj: { [id: string]: boolean } = {};
        for (let rowIndex = RowType.data; rowIndex <= range.rowE; rowIndex++) {
            let tabRowObj = {};
            let luaRowObj = {};
            itself.currXlsxObj.row = rowIndex;
            for (let useIndex = 0, len = headObj.useCols.length; useIndex < len; useIndex++) {
                let colIndex = headObj.useCols[useIndex];
                let colChar = itself.getXlsxCharByCol(colIndex);
                itself.currXlsxObj.col = colIndex;
                itself.currXlsxObj.colChar = colChar;
                let xlsxValue = data[colChar + rowIndex] as _xlsx.CellObject;
                let isValid = itself.isValid(xlsxValue);
                let isId = headObj.fields[useIndex] == "id";
                if (!isValid && isId) {
                    break;//没有id，不取这行数据
                }
                if (!isValid) {
                    continue;
                }
                let xlsxType = headObj.xlsxTypes[useIndex];
                let value = null;
                switch (configBase.valueTansType) {
                    case ValueTransType.cust: {
                        value = itself.getXlsxValueCust(xlsxValue, xlsxType);
                    } break;
                    default: {
                        value = itself.getXlsxValueDefault(xlsxValue, xlsxType);
                    } break
                }
                if (isId) {
                    if (idObj[value]) {
                        itself.logErr(true, `id重复：${value}`)
                        continue;
                    }
                    idObj[value] = true;
                    tabObj[value] = tabObj[value] || tabRowObj;
                    luaObj[value] = luaObj[value] || luaRowObj;
                }
                if (itself.isServer) {
                    let luaField = headObj.luaFields[useIndex];
                    let luaValue = itself.getLuaValue(value, luaField, xlsxType);
                    luaRowObj[headObj.fields[useIndex]] = luaValue;
                }
                tabRowObj[headObj.fields[useIndex]] = value;
            }
        }
    }

    /**
     * 计算获取正确的数据，自定义
     * @param valueSource 
     * @param xlsxType 
     * @returns 
     */
    private getXlsxValueCust(valueSource: _xlsx.CellObject, xlsxType: string): any {
        let itself = this;
        let typeObj = itself.getReallyType(xlsxType);
        let logErr = function () {
            itself.logErr(true, `数值【${valueSource}】与类型【${typeObj.realType}】不匹配`);
        }
        let parseResult = function (value: string, type: string, arrLen: number) {
            let result: string | number | any = value;
            if (arrLen <= 0) {
                switch (type) {
                    case "number": {
                        if (valueSource.t == "n") {
                            result = valueSource.v;
                            if (result > maxNum) {
                                itself.logErr(true, "数字超出安全范围：15个9")
                            }
                        } else {
                            if (value.indexOf(".") >= 0) {
                                logErr();
                            }
                            result = +value;
                            if (result >= Math.pow(2, 53)) {
                                itself.logErr(true, "数字超出安全范围：2的53次方")
                            }
                        }
                        if (isNaN(result)) {
                            logErr();
                        }
                    } break;
                    case FieldTypes.float: {
                        result = +value;
                        if (isNaN(result)) {
                            logErr();
                        }
                    } break;
                    case "any": {
                        try {
                            result = JSON.parse(value);
                        } catch (error) {
                            logErr();
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
            if (tempLen == 3) {
                let valueArr = value.split(":");
                for (let index = 0, len = valueArr.length; index < len; index++) {
                    arr.push(parseResult(valueArr[index], type, arrLen));
                }
                return arr;
            }
        }
        return parseResult(valueSource.w.trim(), typeObj.baseType, typeObj.arrLen);
    }
    /**
     * 计算获取正确的数据，原始数据
     * @param value 
     * @param xlsxType 
     */
    private getXlsxValueDefault(valueSource: _xlsx.CellObject, xlsxType: string): any {
        let itself = this;
        let typeObj = itself.getReallyType(xlsxType);
        let logErr = function () {
            itself.logErr(true, `数值【${valueSource}】与类型【${typeObj.realType}】不匹配`);
        }
        let parseResult = function (value: string, type: string, arrLen: number) {
            let result: string | number | any = value;
            if (arrLen <= 0) {
                switch (type) {
                    case "number": {
                        if (valueSource.t == "n") {
                            result = valueSource.v;
                            if (result > maxNum) {
                                itself.logErr(true, "数字超出安全范围：15个9")
                            }
                        } else {
                            if (value.indexOf(".") >= 0) {
                                logErr();
                            }
                            result = +value;
                            if (result >= Math.pow(2, 53)) {
                                itself.logErr(true, "数字超出安全范围：2的53次方")
                            }
                        }
                        if (isNaN(result)) {
                            logErr();
                        }
                    } break;
                    case FieldTypes.float: {
                        result = +value;
                        if (isNaN(result)) {
                            logErr();
                        }
                    } break;
                    case "any": {//obj对象 {key:v,key:v};
                        try {
                            result = JSON.parse(value);
                        } catch (error) {
                            logErr();
                        }
                    } break
                }
                return result;
            }
            let tempLen = arrLen--;
            let isMatch = itself.isMatchArr(value, tempLen);
            if (!isMatch) {
                logErr();
            }
            let arr = [];
            let tempArr = itself.getArrStrValue(value, tempLen);
            for (let index = 0, len = tempArr.length; index < len; index++) {
                arr.push(parseResult(tempArr[index], type, arrLen));
            }
            if (!arr.length) {
                itself.logWarn("存在空的数组");
            }
            return arr;
        }
        return parseResult(valueSource.w.trim(), typeObj.baseType, typeObj.arrLen);
    }

    private getLuaValue(realValue: any, fields: string, xlsxType: string) {
        let itself = this;
        if (!fields) {
            return realValue;
        }
        if (realValue === "" || realValue === undefined || realValue === null) {
            return "__nil__";
        }
        if (realValue.constructor != Array) {
            return realValue;
        }
        if (!realValue.length) {
            return realValue;
        }
        let typeMap = itself.getReallyType(xlsxType);
        if (typeMap.arrLen < 1) {
            itself.logErr(true, "不应该不是数组，请检查");
            return realValue;
        }
        let value: any;
        if (fields == "attr") {//属性[id,value] 转成 {id,value}
            if (typeMap.arrLen == 1) {
                realValue = [realValue];
            }
            value = {};
            for (let index = 0, len = realValue.length; index < len; index++) {
                let attrArr = realValue[index];
                if (attrArr[2]) {
                    itself.logErr(true, "属性值配置数量错误");
                }
                value[attrArr[0]] = attrArr[1];
            }
        } else {
            let fieldLuas = fields.replace(/ *, */, ",").split(",");
            let parseLua = function (valueArr: any[]) {
                if (valueArr[0].constructor != Array) {
                    if (fieldLuas.length < valueArr.length) {
                        itself.logErr(true, "解析lua字段数量小于配置数量")
                    }
                    let luaOjbTemp = {};
                    for (let index = 0, len = valueArr.length; index < len; index++) {
                        luaOjbTemp[fieldLuas[index]] = valueArr[index];
                    }
                    return luaOjbTemp;
                } else {
                    let obj = [];
                    for (let index = 0, len = valueArr.length; index < len; index++) {
                        obj.push(parseLua(valueArr[index]));
                    }
                    return obj;
                }
            }
            value = parseLua(realValue);
        }
        return value;
    }

    /**
     * 获取要拆分的值的数组
     * @param value 
     * @param arrLen 
     */
    private getArrStrValue(value: string, arrLen: number) {
        value = value.slice(1, value.length - 1);//去掉两边的[]
        let splitStr = ",";
        let addRight = "";
        for (let index = 0; index < arrLen - 1; index++) {
            splitStr = "]" + splitStr;
            addRight += "]";
        }
        let result = value.replace(/\] *, */g, "\],").split(splitStr).join(addRight + ":").split(":");
        return result;
    }
    /**
     * 判断数组值是否正确
     * @param value [x,x]  [[x,x],[x,x]]  [[[x,x],[x,x]],[[x,x],[x,x]]]
     * @param charType 
     */
    private isMatchArr(value: string, len: number) {
        if (len <= 0) {
            return false;
        }
        let strS = "";
        let strE = "";
        for (let index = 0; index < len; index++) {
            strS += "\\[";
            strE += "\\]";
        }
        let regS = new RegExp(`^${strS}`);
        let regE = new RegExp(`${strE}$`);
        let result = value.match(regS) && value.match(regE);
        return !!result;
    }

    /**
     * 获取xlsxtype对应的真实type、数组类型的长度
     * @param xlsxType 表格填的类型
     * @param isComment 是否ts注释
     * @returns 
     */
    getReallyType(xlsxType: string) {
        let itself = this;
        if (itself.tempXlsxFieldType[xlsxType]) {
            return itself.tempXlsxFieldType[xlsxType];
        }
        let [result, field, array] = xlsxType.match(/([a-zA-Z]+)(\S*)/);
        let arrLen = (array || "").match(/\[\]+?/g)?.length || 0;
        switch (field) {
            case FieldTypes.float: {//float不转，提示文件那里转

            } break
            case FieldTypes.int: {
                field = field.replace(field, "number");
            } break;
            case FieldTypes.map: {
                field = field.replace(field, "any");
            } break;
            case FieldTypes.string:
            case FieldTypes.localstring: {
                field = field.replace(field, "string");
            } break;
            default: {
                itself.logErr(true, "不存在的类型")
            } break
        }
        let obj = {} as TXlsxTypeToReal;
        let realType = field + array;
        obj.baseType = realType.match(/[a-zA-Z]+/)[0];
        obj.arrLen = realType.match(/\[\]/g)?.length || 0;
        obj.realType = realType;
        //注释加上readonly防止被改数据
        let readonly = function (field: string, arrLen: number): string {
            if (arrLen <= 0) {
                return field;
            }
            return `Readonly<${readonly(field, --arrLen)}[]>`
        }
        if (field == FieldTypes.float) {
            field = field.replace(field, "number");
        }
        let tsType = readonly(field, arrLen);
        obj.realTsType = tsType;
        itself.tempXlsxFieldType[xlsxType] = obj;
        return obj;
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
        if (itself.headObj[xlsxName]) {
            return;
        }
        let headObj = itself.headObj[xlsxName] = {} as TTabHead;

        headObj.useCols = [];
        headObj.comment = [];
        headObj.fields = [];
        headObj.xlsxTypes = [];
        headObj.luaFields = [];
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
            if (itself.isClient && value.match(CSType.Client) || itself.isServer && value.match(CSType.Sever)) {
                headObj.useCols.push(colIndex);
            }
        }
        for (let rowIndex = range.rowS + 1; rowIndex <= range.rowE; rowIndex++) {
            itself.currXlsxObj.row = rowIndex;
            let add = range.rowS - 1;
            for (let useIndex = 0, len = headObj.useCols.length; useIndex < len; useIndex++) {
                let colIndex = headObj.useCols[useIndex];
                let colChar = itself.getXlsxCharByCol(colIndex);
                itself.currXlsxObj.col = colIndex;
                itself.currXlsxObj.colChar = colChar;
                let xlsxValue = data[colChar + rowIndex] as _xlsx.CellObject;
                let value = (xlsxValue?.w || "").trim().toLowerCase();
                switch (rowIndex) {
                    case RowType["field"] + add: {
                        if (!value) {
                            itself.logErr(true, `未配置字段名`);
                        }
                        if (value.match(/[\u4400-\u9fa5]/)) {
                            itself.logErr(true, "字段存在中文！")
                        }
                        if (headObj.fields.indexOf(value) >= 0) {
                            itself.logErr(true, `字段名重复：${value}`);
                        }
                        headObj.fields.push(xlsxValue.w);
                    } break;
                    case RowType["fieldType"] + add: {
                        if (!value) {
                            itself.logErr(true, `未配置字段类型`);
                        }
                        let [result, field, array] = value.match(/([a-zA-Z]+)(\S*)/);
                        if (array && array != "[]" && array != "[][]" && array != "[][][]") {
                            itself.logErr(true, `数据类型配置错误：${value}`);
                        }
                        if (field != FieldTypes.int && field != FieldTypes.float && field != FieldTypes.string && field != FieldTypes.localstring && field != FieldTypes.map) {
                            itself.logErr(true, `数据类型配置错误：${value}`);
                        }
                        headObj.xlsxTypes.push(value)
                    } break;
                    case RowType["comment"] + add: {
                        if (!value) {
                            itself.logErr(false, `注释为空`);
                        }
                        headObj.comment.push(value)
                    } break;
                    case RowType["luaArr"] + add: {
                        headObj.luaFields.push(value)
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
        if (+rowE < RowType.data) {
            itself.logErr(true, "表没数据，请检查（横向空白行，竖向空白列）左边数据范围");
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