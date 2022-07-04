/**
 *      ctrlName:{
 *          $$lastState$$ : state1
 *          $$default$$:{
 *             EnumPropName.active : true,//active
 *              1 : v3,//postion, 
 *              .....
 *          }
 *          state0 : {
 *              $$lastProp$$:EnumPropName.active
 *              EnumPropName.active : true,//active
 *              .....
 *          },
 *          state1:{
 *              $$lastProp$$:EnumPropName.pos
 *              1 : v3,//postion,
 *              .....
 *          }
 *          stateName1:{},
 *      }
 * 
 */

import { CCClass, Color, Component, Enum, Node, Size, Vec2, Vec3, _decorator } from 'cc';
import { StateCtrl } from './StateCtrl';
import { EnumCtrlName, EnumPropName, EnumStateName } from './StateEnum';
const { ccclass, property, executeInEditMode } = _decorator;
Enum(EnumCtrlName);
Enum(EnumStateName);
Enum(EnumPropName);

/** 属性类型 */
type TPropValue = number | boolean | string | Vec3 | Vec2 | Color | Size;
type TProp = {
    $$lastProp$$?: number;
    [key: number]: TPropValue,
}
type TPage = {
    /** 上次选择的状态 */
    $$lastState$$?: number,
    /** 默认状态属性 */
    $$default$$?: TProp;
    [state: number]: TProp
}
type TCtrl = {
    [name: string]: TPage;
}
@ccclass('StateSelect')
@executeInEditMode(true)
export class StateSelect extends Component {
    /** root节点所有的ctrl */
    @property
    private _ctrlsMap: { [name: string]: StateCtrl } = {};
    /** ctrl中选择的状态 */
    @property
    private _ctrlState: number = null;
    /** 当前中的ctrl */
    @property
    private _currCtrl: StateCtrl = null;
    /** 当前选中的ctrl名称 */
    @property(EnumCtrlName)
    private _ctrlName: string = null;
    /** 当前选中的状态 */
    @property(EnumStateName)
    private _currState: number = null;
    @property
    private _root: Node = null;
    /** 当前状态要改变的属性 */
    @property({ type: EnumPropName })
    private _propKey: EnumPropName = null;
    /** 当前状态要改变的属性值 */
    @property
    private _propValue: any = null;
    /** 是否立即执行 */
    @property
    private _isImmediately: boolean = false;

    /** 状态数据 */
    @property
    _ctrlData: TCtrl = {};

    /** 是否重新获取 */
    @property({ tooltip: "是否重新获取ctrl" })
    get isReload() {
        return false;
    }
    set isReload(value: boolean) {
        let itself = this;
        if (value) {
            itself.__preload();
        }
    }

    @property({ type: EnumStateName, tooltip: "控制器所在节点，仅提示用" })
    get ctrlState() {
        return this._ctrlState;
    }
    set ctrlState(value: number) {
        let itself = this;
        itself._ctrlState = value;
        if (itself._currCtrl) {
            itself._currCtrl.selectedIndex = value;
        }
    }

    /** 控制器所在节点 */
    @property({ type: Node, tooltip: "控制器所在节点，仅提示用" })
    get root() {
        return this._root;
    }
    /** 控制器名称 */
    @property({ type: EnumCtrlName, tooltip: "选择的控制器" })
    get ctrlName() {
        return this._ctrlName;
    }
    set ctrlName(value: string) {
        let itself = this;
        itself._ctrlName = value;
        if (!value) {
            itself.currState = null;
            return;
        }
        itself._currCtrl = itself._ctrlsMap[value];
        itself._ctrlState = itself._currCtrl.selectedIndex;
        itself._currCtrl.addSelector(itself);
        itself.updateCtrlPage(itself._currCtrl);
        itself.refPage();
    }
    /** 控制器状态 */
    @property({ type: EnumStateName, tooltip: "需要改变属性的状态" })
    get currState() {
        return this._currState;
    }
    set currState(value: number) {
        let itself = this;
        if (itself.ctrlName == void 0) {
            itself._currState = null;
            itself._propKey = EnumPropName.Non;
            return;
        }
        itself._currState = value;
        let pageData = itself.getPageData();
        pageData.$$lastState$$ = value;
        itself.refProp();
    }
    /** 属性列表 */
    @property({ type: EnumPropName, tooltip: "属性选择列表" })
    get propKey() {
        return this._propKey;
    }
    set propKey(value: EnumPropName) {
        let itself = this;
        if (itself.currState == void 0) {
            itself._propKey = EnumPropName.Non;
            return;
        }
        itself._propKey = value;
        let propData = itself.getPropData();
        propData.$$lastProp$$ = value;
        itself.setPropValue(value)
    }
    /** 属性值 */
    @property({ tooltip: "当前状态属性值" })
    get propValue() {
        return this._propValue;
    }
    set propValue(value: any) {
        let itself = this;
        itself._propValue = value;
        let propData = itself.getPropData();
        propData[itself.propKey] = value;
    }
    /** 是否立即刷新 */
    @property({ tooltip: "是否立即刷新编辑器界面" })
    get isImmediately() {
        return this._isImmediately;
    }
    set isImmediately(value: boolean) {
        let itself = this;
        if (!itself.ctrlName) {
            return;
        }
        itself._isImmediately = value;
        if (value) {
            itself.updateState(itself._currCtrl);
        }
    }

    /** 刷新上次选中页 */
    private refPage() {
        let itself = this;
        let pageData = itself.getPageData();
        let lastState = pageData.$$lastState$$;
        if (lastState) {
            itself.currState = lastState;
        } else {
            itself.currState = 0;
        }
    }
    /** 刷新上次选中属性 */
    private refProp() {
        let itself = this;
        let propData = itself.getPropData();
        let lastProp = propData.$$lastProp$$;
        if (lastProp) {
            itself.propKey = lastProp;
        } else {
            itself.propKey = EnumPropName.Non;
        }
    }

    __preload() {
        let itself = this;
        itself.updateCtrlName(itself.node.parent);
        itself.updateCtrlPage(itself._currCtrl);
        if (!itself.ctrlName) {
            let keys = Object.keys(itself._ctrlsMap);
            if (keys.length) {
                itself.ctrlName = keys[0];
            } else {
                console.error("没有添加控制器")
                itself.destroy();
            }
        } else {
            itself.refProp();
        }
    }
    onLoad() {
        let itself = this;
        itself.node.on(Node.EventType.PARENT_CHANGED, itself._parentChanged, this);
        itself.node.on(Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, itself._activeChanged, this);
        itself.node.on(Node.EventType.TRANSFORM_CHANGED, itself._positionChanged, this);
    }
    onDestroy() {
        let itself = this;
        for (let key in itself._ctrlsMap) {
            itself._ctrlsMap[key].removeSelector(itself);
        }
    }
    //==============一些监听=================
    /** 父节点改变 */
    private _parentChanged(oldParent: Node) {
        let itself = this;
        itself.setDefaultPorp(EnumPropName.Position);
    }
    /** 节点active改变 */
    private _activeChanged(node: Node) {
        let itself = this;
        itself.setDefaultPorp(EnumPropName.Active);
    }
    private _positionChanged(pos: Vec3) {
        let itself = this;
        itself.setDefaultPorp(EnumPropName.Position);
    }

    //=============一些界面的显示==============
    /** 更新控制器 */
    updateCtrlName(node: Node, oldName?: string, newName?: string) {
        let itself = this;
        if (oldName && newName) {
            let pageData = itself._ctrlData[oldName];
            delete itself._ctrlData[oldName];
            itself._ctrlData[newName] = pageData;
            if (itself.ctrlName == oldName) {
                itself._ctrlName = newName;
            }
        }
        let ctrls = itself.getCtrls(node);
        itself._ctrlsMap = {};
        let arr = ctrls.map((val, i) => {
            itself._ctrlsMap[val.ctrlName] = val;
            return { name: val.ctrlName, value: val.ctrlName }
        })
        CCClass.Attr.setClassAttr(itself, "ctrlName", "enumList", arr);
    }
    /** 获取所有的Ctrl */
    private getCtrls(node: Node): StateCtrl[] {
        if (!node) {
            return [];
        }
        let ctrls = node.getComponents(StateCtrl);
        if (ctrls.length) {
            this._root = node;
            return ctrls;
        }
        return this.getCtrls(node.parent);
    }
    /** 更新状态数量 */
    updateCtrlPage(ctrl: StateCtrl) {
        let itself = this;
        if (!ctrl) {
            return;
        }
        let arr = ctrl.states.map((val, i) => {
            return { name: val, value: i }
        })
        CCClass.Attr.setClassAttr(itself, "ctrlState", "enumList", arr);
        CCClass.Attr.setClassAttr(itself, "currState", "enumList", arr);
    }
    /** 控制器被删除 */
    updateDelete(ctrl: StateCtrl) {
        let itself = this;
        console.log("删除")
        delete itself._ctrlData[ctrl.ctrlName];
        if (itself.ctrlName == ctrl.ctrlName) {
            itself.destroy();
        }
    }

    //==============更具控制器更新的状态================
    private _isFromCtrl: boolean = false;
    /** 更新状态 */
    updateState(ctrl: StateCtrl) {
        let itself = this;
        itself._isFromCtrl = true;
        let propData = itself.getPropData(ctrl.selectedIndex, ctrl.ctrlName);
        let defaultData = itself.getDefaultData(ctrl.ctrlName);
        for (let key in defaultData) {
            let value = propData[key] != void 0 ? propData[key] : defaultData[key];
            itself.updateUI(Number(key), value)
        }
        itself._isFromCtrl = false;
    }
    updateUI(type: EnumPropName, value: TPropValue) {
        let itself = this;
        switch (type) {
            case EnumPropName.Non: {
                return;
            }
            case EnumPropName.Active: {
                itself.node.active = value as boolean;
            } break;
            case EnumPropName.Position: {
                itself.node.position = value as Vec3;
            } break;
        }
    }

    //=============一些计算方式，仅储存值使用=================

    /** 获取某个控制器的状态数据 */
    private getPageData(ctrlName?: string) {
        let itself = this;
        ctrlName = ctrlName == void 0 ? itself.ctrlName : ctrlName;
        if (itself._ctrlData[ctrlName] == void 0) {
            itself._ctrlData[ctrlName] = {};
        }
        return itself._ctrlData[ctrlName];
    }
    /** 获取某个状态的属性数据 */
    private getPropData(state?: number, ctrlName?: string) {
        let itself = this;
        let pageData = itself.getPageData(ctrlName);
        state = state == void 0 ? itself.currState : state;
        if (pageData[state] == void 0) {
            pageData[state] = {};
        }
        return pageData[state];
    }
    /** 获取缓存的属性值 */
    private getPropValue(type: EnumPropName) {
        let itself = this;
        let propData = itself.getPropData();
        let value = propData[type];
        return value;
    }
    /** 获取默认属性 */
    private getDefaultData(ctrlName?: string) {
        let itself = this;
        let pageData = itself.getPageData(ctrlName);
        if (pageData.$$default$$ == void 0) {
            pageData.$$default$$ = {};
        }
        return pageData.$$default$$;
    }

    /** 设置属性值 */
    private setPropValue(type: EnumPropName) {
        let itself = this;
        let value = null;
        CCClass.Attr.setClassAttr(itself, "propValue", "visible", true);
        switch (type) {
            case EnumPropName.Non: {
                CCClass.Attr.setClassAttr(itself, "propValue", "visible", false);
                return;
            }
            case EnumPropName.Active: {
                value = itself.getActive();
            } break;
            case EnumPropName.Position: {
                value = itself.getPosition();
            } break;
        }
        itself.propValue = value;
    }
    /** 设置默认属性 */
    private setDefaultPorp(type: EnumPropName) {
        let itself = this;
        if (itself._isFromCtrl) {
            return;//不是编辑器改变
        }
        let defaultData = itself.getDefaultData();
        if (defaultData[type] == void 0) {
            return;//没有改变这个属性   
        }
        switch (type) {
            case EnumPropName.Non: {
                return;
            }
            case EnumPropName.Active: {
                defaultData[EnumPropName.Active] = itself.node.active;
            } break;
            case EnumPropName.Position: {
                defaultData[EnumPropName.Position] = itself.node.position;
            } break;
        }
    }

    /** 显示隐藏 */
    private getActive() {
        let itself = this;
        let value = itself.getPropValue(EnumPropName.Active) as boolean;
        if (value == void 0) {
            value = itself.node.active;
            let defaultData = itself.getDefaultData();
            defaultData[EnumPropName.Active] = value;
        }
        return value;
    }
    /** 获取位置 */
    private getPosition() {
        let itself = this;
        let value = itself.getPropValue(EnumPropName.Position) as Vec3;
        if (value == void 0) {
            value = itself.node.position;
            let defaultData = itself.getDefaultData();
            defaultData[EnumPropName.Position] = value;
        }
        return value;
    }
    /** 父节点改变，转换已经缓存的位置 */
    private transPosition() {
        let itself = this;

    }
}

