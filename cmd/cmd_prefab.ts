
const fse: typeof import("fs-extra") = require("fs-extra");
const path: typeof import("path") = require("path");

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
    /** 要创建的类 */
    clazz: string;
    constructor() {
        let itself = this;
        itself.data = {} as IUIMap;
        itself.clazz = "";
        let cfg = itself.cfg;
        cfg.ui_path = path.join(__dirname, "../assets/ui");
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
        let dirArr = fse.readdirSync(ui_path);
        for (let index = 0, len = dirArr.length; index < len; index++) {
            let module_dir = path.join(ui_path, dirArr[index]);
            if (fse.statSync(module_dir).isDirectory()) {
                let files = fse.readdirSync(module_dir);
                for (let indexPrf = 0, len = files.length; indexPrf < len; indexPrf++) {
                    let filename = files[indexPrf];
                    /** 后缀 */
                    let houzui = path.extname(filename);
                    let file_path = path.join(module_dir, filename);
                    if (houzui == ".prefab") {
                        itself.parsePrefab(file_path);
                    } else if (houzui == ".ts") {
                        fse.unlinkSync(file_path);
                    }

                }
            }
            // let filename=fse.
        }
        itself.wirteToFile();
    }

    /** 解析预制体 */
    parsePrefab(filepath: string) {
        let itself = this;
        let json = fse.readFileSync(filepath, { encoding: "utf-8" });
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
            map.type = node.__type__;//可能是空节点
            map.comps = [];
            dataComps.push(map);
            //一个节点，我们只需要其中一个正确的组件
            for (let index = 0, len = node._components.length; index < len; index++) {
                let result = parseComp(map, name, index);
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
            let map = {} as IComp;
            map.name = name;
            map.type = comp.__type__;
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
        let str = itself.clazz;

    }
}
new cmd_prefab()
