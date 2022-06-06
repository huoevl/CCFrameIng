
const _fse: typeof import("fs-extra") = require("fs-extra");
const _path: typeof import("path") = require("path");

/** 配置信息 */
interface ICfg {
    /** prefab路径 */
    ui_path: string;
}

//prefab信息
interface IChild {
    /** 子节点或者组件index */
    __id__: number;
}
interface IBase {
    /** 节点类型 */
    __type__: string;
    /** 名字（组件可能没有名字） */
    _name: string;
}
interface IPrefab extends IBase {
    /** 预制体数据 */
    data: IChild;
}
interface IPrefabInfo extends IBase {
    /** 文件id */
    fileId: string;
}
interface INode extends IBase {
    /** 子节点 */
    _children: IChild[];
    /** 父节点index */
    _parent: number;
    /** 节点是否激活 */
    _active: boolean;
    /** 组件列表 */
    _components: IChild[];
    /** 对应的_prefab的id */
    _prefab: IChild;
}
interface IComponent extends IBase {
    /** 组件绑定的节点 */
    node: IChild;
    /** 组件是否激活 */
    _enabled: boolean;
}

//预存结构信息
interface IComp {
    name: string;
    type: string;
    comps?: IComp[];
}
interface IUIData {
    /** 界面名称 */
    UIName?: string;
    path?: string;
    fromCC?: { [type: string]: number };
    comps?: IComp[];
}
interface IUIMap {
    [fileId: string]: IUIData;
}

/** CocosCreator节点或者组件默认名称 */
const Predefined = {
    "Label": true,
    "Node": true,
    "Sprite": true,
} as { [key: string]: boolean }
/** 需要绑定的组件 */
const NeedType = {
    "cc.Label": true,
    "cc.Sprite": true,
} as { [key: string]: boolean }

class cmd_prefab {
    /** 配置 */
    cfg = {} as ICfg;
    /** 缓存 */
    data: IUIMap;
    constructor() {
        let itself = this;
        itself.data = {} as IUIMap;
        let cfg = itself.cfg;
        cfg.ui_path = _path.join(__dirname, "../assets/ui");
        itself.execute();
    }
    async execute() {
        let itself = this;
        itself.readFile();
    }

    /** 读取 */
    readFile() {
        let itself = this;
        let ui_path = itself.cfg.ui_path;
        let dirArr = _fse.readdirSync(ui_path);
        for (let index = 0, len = dirArr.length; index < len; index++) {
            let module_dir = _path.join(ui_path, dirArr[index]);
            if (_fse.statSync(module_dir).isDirectory()) {
                let files = _fse.readdirSync(module_dir);
                for (let indexPrf = 0, len = files.length; indexPrf < len; indexPrf++) {
                    let filename = files[indexPrf];
                    /** 后缀 */
                    let houzui = _path.extname(filename);
                    let file_path = _path.join(module_dir, filename);
                    if (houzui == ".prefab") {
                        itself.parsePrefab(file_path, module_dir);
                    } else if (houzui == ".ts") {
                        _fse.unlinkSync(file_path);
                    }

                }
            }
            // let filename=fse.
        }
        itself.wirteToFile();
    }

    /** 解析预制体 */
    parsePrefab(filepath: string, dirPath: string) {
        let itself = this;
        let json = _fse.readFileSync(filepath, { encoding: "utf-8" });
        let jsonArr: INode[] | IComponent[] | IPrefab[] | IPrefabInfo[] = JSON.parse(json) || [];
        //先确定是不是prefab
        let prefab = jsonArr[0] as IPrefab;
        if (!prefab || prefab.__type__ !== "cc.Prefab") {
            return console.error("不是预制体：", prefab.__type__);
        }
        let rootNode = jsonArr[prefab.data.__id__] as INode;
        let prefabInfo = jsonArr[rootNode._prefab.__id__] as IPrefabInfo;
        let data = itself.data[prefabInfo.fileId] = itself.data[prefabInfo.fileId] || {} as IUIData;
        data.UIName = rootNode._name;
        data.fromCC = { Component: 1 };
        data.path = dirPath;
        let comps = data.comps = data.comps || [];

        /** 解析节点 */
        let parseNode = function (dataComps: IComp[], nodeId: number) {
            let node = jsonArr[nodeId] as INode;
            let name = node._name;
            if (!name || Predefined[name]) {
                return;
            }
            let map = {} as IComp;
            map.name = name;
            map.type = node.__type__.split(".")[1];//可能是空节点
            map.comps = [];
            dataComps.push(map);
            //一个节点，我们只需要其中一个正确的组件
            for (let index = 0, len = node._components.length; index < len; index++) {
                let result = parseComp(map, name, node._components[index].__id__);
                if (result) {
                    break;
                }
            }
            for (let index = 0, len = node._children.length; index < len; index++) {
                parseNode(map.comps, node._children[index].__id__)
            }
        }

        /** 解析组件 */
        let parseComp = function (dataMap: IComp, name: string, compId: number) {
            let comp = jsonArr[compId] as IComponent;
            if (!NeedType[comp.__type__]) {
                return false;
            }
            dataMap.name = name;
            dataMap.type = comp.__type__.split(".")[1];
            data.fromCC[dataMap.type] = 1;
            return true
        }
        for (let index = 0, len = rootNode._children.length; index < len; index++) {
            parseNode(comps, rootNode._children[index].__id__)
        }
    }

    /** 写入 */
    wirteToFile() {
        let itself = this;
        let data = itself.data;
        for (let key in data) {
            let clazz = "";
            let uiMap = data[key];
            //写入import
            let ccStr = "import { ";
            for (let comp in uiMap.fromCC) {
                ccStr += `${comp}, `;
            }
            ccStr = ccStr.substring(0, ccStr.length - 2);
            ccStr += ' } from "cc";\n\n';
            clazz += ccStr;
            //写入class
            clazz += `export class ${uiMap.UIName} extends Component {\n`;
            clazz += `\tpublic static NAME = ${uiMap.UIName};\n`;
            //属性
            let propStr = "";
            let constStr = "\tonLoad() {\n\t\tlet itself = this;\n";
            let prop = function (comps: IComp[], parent: string) {
                if (!comps || !comps.length) {
                    return;
                }

                for (let index = 0, len = comps.length; index < len; index++) {
                    let comp = comps[index];
                    propStr += `\tpublic ${comp.name}: ${comp.type};\n`;
                    constStr += `\t\t${parent}.${comp.name} = ${parent}.node.getChildByName("${comp.name}").getComponent(${comp.type});\n`;
                    prop(comp.comps, `${parent}.${comp.name}`);
                }
            }
            prop(uiMap.comps, "itself");

            constStr += `\t}\n}`
            clazz += `${propStr}\n${constStr}`;
            _fse.writeFileSync(_path.join(uiMap.path, `${uiMap.UIName}.ts`), clazz);
        }

    }
}
new cmd_prefab()
