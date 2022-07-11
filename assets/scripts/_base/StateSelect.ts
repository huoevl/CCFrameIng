/**     _ctrlData数据存储结构
 * 
 *      ctrlId:{
 *          $$changedProp$$:[]
 *          $$lastState$$ : state1
 *          $$default$$:{
 *             EnumPropName.active : true,//active
 *              1 : v3,//postion, 
 *              .....
 *          }
 *          stateUUId0 : {
 *              $$lastProp$$:EnumPropName.active
 *              EnumPropName.active : true,//active
 *              .....
 *          },
 *          stateUUId1:{
 *              $$lastProp$$:EnumPropName.pos
 *              1 : v3,//postion,
 *              .....
 *          }
 *          stateName1:{},
 *      }
 * 
 */

import { CCClass, CCString, Color, Component, Enum, Label, Node, Quat, Size, Sprite, SpriteFrame, UIOpacity, UITransform, Vec2, Vec3, _decorator, __private } from 'cc';
import { EDITOR } from 'cc/env';
import { StateCtrl } from './StateCtrl';
import { ConstPropName, EnumCtrlName, EnumPropName, EnumStateName } from './StateEnum';
const { ccclass, property, executeInEditMode } = _decorator;
type TransformBit = __private._cocos_core_scene_graph_node_enum__TransformBit
Enum(EnumCtrlName);
Enum(EnumStateName);
Enum(EnumPropName);

/** 属性类型 */
type TPropValue = number | boolean | string | Vec3 | Vec2 | Color | Size | Quat | SpriteFrame;
type TProp = {
    /** 上一次选择的属性 */
    $$lastProp$$?: number;
    [key: number]: TPropValue,
}
type TPage = {
    /** 已经改变的属性 */
    $$changedProp$$?: { [name: string]: EnumPropName };
    /** 上次选择的状态 */
    $$lastState$$?: number,
    /** 默认状态属性 */
    $$default$$?: TProp;
    [state: number]: TProp
}
type TCtrl = {
    [stateId: string]: TPage;
}
@ccclass('StateSelect')
@executeInEditMode(true)
export class StateSelect extends Component {
    /** root节点所有的ctrl */
    @property
    private _ctrlsMap: { [ctrlId: string]: StateCtrl } = {};
    /** selectId */
    @property({ visible: false })
    _selectId = Date.now();
    /** 当前中的ctrl */
    @property
    private _currCtrl: StateCtrl = null;
    /** 当前选中的ctrl名称对应的ctrlId */
    @property(EnumCtrlName)
    private _currCtrlId: number = null;
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
    @property
    private _isDeleteCurr: boolean = false;

    /** 状态数据 */
    @property
    private _ctrlData: TCtrl = {};

    /** 是否重新获取 */
    @property({ tooltip: "是否重新获取ctrl" })
    get isReload() {
        return false;
    }
    private set isReload(value: boolean) {
        let itself = this;
        if (EDITOR && value) {
            itself.__preload();
        }
    }

    @property({ type: EnumStateName, tooltip: "控制器所在节点，仅提示用" })
    get ctrlState() {
        let itself = this;
        return itself._currCtrl?.selectedIndex;
    }
    private set ctrlState(value: number) {
        let itself = this;
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
    @property({ type: EnumCtrlName, displayName: "ctrlName", tooltip: "选择的控制器" })
    get currCtrlId() {
        return this._currCtrlId;
    }
    private set currCtrlId(value: number) {
        if (!EDITOR) {
            return;
        }
        let itself = this;
        itself._currCtrlId = value;
        if (!value) {
            itself.currState = null;
            itself._currCtrl = null;
            return;
        }
        itself._currCtrl = itself._ctrlsMap[value];
        itself._currCtrl.addSelector(itself);
        itself.updateCtrlPage(itself._currCtrl);
        itself.refPage();

    }
    /** 控制器状态 */
    @property({ type: EnumStateName, tooltip: "需要改变属性的状态" })
    get currState() {
        return this._currState;
    }
    private set currState(value: number) {
        if (!EDITOR) {
            return;
        }
        let itself = this;
        if (itself.currCtrlId == void 0) {
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
    private set propKey(value: EnumPropName) {
        if (!EDITOR) {
            return;
        }
        let itself = this;
        if (itself.currState == void 0) {
            itself._propKey = EnumPropName.Non;
            return;
        }
        itself._propKey = value;
        let propData = itself.getPropData();
        let pageData = itself.getPageData();
        propData.$$lastProp$$ = value;
        let flag = itself.setPropValue(value)
        if (flag && value != EnumPropName.Non) {
            pageData.$$changedProp$$ = pageData.$$changedProp$$ || {};
            pageData.$$changedProp$$[ConstPropName[value]] = value;
            itself.updateChangedProp();
        }
    }
    /** 属性值 */
    @property({ tooltip: "当前状态属性值" })
    get propValue() {
        return this._propValue;
    }
    private set propValue(value: any) {
        if (!EDITOR) {
            return;
        }
        let itself = this;
        itself._propValue = value;
        let propData = itself.getPropData();
        propData[itself.propKey] = value;
        if (itself.isImmediately) {
            itself.updateState(itself._currCtrl);
        }
    }
    /** 是否立即刷新 */
    @property({ tooltip: "是否立即刷新编辑器界面" })
    get isImmediately() {
        return this._isImmediately;
    }
    private set isImmediately(value: boolean) {
        let itself = this;
        if (!EDITOR) {
            return;
        }
        if (!itself.currCtrlId) {
            return;
        }
        itself._isImmediately = value;
        if (value) {
            itself.updateState(itself._currCtrl);
        }
    }
    /** 是否删除当前属性 */
    @property({ tooltip: "是否删除当前属性" })
    get isDeleteCurr() {
        return this._isDeleteCurr;
    }
    private set isDeleteCurr(value: boolean) {
        let itself = this;
        if (!EDITOR) {
            return;
        }
        if (!itself.currCtrlId) {
            return;
        }
        if (itself.propKey == EnumPropName.Non) {
            return;
        }
        //删除属性
        let pageData = itself.getPageData();
        let $$changedProp$$ = pageData.$$changedProp$$ || {};
        let name = ConstPropName[itself.propKey];
        let key = $$changedProp$$[name];
        delete $$changedProp$$[name];
        for (let state in pageData) {
            let propData = pageData[state];
            delete propData[key];
        }
        itself.propKey = EnumPropName.Non;
        itself.updateChangedProp();
    }

    /** 已经改变的属性 */
    @property({ type: CCString, readonly: true, tooltip: "已经改变的属性" })
    changedProp: string[] = [];

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
        if (!EDITOR) {
            return;
        }
        let itself = this;
        itself.updateCtrlName(itself.node.parent);
        itself.updateCtrlPage(itself._currCtrl);
        if (!itself.currCtrlId) {
            let ctrlIdKeys = Object.keys(itself._ctrlsMap);
            if (ctrlIdKeys.length) {
                itself.currCtrlId = Number(ctrlIdKeys[0]);
            } else {
                console.error("没有添加控制器")
                itself._onPreDestroy();
            }
        } else {
            itself.refProp();
            itself.updateChangedProp();
        }
    }
    onLoad() {
        let itself = this;
        if (!EDITOR) {
            return;
        }
        itself.node.on(Node.EventType.PARENT_CHANGED, itself._parentChanged, itself);
        itself.node.on(Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, itself._activeChanged, itself);
        itself.node.on(Node.EventType.TRANSFORM_CHANGED, itself._positionChanged, itself);
        itself.node.on(Node.EventType.SIZE_CHANGED, itself._sizeChanged, itself);
        itself.node.on(Node.EventType.ANCHOR_CHANGED, itself._anchorChanged, itself);
        itself.node.on(Node.EventType.COLOR_CHANGED, itself._colorChanged, itself);
        itself.node.on(Sprite.EventType.SPRITE_FRAME_CHANGED, itself._spriteChanged, itself)
    }
    onDestroy() {
        let itself = this;
        for (let ctrlId in itself._ctrlsMap) {
            itself._ctrlsMap[ctrlId].removeSelector(itself);
        }

    }
    //==============一些监听、设置默认属性=================
    /** 父节点改变 */
    private _parentChanged(oldParent: Node) {
        let itself = this;
        itself.transPosition(oldParent);
    }
    /** 节点active改变 */
    private _activeChanged(node: Node) {
        let itself = this;
        itself.setDefaultPorp(EnumPropName.Active);
    }
    /** 节点改变位置、旋转或缩放事件。如果具体需要判断是哪一个事件，可通过判断回调的第一个参数类型是 [[Node.TransformBit]] 中的哪一个来获取 */
    private _positionChanged(type: TransformBit) {
        let itself = this;
        if (type == Node.TransformBit.POSITION) {
            itself.setDefaultPorp(EnumPropName.Position);
        } else if (type == Node.TransformBit.ROTATION) {
            // itself.setDefaultPorp(EnumPropName.Rotation);
            itself.setDefaultPorp(EnumPropName.Euler);
        } else if (type == Node.TransformBit.SCALE) {
            itself.setDefaultPorp(EnumPropName.Scale);
        }
    }
    /** 节点大小改变 */
    private _sizeChanged(size: Size) {
        let itself = this;
        itself.setDefaultPorp(EnumPropName.Size);
    }
    /** 锚点改变 */
    private _anchorChanged(anchor: Vec2) {
        let itself = this;
        itself.setDefaultPorp(EnumPropName.Anchor);
    }
    /** 颜色改变 */
    private _colorChanged(color: Color) {
        let itself = this;
        itself.setDefaultPorp(EnumPropName.Color);
    }
    /** 图片改变 */
    private _spriteChanged(sprite: Sprite) {
        let itself = this;
        itself.setDefaultPorp(EnumPropName.SpriteFrame);
    }

    //=============一些界面的显示==============
    /** 更新控制器 */
    updateCtrlName(node: Node) {
        let itself = this;
        let ctrls = itself.getCtrls(node);
        itself._ctrlsMap = {};
        let arr = ctrls.map((val, i) => {
            itself._ctrlsMap[val._ctrlId] = val;
            return { name: val.ctrlName, value: val._ctrlId }
        })
        CCClass.Attr.setClassAttr(itself, "currCtrlId", "enumList", arr);
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
    updateCtrlPage(ctrl: StateCtrl, deleteIndex?: number) {
        let itself = this;
        if (!ctrl) {
            return;
        }
        if (deleteIndex != -1) {
            //被删的index，更新数据,一次只能删一个
            let pageData = itself.getPageData();
            for (let state = deleteIndex; state <= ctrl.states.length - 1; state++) {
                let next = pageData[state + 1];
                if (next) {
                    pageData[state] = next;
                }
            }
            let deleteState = pageData[ctrl.states.length];
            delete pageData[ctrl.states.length]
            setTimeout(() => {
                if (itself.currState >= deleteIndex) {
                    itself.currState = itself.currState - 1;
                }
                for (let prop in deleteState) {//这里要删除改变的属性
                    let allNot = true;
                    for (let index = 0, len = ctrl.states.length; index < len; index++) {
                        if (pageData[index][prop] != void 0) {
                            allNot = false;
                            break;
                        }
                    }
                    if (allNot) {
                        let name = ConstPropName[prop];
                        delete pageData.$$changedProp$$[name];
                        delete pageData.$$default$$[prop];
                        itself.updateChangedProp();
                    }
                }
            })
        }
        let arr = ctrl.states.map((val, i) => {
            return { name: val.name, value: i }
        })
        CCClass.Attr.setClassAttr(itself, "ctrlState", "enumList", arr);
        CCClass.Attr.setClassAttr(itself, "currState", "enumList", arr);
    }
    /** 控制器被删除 */
    updateDelete(ctrl: StateCtrl) {
        let itself = this;
        delete itself._ctrlData[ctrl._ctrlId];
        if (itself.currCtrlId == ctrl._ctrlId) {
            itself._onPreDestroy();
        }
    }
    /** 已经改变的属性 */
    updateChangedProp() {
        let itself = this;
        let pageData = itself.getPageData();
        let arr = [];
        for (let name in pageData.$$changedProp$$) {
            arr.push(name);
        }
        itself.changedProp = arr;
    }

    //==============更具控制器更新的状态 主要代码================
    private _isFromCtrl: boolean = false;
    /** 更新状态 */
    updateState(ctrl: StateCtrl) {
        let itself = this;
        if (!ctrl) {
            return;
        }
        itself._isFromCtrl = true;
        let propData = itself.getPropData(ctrl.selectedIndex, ctrl._ctrlId);
        let defaultData = itself.getDefaultData(ctrl._ctrlId);
        for (let key in defaultData) {
            let value = propData[key] == void 0 ? defaultData[key] : propData[key];
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
            case EnumPropName.Lable: {
                let label = itself.node.getComponent(Label);
                if (label) {
                    label.string = value as string;
                }
            } break;
            case EnumPropName.SpriteFrame: {
                let sprite = itself.node.getComponent(Sprite);
                if (sprite) {
                    sprite.spriteFrame = value as SpriteFrame;
                }
            } break;
            // case EnumPropName.Rotation: {
            //     itself.node.rotation = value as Quat;
            // } break;
            case EnumPropName.Euler: {
                itself.node.eulerAngles = value as Vec3;
            } break;
            case EnumPropName.Scale: {
                itself.node.scale = value as Vec3;
            } break;
            case EnumPropName.Anchor: {
                let trans = itself.node.getComponent(UITransform);
                if (trans) {
                    trans.anchorPoint = value as Vec2;
                }
            } break;
            case EnumPropName.Size: {
                let trans = itself.node.getComponent(UITransform);
                if (trans) {
                    trans.contentSize = value as Size;
                }
            } break;
            case EnumPropName.Color: {
                let sprite_label = itself.node.getComponent(Sprite) || itself.node.getComponent(Label);
                if (sprite_label) {
                    sprite_label.color = value as Color;
                }
            } break;
            case EnumPropName.Opacity: {
                let opacity = itself.node.getComponent(UIOpacity);
                if (opacity) {
                    opacity.opacity = value as number;
                }
            } break;
        }
    }
    //=============一些计算方式，仅储存值使用=================

    /** 获取某个控制器的状态数据 */
    private getPageData(ctrlId?: number) {
        let itself = this;
        ctrlId = ctrlId == void 0 ? itself.currCtrlId : ctrlId;
        if (itself._ctrlData[ctrlId] == void 0) {
            itself._ctrlData[ctrlId] = {};
        }
        return itself._ctrlData[ctrlId];
    }
    /** 获取某个状态的属性数据 */
    private getPropData(state?: number, ctrlId?: number) {
        let itself = this;
        let pageData = itself.getPageData(ctrlId);
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
    private getDefaultData(ctrlId?: number) {
        let itself = this;
        let pageData = itself.getPageData(ctrlId);
        if (pageData.$$default$$ == void 0) {
            pageData.$$default$$ = {};
        }
        return pageData.$$default$$;
    }

    /** 还原编辑器属性值 */
    private setPropValue(type: EnumPropName) {
        let itself = this;
        let value = itself.handleValue(type);
        if (value == void 0) {
            CCClass.Attr.setClassAttr(itself, "propValue", "visible", false);
            return void 0;
        }
        CCClass.Attr.setClassAttr(itself, "propValue", "visible", true);
        itself.propValue = value;
        return true;
    }
    //解析并返回属性值
    private handleValue(type: EnumPropName) {
        let itself = this;
        let value: TPropValue;
        switch (type) {
            case EnumPropName.Non: {
                value = void 0;
            } break;
            case EnumPropName.Active: {
                value = itself.getActive();
            } break;
            case EnumPropName.Position: {
                value = itself.getPosition();
            } break;
            // case EnumPropName.Rotation: {
            //     value = itself.getRotation();
            // } break;
            case EnumPropName.Euler: {
                value = itself.getEuler();
            } break;
            case EnumPropName.Scale: {
                value = itself.getScale();
            } break;
            case EnumPropName.Anchor: {
                value = itself.getAnchor();
            } break;
            case EnumPropName.Size: {
                value = itself.getSize();
            } break;
            case EnumPropName.Color: {
                value = itself.getColor();
            } break;
            case EnumPropName.Opacity: {
                value = itself.getOpacity();
            } break;
            case EnumPropName.Lable: {
                value = itself.getLable();
            } break;
            case EnumPropName.SpriteFrame: {
                value = itself.getSpriteFrame();
            } break;
        }
        return value;
    }
    /** 编辑器改变、改变对于状态属性（最开始是说改变默认属性） */
    private setDefaultPorp(type: EnumPropName) {
        let itself = this;
        if (!EDITOR) {
            return;
        }
        if (itself._isFromCtrl) {
            return;//不是编辑器改变
        }
        // let defaultData = itself.getDefaultData();
        let defaultData = itself.getPropData();
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
                Vec3.copy(defaultData[EnumPropName.Position] as Vec3, itself.node.position);
            } break;
            case EnumPropName.Lable: {
                let label = itself.node.getComponent(Label);
                if (!label) {
                    return;
                }
                defaultData[EnumPropName.Lable] = label.string;
            } break;
            case EnumPropName.SpriteFrame: {
                let sprite = itself.node.getComponent(Sprite);
                if (!sprite) {
                    return;
                }
                defaultData[EnumPropName.SpriteFrame] = sprite.spriteFrame;
            } break;
            // case EnumPropName.Rotation: {
            //     Vec3.copy(defaultData[EnumPropName.Rotation] as Quat, itself.node.rotation);
            // } break;
            case EnumPropName.Euler: {
                Vec3.copy(defaultData[EnumPropName.Euler] as Vec3, itself.node.eulerAngles);
            } break;
            case EnumPropName.Scale: {
                Vec3.copy(defaultData[EnumPropName.Scale] as Vec3, itself.node.scale);
            } break;
            case EnumPropName.Anchor: {
                let trans = itself.node.getComponent(UITransform);
                if (!trans) {
                    return;
                }
                Vec2.copy(defaultData[EnumPropName.Anchor] as Vec2, trans.anchorPoint);
            } break;
            case EnumPropName.Size: {
                let trans = itself.node.getComponent(UITransform);
                if (!trans) {
                    return;
                }
                (defaultData[EnumPropName.Size] as Size).set(trans.contentSize);
            } break;
            case EnumPropName.Color: {
                let sprite_label = itself.node.getComponent(Sprite) || itself.node.getComponent(Label);
                if (!sprite_label) {
                    return;
                }
                (defaultData[EnumPropName.Color] as Color).set(sprite_label.color);
            } break;
            case EnumPropName.Opacity: {
                let opacity = itself.node.getComponent(UIOpacity);
                if (!opacity) {
                    return;
                }
                defaultData[EnumPropName.Opacity] = opacity.opacity;
            } break;
        }
        if (type == itself.propKey) {
            let propData = itself.getPropData();
            itself._propValue = propData[itself.propKey];
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
            value = itself.node.getPosition();
            let defaultData = itself.getDefaultData();
            defaultData[EnumPropName.Position] = itself.node.getPosition();
        }
        return value;
    }
    // /** 旋转、四元数 */
    // private getRotation() {
    //     let itself = this;
    //     let value = itself.getPropValue(EnumPropName.Rotation) as Quat;
    //     if (value == void 0) {
    //         value = itself.node.getRotation();
    //         let defaultData = itself.getDefaultData();
    //         defaultData[EnumPropName.Rotation] = itself.node.getRotation();
    //     }
    //     return value;
    // }
    /** 旋转、欧拉角 */
    private getEuler() {
        let itself = this;
        let value = itself.getPropValue(EnumPropName.Euler) as Vec3;
        if (value == void 0) {
            value = Vec3.copy(new Vec3(), itself.node.eulerAngles);
            let defaultData = itself.getDefaultData();
            defaultData[EnumPropName.Euler] = Vec3.copy(new Vec3(), itself.node.eulerAngles);
        }
        return value;
    }
    /** 缩放 */
    private getScale() {
        let itself = this;
        let value = itself.getPropValue(EnumPropName.Scale) as Vec3;
        if (value == void 0) {
            value = itself.node.getScale();
            let defaultData = itself.getDefaultData();
            defaultData[EnumPropName.Scale] = itself.node.getScale();
        }
        return value;
    }
    /** 锚点 */
    private getAnchor() {
        let itself = this;
        let value = itself.getPropValue(EnumPropName.Anchor) as Vec2;
        if (value == void 0) {
            let trans = itself.node.getComponent(UITransform);
            if (!trans) {
                return void 0;
            }
            value = Vec2.copy(new Vec2(), trans.anchorPoint);
            let defaultData = itself.getDefaultData();
            defaultData[EnumPropName.Anchor] = Vec2.copy(new Vec2(), trans.anchorPoint);
        }
        return value;
    }
    /** 宽高 */
    private getSize() {
        let itself = this;
        let value = itself.getPropValue(EnumPropName.Size) as Size;
        if (value == void 0) {
            let trans = itself.node.getComponent(UITransform);
            if (!trans) {
                return void 0;
            }
            value = trans.contentSize.clone();
            let defaultData = itself.getDefaultData();
            defaultData[EnumPropName.Size] = trans.contentSize.clone();
        }
        return value;
    }
    /** 颜色 */
    private getColor() {
        let itself = this;
        let value = itself.getPropValue(EnumPropName.Color) as Color;
        if (value == void 0) {
            let sprite_label = itself.node.getComponent(Sprite) || itself.node.getComponent(Label);
            if (!sprite_label) {
                return void 0;
            }
            value = sprite_label.color.clone();
            let defaultData = itself.getDefaultData();
            defaultData[EnumPropName.Color] = sprite_label.color.clone();
        }
        return value;
    }
    /** 透明度 */
    private getOpacity() {
        let itself = this;
        let value = itself.getPropValue(EnumPropName.Opacity) as number;
        if (value == void 0) {
            let opacity = itself.node.getComponent(UIOpacity);
            if (!opacity) {
                return void 0;
            }
            value = opacity.opacity;
            let defaultData = itself.getDefaultData();
            defaultData[EnumPropName.Opacity] = value;
        }
        return value;
    }
    /** 文本 */
    private getLable() {
        let itself = this;
        let value = itself.getPropValue(EnumPropName.Lable) as string;
        if (value == void 0) {
            let label = itself.node.getComponent(Label);
            if (!label) {
                return void 0;
            }
            value = label.string;
            let defaultData = itself.getDefaultData();
            defaultData[EnumPropName.Lable] = value;
        }
        return value;
    }
    /** 图片 */
    private getSpriteFrame() {
        let itself = this;
        let value = itself.getPropValue(EnumPropName.SpriteFrame) as SpriteFrame;
        if (value == void 0) {
            let sprite = itself.node.getComponent(Sprite);
            if (!sprite) {
                return void 0;
            }
            value = sprite.spriteFrame;
            let defaultData = itself.getDefaultData();
            defaultData[EnumPropName.SpriteFrame] = value;
        }
        return value;
    }

    /** 父节点改变，转换已经缓存的位置 */
    private transPosition(oldParent: Node) {
        if (!EDITOR) {
            return;
        }
        let itself = this;
        let parent = itself.node.parent;
        let pageData = itself.getPageData();
        let transCurr = parent.getComponent(UITransform);
        if (!transCurr) {
            transCurr = parent.addComponent(UITransform);
            transCurr["__delete__"] = true;
        }
        let transOld = oldParent.getComponent(UITransform);
        if (!transOld) {
            transOld = oldParent.addComponent(UITransform);
            transOld["__delete__"] = true;
        }
        for (let state in pageData) {
            let propData = pageData[state];
            let pos = propData[EnumPropName.Position] as Vec3;
            if (pos) {
                transCurr.convertToNodeSpaceAR(transOld.convertToWorldSpaceAR(pos), pos);
            }
        }
        if (transCurr["__delete__"]) {
            transCurr._onPreDestroy();
        }
        if (transOld["__delete__"]) {
            transOld._onPreDestroy();
        }
    }
}

