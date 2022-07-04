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
    @property
    private _ctrlsMap: { [name: string]: StateCtrl } = {};
    @property
    private _selCtrl: StateCtrl = null;
    @property(EnumCtrlName)
    private _ctrlName: string = null;
    @property(EnumStateName)
    private _selState: number = null;
    @property
    private _root: Node = null;
    @property({ type: EnumPropName })
    private _propSel: EnumPropName = null;
    @property
    private _propValue: any = null;

    /** 状态数据
     * {
     *      ctrlName:{
     *          [lastPage] : stateIndex
     *          [default]:{}
     *          stateIndex : {
     *              [lastProp]:EnumPropName 
     *              EnumPropName.act : true,//active
     *              1 : v3,//postion
     *          },
     *          stateName1:{},
     *      }
     * }
     * 
     */
    @property
    _ctrlData: TCtrl = {};

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
        itself._selCtrl = itself._ctrlsMap[value];
        itself._selCtrl.addSelector(itself);
        itself._ctrlData[value] = itself._ctrlData[value] || {};
        itself.updateCtrlPage(itself._selCtrl);
        itself.refPage();
    }

    /** 控制器状态 */
    @property({ type: EnumStateName, tooltip: "需要改变属性的状态" })
    get ctrlState() {
        return this._selState;
    }
    set ctrlState(value: number) {
        let itself = this;
        if (itself._selCtrl == void 0) {
            return;
        }
        itself._selState = value;
        let pageData = itself.getPageData();
        pageData[value] = pageData[value] || {};
        pageData.$$lastState$$ = value;
        itself.refProp();
    }
    /** 属性列表 */
    @property({ type: EnumPropName, tooltip: "属性选择列表" })
    get propKey() {
        return this._propSel;
    }
    set propKey(value: EnumPropName) {
        let itself = this;
        if (itself.ctrlState == void 0) {
            return;
        }
        itself._propSel = value;
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
    /** 刷新上次选中页 */
    private refPage() {
        let itself = this;
        let pageData = itself.getPageData();
        let lastState = pageData.$$lastState$$;
        if (lastState) {
            itself.ctrlState = lastState;
        } else {
            itself.ctrlState = 0;
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
        itself.updateCtrlPage(itself._selCtrl);
        if (!itself.ctrlName) {
            let keys = Object.keys(itself._ctrlsMap);
            if (keys.length) {
                itself.ctrlName = keys[0];
            } else {
                itself.setPropValue(EnumPropName.Non)
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
        console.log("父节点改变", oldParent.name, this.node.parent.name);
    }
    /** 节点active改变 */
    private _activeChanged(node: Node) {
        console.log("激活状态改变", node.name)
        let itself = this;
        // itself.propValue = itself.node.active;
    }
    private _positionChanged(pos: Vec3) {
        console.log("位置改变：", pos);
        let itself = this;
        // itself.propValue = itself.node.position;
    }

    //=============一些界面的显示==============
    /** 更新控制器 */
    updateCtrlName(node: Node) {
        let itself = this;
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
    }



    //==============更具控制器更新的状态================
    /** 更新状态 */
    updateState(ctrl: StateCtrl) {
        let itself = this;
        let propData = itself.getPropData(ctrl.selectedIndex, ctrl.ctrlName);
        for (let key in propData) {
            itself.updateUI(Number(key), propData[key])
        }
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
        return itself._ctrlData[ctrlName];
    }
    /** 获取某个状态的属性数据 */
    private getPropData(state?: number, ctrlName?: string) {
        let itself = this;
        let pageData = itself.getPageData(ctrlName);
        state = state == void 0 ? itself.ctrlState : state;
        return pageData[state];
    }
    /** 获取缓存的属性值 */
    private getPropValue(type: EnumPropName) {
        let itself = this;
        let propData = itself.getPropData();
        let value = propData[type];
        return value;
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

    }

    /** 显示隐藏 */
    private getActive() {
        let itself = this;
        let value = itself.getPropValue(EnumPropName.Active) as boolean;
        if (value == void 0) {
            value = itself.node.active;
            let pageData = itself._ctrlData[itself.ctrlName];
            let propData = pageData.$$default$$ = pageData.$$default$$ || {} as TProp;
            propData[EnumPropName.Active] = value;
        }
        // value = value != void 0 ? value : itself.node.active
        return value;
    }
    /** 获取位置 */
    private getPosition() {
        let itself = this;
        let value = itself.getPropValue(EnumPropName.Position) as Vec3;
        value = value != void 0 ? value : itself.node.position;
        return value;
    }
}

