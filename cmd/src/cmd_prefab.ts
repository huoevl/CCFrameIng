import * as _path from "path";
import * as ConfigGlobal from "../../ConfigGlobal";
import * as _fileUtils from "../base/FileUtils";
import { logger } from "../base/Logger";
import { ConfigBreakComp, ConfigCustComp, ConfigRole } from "../config/config_prefab";
type TIndex = {
    /** 下标index */
    __id__?: number;
}
type TPrefab = {
    /** 类型 */
    __type__?: string;
    /** 下标（在预制体中未赋值） */
    _id?: number
    /** 名字 */
    _name?: string;
    /** 子节点 */
    _children?: TIndex[];
    /** 组件 */
    _components?: TIndex[];
    /** 对应的预制体 */
    _prefab?: TIndex;
    /** 文件id */
    fileId?: string;
    /** 对应资源 */
    asset?: TIndex;
    /**  */
    instance?: TIndex;
    /**  */
    propertyOverrides?: TIndex[];
    /**  */
    mountedChildren?: any[];
    /** nodes */
    nodes?: TIndex[];
    /**  */
    propertyPath?: string[];
    /**  */
    targetInfo?: TIndex;
    /**  */
    localID?: string[];
    /**  */
    value?: string;
    /** 自定义：控制器名字 */
    _ctrlName: string;
}
type TAllPrefab = {
    /** 是否第一次 */
    isFirst?: boolean;
    /** 界面名称 */
    UIName?: string;
    /** 当前模块 */
    currModule?: string;
    /** 组件 */
    comps?: Object;
    /** 导入对象 */
    importComp?: Object;
}
type TBaseName = {
    /** 前缀 */
    prefix?: string;
    /** 后缀 */
    suffix?: string;
}
type TBaseName2 = {
    /** 是否跳过 */
    isBreak?: boolean;
    /** 类型 */
    type?: string;
    /** 类型对应的路径 */
    typePath?: string;
    /** 名称 */
    name?: string;
}
/**
 * 从预制体生成代码模板，
 */
export class CmdPrefab {
    /** uuid对应的预制体路径 */
    private uuidToPathDic: { [uuid: string]: string };
    /** 文件id对应的类名 */
    private fileIdToClassDic: { [fileId: string]: string };
    /** 文件id对应的路径 */
    private fileIdToPathDic: { [fileId: string]: string };
    /** 类名对应的路径 */
    private clazzToPathDic: { [clazz: string]: string };
    /** 当前模块 */
    private currModule: string = "";
    /** 所有类的数据 */
    private clazzAllData: { [name: string]: TAllPrefab } = {};
    /** 当前解析的模块 */

    /**
     * 执行
     * @param moduleName 模块名 
     * @param fileName 预制体名
     */
    exec(moduleName: string, fileName?: string) {
        let itself = this;
        itself.parsePrefabPath();
        itself.parseCalssName();
        if (typeof moduleName == "string") {
            itself.readFilePath(moduleName, fileName);
        } else {
            logger.error("使用方法：npm run prefab -- -n 模块名 [-f 文件名]");
        }
    }
    /** 解析预制体 */
    private parsePrefabPath() {
        let itself = this;
        let filePath = _path.join(ConfigGlobal.RootDir, "library/.assets-info.json");
        let jsonData = _fileUtils.readJsonSync(filePath);
        for (let prefab in jsonData) {
            if (_path.extname(prefab) != ".prefab") {
                continue;
            }
            itself.uuidToPathDic[jsonData[prefab].uuid] = prefab;
        }
    }
    /** 解析类名 */
    private parseCalssName() {
        let itself = this;
        let temp = "temp/programming/packer-driver/targets/editor";
        let filePath = _path.join(ConfigGlobal.RootDir, temp, "import-map.json");
        let jsonData = _fileUtils.readJsonSync(filePath).imports;
        for (let tsFile in jsonData) {
            if (_path.extname(tsFile) != ".ts") {
                continue;
            }
            let jsFile = _path.join(ConfigGlobal.RootDir, temp, jsonData[tsFile]);
            let jsFileData = _fileUtils.readFileSync(jsFile, { encoding: "utf-8" });
            let matchStr = jsFileData.match(/_cclegacy\._RF\.push.*\);/g);
            if (!matchStr) {
                continue;
            }
            for (let str of matchStr) {
                let arr = str.replace(/'/g, "").replace(/ /g, "").replace(/"/g, "").split(",");
                itself.fileIdToClassDic[arr[1]] = arr[2];
                let tsPath = itself.fileIdToPathDic[arr[1]] = tsFile.slice(8);
                itself.clazzToPathDic[arr[2]] = tsPath;
            }
        }
    }
    /** 查找预制体文件 */
    private readFilePath(moduleName: string, fileName: string) {
        let itself = this;
        itself.currModule = moduleName;
        let prefabPath = _path.join(ConfigGlobal.PrefabModuleDir, moduleName.toLowerCase());
        let files = _fileUtils.getFiles(prefabPath, [".prefab"]);
        for (let index = 0, len = files.length; index < len; index++) {
            let file = files[index];
            if (fileName == void 0) {

            } else {
                let fileNames = fileName.split(",");
                let currName = _path.basename(file, _path.extname(file));
                if (fileNames.indexOf(currName) >= 0) {
                    itself.parsePrefab(file);
                }
            }
        }
    }

    /** index对应的新类名，主要针对item_，可能有类名但是没有数据，因为有重复的 */
    private indexToNewClazz = {};
    /** 当前解析的预制体数据 */
    private currPrefabJson: TPrefab[] = [];
    /** index对应的已经存起来的类 */
    private indexToYetClazz = {};
    /** 预制体跳过的localId */
    private breakLocalId = {};

    private parsePrefab(file: string) {
        let jsonArr = _fileUtils.readJsonSync(file) as TPrefab[];
        let prefab = jsonArr[0];
        if (!prefab || prefab.__type__ !== "cc.Prefab") {
            return logger.error("不是预制体：", file);
        }
        let itself = this;
        itself.indexToYetClazz = {};
        itself.breakLocalId = {};
        let currTsData = itself.getClazzData(prefab._name);
        itself.onController(jsonArr[1], currTsData, jsonArr);
        itself.onFindChild(jsonArr[1], currTsData, jsonArr, jsonArr[1]._name);
    }
    private getClazzData(clazzName: string) {
        let itself = this;
        let data = itself.clazzAllData[clazzName] = itself.clazzAllData[clazzName] || {} as TAllPrefab;
        if (data.isFirst) {
            return data;
        }
        data.UIName = clazzName;
        data.currModule = itself.currModule;
        data.comps = {};
        data.importComp = {};
        data.isFirst = true;
        return data;
    }
    /** 是否预制体 */
    private isPrefabData(data: TPrefab) {
        return data.__type__ == "cc.Node" && data._name == void 0 && data._children == void 0;
    }
    /** 寻找children */
    private onFindChild(data: TPrefab, currTsData: TAllPrefab, listJson: TPrefab[], prefabName: string) {
        let itself = this;
        if (itself.isPrefabData(data)) {
            itself.onPrefab(data, currTsData, listJson);
        } else {
            let children = data._children || [];
            for (let index = 0, len = children.length; index < len; index++) {
                let childId = children[index].__id__;
                let childData = listJson[childId];
                childData._id = index;
                let prefabJson = listJson[childData._prefab.__id__];
                let fileId = prefabJson.fileId;
                if (itself.breakLocalId[prefabName] && itself.breakLocalId[prefabName][fileId]) {
                    continue;
                }
                let map = itself.getNodeCompByName(childData, listJson, prefabName);
                itself.addToTsData(map, currTsData);
                if (!map.isBreak) {
                    itself.onFindChild(childData, currTsData, listJson, prefabName);
                }
            }
        }
    }

    private addToTsData(map, currTsData: TAllPrefab) {
        let itself = this;
        if (map && map.type && map.typePath) {
            logger.error("重复的变量名：", currTsData.UIName, map.name);
        }
        currTsData.comps[map.name] = map.type;
        currTsData.importComp[map.type] = map.typePath;
    }
    private onPrefab(data: TPrefab, currTsData: TAllPrefab, listJson: TPrefab[]) {
        let itself = this;
        let prefabId = data._prefab.__id__;
        let prefabJson = listJson[prefabId] || {} as TPrefab;
        let fileId = prefabJson.fileId;
        let prefabUUID = prefabJson.asset.__id__;
        let instanceId = prefabJson.instance.__id__;
        let instanceJson = listJson[instanceId] || {} as TPrefab;
        let propertyOverrides = instanceJson.propertyOverrides || [];
        let mountedChildren = instanceJson.mountedChildren || [];
        let prefabFile = itself.uuidToPathDic[prefabUUID];
        if (!prefabFile) {
            logger.error("没有此文件：", prefabUUID);
            return;
        }
        let currListJson = _fileUtils.readJsonSync(prefabFile) as TPrefab[];
        let prefabName = currListJson[1]._name;
        //先找到预制体的新名字，判断是否要跳过
        for (let index = 0, len = propertyOverrides.length; index < len; index++) {
            let propertyId = propertyOverrides[index].__id__;
            let propertyJson = listJson[propertyId] || {} as TPrefab;
            if (propertyJson.propertyPath[0] == "_name") {
                let targetJson = listJson[propertyJson.targetInfo?.__id__] || {} as TPrefab;
                let localID = targetJson.localID[0];
                if (localID == fileId) {
                    let name = propertyJson.value;
                    let map = itself.getPrefabCompByName(name, currListJson);
                    itself.addToTsData(map, currTsData);
                    if (map.isBreak) {
                        return map;
                    }
                    break;
                }
            }
        }
        //再找预制体下的名字
        for (let index = 0, len = propertyOverrides.length; index < len; index++) {
            let propertyId = propertyOverrides[index].__id__;
            let propertyJson = listJson[propertyId] || {} as TPrefab;
            if (propertyJson.propertyPath[0] == "_name") {
                let targetJson = listJson[propertyJson.targetInfo?.__id__] || {} as TPrefab;
                let localID = targetJson.localID[0];
                if (localID == fileId) {
                    continue;//上面找过了
                }
                let name = propertyJson.value;
                let prefix = itself.onBaseName(name).prefix;
                let type = ConfigRole[prefix];
                if (!type) {
                    continue;
                }
                if (itself.breakLocalId[prefabName] == void 0) {
                    itself.breakLocalId[prefabName] = {};
                }
                itself.breakLocalId[prefabName][localID] = 1;
                let nameMap = itself.resetNameMap();
                nameMap.type = type;
                nameMap.typePath = "1";
                nameMap.name = name;
                itself.addToTsData(nameMap, currTsData);
            }
        }
        //再找预制体下的新增的
        for (let index = 0, len = mountedChildren.length; index < len; index++) {
            let mountedId = mountedChildren[index].__id__;
            let mountedJson = listJson[mountedId] || {} as TPrefab;
            let nodes = mountedJson.nodes || [];
            for (let indexNode = 0, len = nodes.length; indexNode < len; indexNode++) {
                let nodeId = nodes[indexNode].__id__;
                let nodeJson = listJson[nodeId] || {} as TPrefab;
                if (nodeJson._children) {//预制体下新增节点，节点又有child
                    itself.onFindChild(nodeJson, currTsData, listJson, prefabName);
                }
                let name = nodeJson._name;
                let prefix = itself.onBaseName(name).prefix;
                let type = ConfigRole[prefix];
                if (!type) {
                    continue;
                }
                let nameMap = itself.resetNameMap();
                nameMap.type = type;
                nameMap.typePath = "1";
                nameMap.name = name;
                itself.addToTsData(nameMap, currTsData);
            }
        }
        itself.onFindChild(currListJson[1], currTsData, currListJson, prefabName);
    }

    private resetNameMap() {
        let map = {} as TBaseName2;
        return map;
    }
    private onBaseName(name: string) {
        let map: TBaseName = {}
        if (!name) {
            return map;
        }
        if (name.indexOf("_") < 0) {
            return map;
        }
        let [prefix, suffix] = name.split("_");
        prefix = `${prefix}_`;
        let type = ConfigRole[prefix] as string;
        if (!type) {
            return map;
        }
        map.prefix = prefix;
        map.suffix = suffix;
        return map;
    }

    private getPrefabCompByName(name: string, listJson: TPrefab[]) {
        let itself = this;
        let prefix = itself.onBaseName(name).prefix;
        let nameMap = itself.resetNameMap();
        let custType = itself.getCompment(listJson[1], listJson);
        if (!prefix) {
            nameMap.isBreak = custType.isBreak;
            return nameMap;
        }
        let type = ConfigRole[prefix];
        if (type == ConfigCustComp) {
            custType.name = name;
            return custType;
        }
        if (!type) {
            return nameMap;
        }
        nameMap.type = type;
        nameMap.typePath = "1";
        nameMap.name = name;
        nameMap.isBreak = false;
        return nameMap;
    }

    private getNodeCompByName(data: TPrefab, listJson: TPrefab[], prefabName: string) {
        let itself = this;
        let name = data._name;
        let nameMap = itself.resetNameMap();
        nameMap.name = name;
        let map = itself.onBaseName(name);
        if (map.suffix.indexOf("-") >= 0) {
            logger.warn("变量名存在[-]，已跳过", prefabName, name);
            nameMap.isBreak = true;
            return nameMap;
        }
        let prefix = map.prefix;
        if (!prefix) {
            let currMap = itself.getCompment(data, listJson);
            nameMap.isBreak = currMap.isBreak;
            return nameMap;
        }
        let type = ConfigRole[prefix];
        if (prefix == "item_") {
            let clazzName = map.suffix + "Render";
            nameMap.isBreak = true;
            if (itself.clazzAllData[clazzName]) {
                return nameMap;
            }
            let newTsData = itself.getClazzData(clazzName);
            itself.indexToNewClazz[data._id] = { name: clazzName, parent: this.currPrefabJson[1]._name };
            itself.onController(data, newTsData, listJson);
            itself.onFindChild(data, newTsData, listJson, prefabName);
            return nameMap;
        } else if (type == ConfigCustComp) {
            let currMap = itself.getCompment(data, listJson);
            nameMap.type = currMap.type;
            nameMap.typePath = currMap.typePath;
            nameMap.isBreak = currMap.isBreak;
            return nameMap;
        }
        else if (prefix == "sp_") {
            let type = ConfigRole[prefix];
            nameMap.type = type;
            nameMap.typePath = "2";
            return nameMap;
        } else {
            let type = ConfigRole[prefix];
            nameMap.type = type;
            nameMap.typePath = "1";
            return nameMap;
        }
    }
    /**
     * 获取自定义组件
     * @param currData 
     * @param listJson 
     */
    private getCompment(currData: TPrefab, listJson: TPrefab[]) {
        let itself = this;
        let nameMap = itself.resetNameMap();
        try {
            if (!currData || !currData._components) {
                return nameMap;
            }
            for (let index = 0, len = currData._components.length; index < len; index++) {
                let comp = currData._components[index];
                let fileIdOrComp = listJson[comp.__id__].__type__;
                if (fileIdOrComp.indexOf("cc.") >= 0) {
                    continue;//系统组件
                }
                if (fileIdOrComp.indexOf("sp.") >= 0) {
                    continue;//系统组件
                }
                let clazzName = itself.fileIdToClassDic[fileIdOrComp];
                if (ConfigBreakComp[clazzName]) {
                    continue;
                }
                nameMap.isBreak = clazzName != "ListView";
                nameMap.type = clazzName;
                nameMap.typePath = itself.fileIdToClassDic[fileIdOrComp];
                return nameMap;
            }
            return nameMap;
        } catch (error) {
            logger.error(error);
            return nameMap;
        }
    }

    private onController(currData: TPrefab, currTsData: TAllPrefab, listJson: TPrefab[]) {
        let itself = this;
        if (!currData || !currData._components) {
            return;
        }
        for (let index = 0, len = currData._components.length; index < len; index++) {
            let comp = currData._components[index];
            let compJson = listJson[comp.__id__];
            let fileIdOrComp = compJson.__type__;
            if (fileIdOrComp.indexOf("cc.") >= 0) {
                continue;//系统组件
            }
            if (fileIdOrComp.indexOf("sp.") >= 0) {
                continue;//系统组件
            }
            let clazzName = itself.fileIdToClassDic[fileIdOrComp];
            if (clazzName != ConfigBreakComp[ConfigBreakComp.StateController]) {
                continue;
            }
            currTsData.comps[compJson._ctrlName] = clazzName;
            currTsData.importComp[clazzName] = clazzName;
        }
    }

    private wirteToFile() {
        let itself = this;
        for (let clazzName in itself.clazzAllData) {
            let uiMap = itself.clazzAllData[clazzName];
            let tempClazzName = "UI_" + clazzName.charAt(0).toUpperCase() + clazzName.slice(1);
            let currPath = _path.join(ConfigGlobal.ScriptModuleDir, uiMap.currModule, "auto");
            let needWriteFile = _path.join(currPath, `${tempClazzName}.ts`);
            let fileData = _fileUtils.readFileSync(needWriteFile, { encoding: "utf-8" });
            let extendsName = "";
            if (fileData) {
                let matchStr = fileData.match(/extends.*{/) || [""];
                extendsName = matchStr[0].split(" ")[1];
            }
            //写入import
            let clazz = itself.getImportStr(uiMap);
            let compName = "BaseComponent";
            if (extendsName) {
                compName = extendsName;
            } else if (tempClazzName.match(/UI$/)) {
                compName = "FullScreenView";
            } else if (tempClazzName.match(/Render$/)) {
                compName = "ListItem";
            } else if (tempClazzName.match(/Win$/)) {
                compName = "PopupView";
            }
            let toPath = _path.join(itself.clazzToPathDic[compName]);
            clazz += itself.getCustImport(currPath, toPath, compName);
            //写入type
            let typeStr = `\ntype T${tempClazzName} = {\n`;
            let propMap = "\tprotected __metaMap = {";//属性
            let has = false;
            for (let name in uiMap.comps) {
                let has = true;
                typeStr += `\t${name}?: ${uiMap.comps[name]};\n`;
                let importType = uiMap.importComp[uiMap.comps[name]];
                if (importType == "1") {
                    propMap += ` ${name}: "cc.${uiMap.comps[name]}",`;
                } else {
                    propMap += ` ${name}: "${uiMap.comps[name]}",`;
                }
            }
            if (!has) {
                continue;
            }
            clazz += `${typeStr}}`;
            //写入class
            clazz += `\nexport class ${tempClazzName} extends ${compName} {\n`;
            propMap = propMap.substring(0, propMap.length - 1);
            clazz += `${propMap} };\n`;
            clazz += `\tprotected __uiComps: T${tempClazzName} = {};\n`;
            //方法
            clazz += `\t/** 自定义绑定的组件 */\n\tget uiComps() {\n\t\tlet isself = this; if (!itself.inInitComp) itself.__initComp(); return itself.__uiComps;\n\t}\n`;
            clazz += "}";
            _fileUtils.writeFileSync(needWriteFile, clazz, { encoding: "utf-8" });
        }
    }
    private getImportStr(uiMap: TAllPrefab) {
        let itself = this;
        let currPath = _path.join(ConfigGlobal.ScriptModuleDir, uiMap.currModule, "auto");
        let ctrlPath = itself.clazzToPathDic[ConfigBreakComp[ConfigBreakComp.StateController]];
        let importCust = "";
        let importCC = "";
        for (let comp in uiMap.importComp) {
            let tsPath = uiMap.importComp[comp];
            if (tsPath == "1") {
                importCC += `${comp}, `;
            } else if (tsPath == "2") {
                importCC += `${comp.split(".")[0]}, `
            } else if (tsPath == ConfigBreakComp[ConfigBreakComp.StateController]) {
                importCust += itself.getCustImport(currPath, ctrlPath, comp);
            } else {
                importCust += itself.getCustImport(currPath, _path.join(tsPath), comp);
            }
        }
        if (importCC) {
            importCC = importCC.substring(0, importCC.length - 2);
            importCC = `import { ${importCC} } from "cc";\n`;
        }
        importCC += importCust;
        return importCC;
    }
    private getCustImport(currPath: string, toPath: string, comp: string) {
        let importStr = `import { ${comp} } from `;
        let currArr = currPath.split("\\");
        let toArr = toPath.split("\\");
        let diffIndex = void 0;
        let pointStr = "";
        for (let index = 0, len = currArr.length; index < len; index++) {
            let curr = currArr[index];
            let to = toArr[index];
            if (diffIndex == void 0 && curr != to) {
                diffIndex = index;
            }
            if (diffIndex != void 0) {
                pointStr += "../";
            }
        }
        let toStr = toArr[toArr.length - 1];
        if (diffIndex == void 0) {
            pointStr = "./";
        } else {
            toStr = toArr.slice(diffIndex).join("/");
        }
        toStr = toStr.slice(0, toStr.length - 3);
        pointStr += toStr;
        importStr += `"${pointStr}";\n`;
        return importStr;
    }
}

let cmd_prefab = new CmdPrefab();