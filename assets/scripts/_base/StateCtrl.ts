/**
 * 一些问题：
 * 1、节点没激活，不会执行：__preload()等生命周期函数
 * 2、一个对象里又_开头的key，不会被序列化
 * 3、
 * 
 * 
 * 
 * 
 */


import { CCClass, CCString, Component, Enum, _decorator } from 'cc';
import { EnumStateName, EnumUpdataType } from './StateEnum';
import { StateSelect } from './StateSelect';
const { ccclass, property, executeInEditMode } = _decorator;

Enum(EnumStateName)
@ccclass('StateCtrl')
@executeInEditMode(true)
export class StateCtrl extends Component {
    /** 选中的状态下标 */
    @property(EnumStateName)
    private _selectedIndex: EnumStateName = 0;
    /** 状态名字列表 */
    @property
    private _pageNames: string[] = ["0", "1"];
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
        let array = itself.states.map((val, i) => {
            return { name: val, value: i };
        })
        CCClass.Attr.setClassAttr(itself, "selectedIndex", "enumList", array);
        // console.log(CCClass.Attr.getClassAttrs(itself)[`selectedIndex${CCClass.Attr.DELIMETER}enumList`])
        if (!itself._allSelectors) {
            itself._allSelectors = {};
        }
        if (itself.node["__CtrlName"] == void 0) {
            itself.node["__CtrlName"] = 0;
        }
        itself._ctrlName = `c${itself.node["__CtrlName"]++}`;

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
        let oldName = itself.ctrlName;
        itself._ctrlName = value;
        itself.updateState(EnumUpdataType.name, oldName);
    }
    @property({ type: CCString, tooltip: "状态数量。数组内容为状态名称" })
    get states() {
        return this._pageNames;
    }
    set states(value: string[]) {
        let itself = this;
        if (value.length < 2) {
            console.error("状态必须大于两个")
            return;
        }
        itself._pageNames = value;
        let stateMap: { [key: string]: boolean } = {};
        let array = value.map((val, i) => {
            if (val && stateMap[val]) {
                console.error("重复的状态值", val, i);
            }
            stateMap[val] = true;
            return { name: val, value: i };
        })
        itself.updateState(EnumUpdataType.selPage)
        CCClass.Attr.setClassAttr(itself, "selectedIndex", "enumList", array);
    }

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
    /** 更新状态 */
    private updateState(type: EnumUpdataType, value?: any) {
        let itself = this;
        for (let uuid in itself._allSelectors) {
            let select = itself._allSelectors[uuid];
            if (type == EnumUpdataType.state) {
                select.updateState(itself);
            } else if (type == EnumUpdataType.name) {
                select.updateCtrlName(itself.node, value, itself.ctrlName);
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

