import { CCBoolean, CCClass, CCInteger, CCString, Color, Component, Enum, Node, Vec2, Vec3, _decorator } from 'cc';
import { StateCtrl } from './StateCtrl';
import { EnumCtrlName, EnumPropName, EnumStateName } from './StateEnum';
const { ccclass, property, executeInEditMode } = _decorator;
Enum(EnumCtrlName);
Enum(EnumStateName);
Enum(EnumPropName);

/** 属性类型 */
const ConstProp = {
    [EnumPropName.Active]: CCBoolean,
    [EnumPropName.Position]: Vec3,
    [EnumPropName.Rotation]: Vec3,
    [EnumPropName.Scale]: Vec3,
    [EnumPropName.Anchor]: Vec2,
    [EnumPropName.Size]: Vec2,
    [EnumPropName.Color]: Color,
    [EnumPropName.Opacity]: CCInteger,
    [EnumPropName.Lable]: CCString,
}

/** 属性类型 */
type TPropValue = number | boolean | Vec3 | Vec2 | Color | string;
type TProp = {
    __lastProp__?: number;
    [key: number]: TPropValue,
}
type TPage = {
    /** 上次选择的状态 */
    __lastState__?: number,
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
     *          [__lastPage__]:stateIndex
     *          stateIndex:{
     *              [__lastProp__]:EnumPropName 
     *              EnumPropName:true,//active
     *              1:v3,//postion
     *          },
     *          stateName1:{},
     *      }
     * }
     * 
     */
    @property
    private _ctrlData: TCtrl = {};

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
        itself._selCtrl = itself._ctrlsMap[itself.ctrlName];
        itself._selCtrl.addSelector(itself);
        itself._ctrlData[itself.ctrlName] = itself._ctrlData[itself.ctrlName] || {} as TPage;
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
        let pageData = itself._ctrlData[itself.ctrlName] as TPage;
        pageData[value] = pageData[value] || {} as TProp;
        pageData.__lastState__ = value;
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
        let pageData = itself._ctrlData[itself.ctrlName];
        let propData = pageData[itself.ctrlState];
        propData.__lastProp__ = value;
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
        let pageData = itself._ctrlData[itself.ctrlName];
        let propData = pageData[itself.ctrlState];
        propData[itself.propKey] = value;
    }
    /** 刷新上次选中页 */
    private refPage() {
        let itself = this;
        let pageData = itself._ctrlData[itself.ctrlName] as TPage;
        let lastState = pageData.__lastState__;
        if (lastState) {
            itself.ctrlState = lastState;
        } else {
            itself.ctrlState = 0;
        }
    }
    /** 刷新上次选中属性 */
    private refProp() {
        let itself = this;
        let pageData = itself._ctrlData[itself.ctrlName] as TPage;
        let propData = pageData[itself.ctrlState];
        let lastProp = propData.__lastProp__;
        if (lastProp) {
            itself.propKey = lastProp;
        } else {
            itself.propKey = 0;
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
            }
        }
    }
    onDestroy() {
        let itself = this;
        for (let key in itself._ctrlsMap) {
            itself._ctrlsMap[key].removeSelector(itself);
        }
    }

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
        if (ctrls) {
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

    /** 更新状态 */
    updateState(ctrl: StateCtrl) {
        let itself = this;
        let pageData = itself._ctrlData[ctrl.ctrlName];
        let propData = pageData[ctrl.selectedIndex];
        console.log("更新状态22222222222")
        for (let key in propData) {
            itself.setPropValue(Number(key), true)
        }
    }




    //=============一些计算方式=================

    getValue(type: EnumPropName) {
        let itself = this;
        let pageData = itself._ctrlData[itself.ctrlName];
        let propData = pageData[itself.ctrlState];
        let value = propData[type];
        return value;
    }

    /** 设置属性值 */
    setPropValue(type: EnumPropName, isUpdataUI?: boolean) {
        let itself = this;
        console.log("选择的属性：", type);
        let value = null;
        switch (type) {
            case EnumPropName.Active: {
                value = itself.getActive(isUpdataUI);
            } break;
            case EnumPropName.Position: {
                value = itself.getPosition(isUpdataUI);
            } break;
        }
        itself.propValue = value;
    }

    /** 显示隐藏 */
    getActive(isSet: boolean) {
        let itself = this;
        let value = itself.getValue(EnumPropName.Active) as boolean;
        value = value != void 0 ? value : itself.node.active
        if (isSet) {
            itself.node.active = value;
        }
        return value;
    }
    /** 显示隐藏 */
    getPosition(isSet?: boolean) {
        let itself = this;
        let value = itself.getValue(EnumPropName.Position) as Vec3;
        value = value != void 0 ? value : itself.node.position;
        if (isSet) {
            itself.node.position = value;
        }
        return value;
    }
}

