/**
 * 开发中遇到的一些问题：
 * 1、节点没激活，不会执行：__preload()等生命周期函数
 * 2、一个对象里又_开头的key，不会被序列化
 * 3、代码修改，回到界面组件会先被销毁然后重新添加
 * 4、属性里对象的赋值，是克隆对象里的值，并不是改变指向的地址
 * 
 * 
 * 控制器已知问题：
 * 1、改变文本只能在propvalue那里设置。从自带的string那里改变没有监听方法,
 * 2、改变UIOpacity组件的透明度同个问题。
 * 3、改变四元数也有问题，编辑器只能改变欧拉角。
 * 
 */



import { CCClass, CCString, Component, Enum, _decorator } from 'cc';
import { EDITOR } from 'cc/env';
import { EnumStateName, EnumUpdataType } from './StateEnum';
import { StateSelect } from './StateSelect';
const { ccclass, property, executeInEditMode } = _decorator;

Enum(EnumStateName)

@ccclass("stateValue")
export class StateValue {
    index: number;
    @property(CCString)
    name: string = "";
    uuid: number;
    constructor(index: number, name: string, uuid: number) {
        let itself = this;
        itself.index = index;
        itself.name = name;
        itself.uuid = uuid;
    }
}
@ccclass('StateCtrl')
@executeInEditMode(true)
export class StateCtrl extends Component {
    private upId = 0;
    /** 选中的状态下标 */
    @property(EnumStateName)
    private _selectedIndex: EnumStateName = 0;
    /** 状态名字列表 */
    @property
    private _pageNames: StateValue[] = [];
    /** 上一次选中的下标 */
    private _previousIndex: number = -1;
    /** 所有绑定选择器的节点 */
    @property
    private _allSelectors: { [uuid: string]: StateSelect } = {};
    /** 控制器名字 */
    @property(CCString)
    // private _ctrlName: string = `ctrl_${Date.now().toString()}`;
    private _ctrlName: string = "";
    /** 是否正在改变 */
    changing?: boolean;


    __preload() {
        let itself = this;
        if (!EDITOR) {
            return;
        }
        if (!itself._pageNames.length) {
            itself._pageNames = [new StateValue(0, "0", itself.upId++), new StateValue(1, "1", itself.upId++)]
        }
        let array = itself.states.map((val, i) => {
            return { name: val.name, value: i };
        })
        CCClass.Attr.setClassAttr(itself, "selectedIndex", "enumList", array);
        // console.log(CCClass.Attr.getClassAttrs(itself)[`selectedIndex${CCClass.Attr.DELIMETER}enumList`])
        if (!itself._allSelectors) {
            itself._allSelectors = {};
        }
        if (itself.node["__CtrlName"] == void 0) {
            itself.node["__CtrlName"] = 0;
        }
        if (!itself._ctrlName) {
            itself._ctrlName = `c${itself.node["__CtrlName"]++}`;
        }
    }
    onDestroy() {
        let itself = this;
        itself.updateState(EnumUpdataType.delete)
    }

    @property({ displayName: "name", tooltip: "控制器唯一名称" })
    get ctrlName() {
        return this._ctrlName;
    }
    set ctrlName(value: string) {
        let itself = this;
        itself._ctrlName = value;
        itself.updateState(EnumUpdataType.name);
    }
    @property({ type: CCString, tooltip: "状态数量。数组内容为状态名称" })
    get states() {
        return this._pageNames;
    }
    private set states(value: StateValue[]) {
        if (!EDITOR) {
            return;
        }
        let itself = this;
        if (value.length < 2) {
            console.error("状态必须大于两个")
            return;
        }
        console.log(value);
        itself._pageNames = value;
        let stateMap: { [key: string]: boolean } = {};
        let array = value.map((val, i) => {
            if (val && stateMap[val.name]) {
                console.error("重复的状态值", val, i);
            }
            stateMap[val.name] = true;
            return { name: val.name, value: i };
        })
        itself.updateState(EnumUpdataType.selPage)
        CCClass.Attr.setClassAttr(itself, "selectedIndex", "enumList", array);
    }

    /** 选择的状态下标 */
    @property({ type: EnumStateName, displayName: "selectedPage", tooltip: "当前选中的状态" })
    public get selectedIndex() {
        return this._selectedIndex;
    }
    public set selectedIndex(value: EnumStateName) {
        let itself = this;
        if (itself._selectedIndex != value) {
            if (value > itself._pageNames.length - 1) {
                throw "index out of bounds:（越界） " + value;
            }
            itself.changing = true;
            itself._previousIndex = itself._selectedIndex;
            itself._selectedIndex = value;
            itself.updateState(EnumUpdataType.state);
            itself.changing = false;
        }
    }
    /** 上一次的选中下标 */
    public get previsousIndex(): number {
        return this._previousIndex;
    }
    /** 选择的状态名字 */
    public get selectedPage(): string {
        if (this._selectedIndex == -1)
            return null;
        else
            return this._pageNames[this._selectedIndex].name;
    }
    public set selectedPage(val: string) {
        let itself = this;
        for (let index = 0, len = itself._pageNames.length; index < len; index++) {
            if (itself._pageNames[index].name == val) {
                itself.selectedIndex = index;
                return;
            }
        }
    }
    /** 更新状态 */
    private updateState(type: EnumUpdataType, value?: any) {
        let itself = this;
        for (let uuid in itself._allSelectors) {
            let select = itself._allSelectors[uuid];
            if (!select) {
                console.warn("出现了多余的selector是空的")
                continue;
            }
            if (type == EnumUpdataType.state) {
                select.updateState(itself);
            } else if (type == EnumUpdataType.name) {
                select.updateCtrlName(itself.node);
            } else if (type == EnumUpdataType.selPage) {
                select.updateCtrlPage(itself);
            } else if (type == EnumUpdataType.delete) {
                select.updateDelete(itself);
            }
        }
    }
    public addSelector(select: StateSelect) {
        let itself = this;
        itself._allSelectors[select.uuid] = select;
    }
    public removeSelector(select: StateSelect) {
        let itself = this;
        delete itself._allSelectors[select.uuid];
    }
}

