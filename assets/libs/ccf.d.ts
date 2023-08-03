declare module "base/SingleClass" {
    export class SingleClass {
        private static instance;
        static getIns<T extends SingleClass>(data?: any): T;
        protected constructor(data?: any);
        /** 初始化 */
        protected init(data?: any): void;
    }
}
declare module "cocos/ResManager" {
    import { Asset, AssetManager, Prefab } from "cc";
    import { SingleClass } from "base/SingleClass";
    global {
        interface IModuleMap {
            ResMgr?: ResManager;
        }
    }
    export class ResManager extends SingleClass {
        /** 包体 */
        private _bundle;
        init(): void;
        /**
         * 加载包
         * @param url
         */
        loadBundle(url: string, onComplete?: (data: AssetManager.Bundle) => void): void;
        /**
         * 获取包
         * @param name
         * @returns
         */
        getBundle(name: string): AssetManager.Bundle;
        /**
         * 获取包名
         * @param url
         * @returns
         */
        getBundleName(url: string): string;
        /**
         * 加载远程资源
         * @param url
         * @param onComplete
         */
        loadRemote<T extends Asset>(url: string, onComplete: (asset: T) => void): void;
        /**
         * 加载预制体
         * @param url 相对路径
         */
        loadPrefab(url: string, onComplete: (prefab: Prefab) => void): void;
    }
}
declare module "base/Const" {
    /** 层级类型 */
    export const enum LayerType {
        /** 互斥 */
        MutEx = 0,
        /** 全屏 */
        Full = 1,
        /** 弹窗 */
        Dialog = 2,
        /** 提示 */
        Tips = 3
    }
}
declare module "cocos/UIManager" {
    import { Component } from "cc";
    import { LayerType } from "base/Const";
    import { SingleClass } from "base/SingleClass";
    global {
        interface IModuleMap {
            UIMgr?: UIManager;
        }
    }
    export class UIManager extends SingleClass {
        /** root节点 */
        root: Node;
        /** 排序 */
        sortId: number;
        /** 界面缓存 */
        private _cache;
        /** 界面名称对应的类 */
        private _uiNameToClass;
        /** 重置/初始化 */
        init(root: Node): void;
        /** 重置 */
        reset(): void;
        register(clazz: Component): void;
        /**
         * 打开界面
         * @param uiName 界面名
         * @param dataOrCb 界面数据、回调，无序
         */
        open(uiName: string, ...dataOrCb: any[]): void;
        private _open;
        /**
         * 关闭界面
         * @param uiComp 界面名称
         * @param force 是否强制
         */
        close(uiComp: Component, force?: boolean): void;
        /**
         * 获取顶层的界面
         * @param layer 层级类型
         */
        getTopUI(layer: LayerType): void;
        /**
         * 是否顶层
         * @param layer 层级类型
         * @param uiName 界面名
         */
        isOnTop(layer: LayerType, uiName: number): void;
    }
}
declare module "cocos/UITool" {
    import { Component } from "cc";
    global {
        interface IModuleMap {
            UITool: typeof UITool;
        }
    }
    export class UITool {
        /** 界面组件绑定 */
        static bindNode(comp: Component): void;
    }
}
declare module "utils/ResUtil" {
    global {
        interface IModuleMap {
            ResUtil: typeof ResUtil;
        }
    }
    export class ResUtil {
    }
}
declare module "base/LogExt" {
    import { SingleClass } from "base/SingleClass";
    global {
        interface IModuleMap {
            Logger: typeof LogExt;
        }
    }
    export class LogExt extends SingleClass {
        isOpen: boolean;
        init(isOpen: boolean): void;
        static log(...data: any[]): void;
        static warn(...data: any[]): void;
        static error(...data: any[]): void;
    }
}
declare module "base/MathExt" {
    global {
        interface IModuleMap {
            Math: typeof MathExt;
        }
    }
    export class MathExt {
        /** 两点获取角度 */
        static getAngle(x0: number, y0: number, x1: number, y1: number): number;
        /** 两点获取弧度 */
        static getRadian(x0: number, y0: number, x1: number, y1: number): number;
        /** 两点获取距离 */
        static getDistance(x0: number, y0: number, x1: number, y1: number): number;
        /**
         * 通过线段、角度、计算分解的xy
         * 坐标系中，y向下或向上为正，计算所得都一样
         * @param line 边
         * @param angle 角度
         * @param isRadian 是否弧度
         */
        static getXYByLine(line: number, angle: number, isRadian?: boolean): {
            x: number;
            y: number;
        };
        /** 角度转弧度 */
        static angleToRadian(angle: number): number;
        /** 弧度转角度 */
        static radianToAngle(radian: number): number;
    }
}
declare module "base/ObjectExt" {
    import { SingleClass } from "base/SingleClass";
    global {
        interface IModuleMap {
            Obj: typeof ObjectExt;
        }
    }
    /** 对象类 */
    export class ObjectExt extends SingleClass {
        /**
         * 获取组件名
         * @param insOrClass 实例/类
         */
        static getClassName(insOrClass: any): string;
        test(): void;
    }
}
declare module "base/CCF" {
    import { Component } from "cc";
    import { SingleClass } from "base/SingleClass";
    export class CCF extends SingleClass {
        init(root: Component): void;
    }
    export let ccf: IModuleMap;
}
declare module "base/DateExt" {
    import { SingleClass } from "base/SingleClass";
    global {
        interface IModuleMap {
            Date: typeof DataExt;
        }
    }
    export class DataExt extends SingleClass {
    }
}
declare namespace CCF {
    class Thents {
        /** 是否停止 */
        private isStop;
        /** 执行顺序数据 */
        private execList;
        /** 是否正在执行 */
        private isExec;
        /** 链式核心continuation 函数 */
        private cont;
        /** 函数结尾 */
        private fin;
        /** 异步流程控制库 cb里的参数不能是函数，否则不能停止*/
        constructor();
        /** cb回调 当它执行说明进行下一链 any数组也仅执行一次*/
        private continuation;
        /** 函数 顺序执行 */
        add(fn?: (cb: Function) => any): this;
        /** 将 array 中的值应用于 iterator 函数（同步或异步），并行执行 */
        each(arr?: any[], iterator?: (cb: Function, value?: any, index?: number, array?: any[]) => any): this;
        /** 将 array 中的值应用于 iterator 函数（同步或异步），并行执行，最大并行数量为 limit */
        eachLimit(arr?: any[], iterator?: (cb: Function, value?: any, index?: number, array?: any[]) => any, limit?: number): this;
        /** 将 array 中的值应用于 iterator 函数（同步或异步），串行执行 */
        eachSeries(arr?: any[], iterator?: (cb: Function, value?: any, index?: number, array?: any[]) => any): this;
        /** 函数数组（同步或异步），并行执行 */
        parallel(tasks?: ((cb: Function) => any)[]): this;
        /** 函数数组（同步或异步），并行执行，最大并行数量为 limit 不传或者0为不限制 */
        parallelLimit(tasks?: ((cb: Function) => any)[], limit?: number): this;
        /** 函数数组（同步或异步），串行执行 */
        parallelSeries(tasks?: ((cb: Function) => any)[]): this;
        /** 无论上一链是否存在 error，均进入 fn 执行 */
        finally(fn?: (cb?: Function, err?: any) => any): this;
        /** 用于捕捉 error */
        private onError;
        /** 数组error */
        private onErrorArr;
        /** 用户自定义cb reson */
        private onOver;
        private addToList;
        /** 开始执行顺序流 */
        start(): void;
        /** 停止执行 */
        stop(fn?: Function, reson?: any): void;
        /** 遍历执行 */
        private forList;
        private arrToFunction;
        private parallelExec;
        private parallelLimitExec;
        private parallelSeriesExec;
        FinExec(err?: any): void;
        /** 同步执行函数 */
        private carry;
        /** 异步执行函数 同时捕捉异常 */
        private defer;
        /** 异步执行函数 */
        private nextTick;
        /**
         * 将 `arguments` 转成数组，效率比 `[].slice.call` 高很多
         * https://github.com/teambition/then.js/blob/master/then.js
         */
        private slice;
    }
}
declare module "cc" {
    interface Component {
        /** 相对路径 */
        URL: string;
        /** 包名/文件夹名/模块名 */
        PKG: string;
        /** 类名 */
        NAME: string;
    }
}
declare module "cocos/StateEnum" {
    /** 状态名 */
    export enum EnumStateName {
    }
    /** 更新选择器的类型 */
    export enum EnumUpdataType {
        /** 名字 */
        name = 0,
        /** 可选状态 */
        selPage = 1,
        /** 状态 */
        state = 2,
        /** 删除控制器 */
        delete = 3,
        /** 初始化 */
        init = 4,
        /** 更新选中的属性 */
        prop = 5
    }
    /** 控制器名字 */
    export enum EnumCtrlName {
    }
    /** 属性名 */
    export enum EnumPropName {
        /** 不选择 */
        Non = 0,
        /** 显示隐藏 */
        Active = 1,
        /** 位置 */
        Position = 2,
        /** 文本 */
        Label = 3,
        /** 描边 */
        LabelOutline = 4,
        /** 图片 */
        SpriteFrame = 5,
        /** 旋转、欧拉角 */
        Euler = 6,
        /** 缩放 */
        Scale = 7,
        /** 锚点 */
        Anchor = 8,
        /** 宽高 */
        Size = 9,
        /** 颜色 */
        Color = 10,
        /** 透明度 */
        Opacity = 11,
        /** 灰度 */
        GrayScale = 12,
        /** 字体 */
        Font = 13
    }
}
declare module "cocos/StateSelect" {
    /**
     * 这个类主要目的是为了存以下结构数据：状态对应的属性
     *
     *      _ctrlData数据存储结构
     *
     *      ctrlId:{
     *          //$$lastState$$ : state1
     *          $$default$$:{
     *              $$changedProp$$:[]
     *              $$lastProp$$:EnumPropName.active
     *              EnumPropName.active : true,//active
     *              1 : v3,//postion,
     *              .....
     *          }
     *          stateUUId0 : {
     *              $$changedProp$$:[]
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
    import { Color, Component, Font, Node, Quat, Size, SpriteFrame, Vec2, Vec3 } from 'cc';
    import { StateController } from "cocos/StateController";
    import { EnumPropName } from "cocos/StateEnum";
    /** 属性类型 */
    type TPropValue = number | boolean | string | Vec3 | Vec2 | Color | Size | Quat | SpriteFrame | Font;
    export class StateSelect extends Component {
        /** root节点所有的ctrl */
        private _ctrlsMap;
        /** 当前选中的ctrl名称对应的ctrlId */
        private _currCtrlId;
        private _root;
        /** 当前状态要改变的属性 */
        private _propKey;
        /** 当前状态要改变的属性值 */
        private _propValue;
        private _isDeleteCurr;
        /** 状态数据 */
        private _ctrlData;
        /** 是否重新获取 */
        get isReload(): boolean;
        private set isReload(value);
        get ctrlState(): number;
        private set ctrlState(value);
        /** 控制器所在节点 */
        get root(): Node;
        /** 控制器名称 */
        get currCtrlId(): number;
        private set currCtrlId(value);
        /** 属性列表 */
        get propKey(): EnumPropName;
        private set propKey(value);
        /** 属性值 */
        get propValue(): any;
        private set propValue(value);
        /** 是否删除当前属性 */
        get isDeleteCurr(): boolean;
        private set isDeleteCurr(value);
        /** 已经改变的属性 */
        changedProp: string[];
        /** 刷新上次选中属性 */
        private refProp;
        _isPreload: boolean;
        protected __preload(): void;
        protected onLoad(): void;
        /** 父节点改变 */
        private _parentChanged;
        /** 节点active改变 */
        private _activeChanged;
        /** 节点改变位置、旋转或缩放事件。如果具体需要判断是哪一个事件，可通过判断回调的第一个参数类型是 [[Node.TransformBit]] 中的哪一个来获取 */
        private _positionChanged;
        /** 节点大小改变 */
        private _sizeChanged;
        /** 锚点改变 */
        private _anchorChanged;
        /** 颜色改变 */
        private _colorChanged;
        /** 图片改变 */
        private _spriteChanged;
        /** 更新控制器 */
        updateCtrlName(node: Node): void;
        /** 获取所有的Ctrl */
        private getCtrls;
        /** 更新状态数量 */
        updateCtrlPage(ctrl: StateController, deleteIndex?: number): void;
        /** 控制器被删除 */
        updateDelete(ctrl: StateController): void;
        /** 已经改变的属性 */
        updateChangedProp(): void;
        updatePreLoad(ctrl: StateController): void;
        updateProp(ctrl: StateController): void;
        private _isFromCtrl;
        /** 更新状态 */
        updateState(ctrl: StateController): void;
        updateUI(type: EnumPropName, value: TPropValue): void;
        private getCurrCtrl;
        /**
         * 其他状态是否有存在这个属性
         * @param ctrl
         * @param prop
         */
        private isOtherHans;
        /** 获取某个控制器的状态数据 */
        private getPageData;
        /** 获取某个状态的属性数据 */
        private getPropData;
        /** 获取缓存的属性值 */
        private getPropValue;
        /** 获取默认属性 */
        private getDefaultData;
        /** 还原编辑器属性值 */
        private setPropValue;
        private handleValue;
        /** 编辑器改变、改变对于状态属性（最开始是说改变默认属性） */
        private setDefaultPorp;
        /** 显示隐藏 */
        private getActive;
        /** 获取位置 */
        private getPosition;
        /** 旋转、欧拉角 */
        private getEuler;
        /** 缩放 */
        private getScale;
        /** 锚点 */
        private getAnchor;
        /** 宽高 */
        private getSize;
        /** 颜色 */
        private getColor;
        /** 透明度 */
        private getOpacity;
        /** 灰度 */
        private getGrayScale;
        /** 文本 */
        private getLabel;
        /** 字体 */
        private getFont;
        /** 文本描边 */
        private getLabelOutline;
        /** 图片 */
        private getSpriteFrame;
        /** 父节点改变，转换已经缓存的位置 */
        private transPosition;
    }
}
declare module "cocos/StateController" {
    /**
     * 开发中遇到的一些问题：
     * 1、节点没激活，不会执行：__preload()等生命周期函数
     * 2、一个对象里有“_”开头的key，不会被序列化
     * 3、@executeInEditMode(true)代码修改，回到界面组件会先被销毁然后重新添加
     * 4、属性里对象的赋值，是克隆对象里的值，并不是改变指向的地址
     * 5、关闭编辑后再打开，uuid会改变
     * 6、编辑器删除节点，parent改变的监听也会收到，注意处理
     * 7、使用setTimeout的地方都是为了延迟执行
     *
     *
     * 控制器已知问题：
     * 1、改变文本只能在propvalue那里设置。从自带的string那里改变没有监听方法,
     * 2、改变：透明度（UIOpacity）、变灰、描边颜色、字体 ===》同个问题。
     *
     * 3、改变四元数也有问题，只做了改变欧拉角。
     * 4、不能使用ctrl+z（撤销），否则一些数据会没掉,
     * 5、好像删除不可逆
     */
    import { Component } from 'cc';
    import { EnumStateName } from "cocos/StateEnum";
    export class StateValue {
        name: string;
        stateId: number;
        constructor(name: string, stateId: number);
    }
    export class StateController extends Component {
        private stateIdAuto;
        /** 控制器唯一id，如果使用uuid每次打开编辑器就会变 */
        _ctrlId: number;
        /** 选中的状态下标 */
        private _selectedIndex;
        /** 状态名字列表 */
        private _pageNames;
        /** 上一次选中的下标 */
        private _previousIndex;
        /** 控制器名字 */
        private _ctrlName;
        /** 是否正在改变 */
        changing?: boolean;
        /** 是否初始 ,假设编辑器默认状态是2，代码里面正好第一次状态也是2，会导致selecteindex那里不刷新状态。 */
        isInit: boolean;
        protected __preload(): void;
        protected onLoad(): void;
        protected onDestroy(): void;
        get ctrlName(): string;
        set ctrlName(value: string);
        /** 选择的状态下标 */
        get selectedIndex(): EnumStateName;
        set selectedIndex(value: EnumStateName);
        get states(): StateValue[];
        private set states(value);
        /** 上一次的选中下标 */
        get previsousIndex(): number;
        /** 选择的状态名字 */
        get selectedPage(): string;
        set selectedPage(val: string);
        /** 更新状态 */
        private updateState;
    }
}
declare module "fgui/PkgMgr" {
    export class PkgMgr {
    }
}
