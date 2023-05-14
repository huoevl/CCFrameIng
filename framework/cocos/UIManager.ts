// import { Component, Node } from "cc";
// <reference types="../@types/cc" />

import { Component } from "cc";
import { ccf } from "../base/CCF";
import { LayerType } from "../base/Const";
import { SingleClass } from "../base/SingleClass";



declare global {
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
    private _cache: { [uiName: string]: Component };
    /** 界面名称对应的类 */
    private _uiNameToClass: { [uiName: string]: Component } = {};
    /** 重置/初始化 */
    init(root: Node) {
        let itself = this;
        itself.root = root;
        itself.reset();
    }
    /** 重置 */
    reset() {
        let itself = this;
        if (itself._cache) {
            for (let key in itself._cache) {
                itself.close(itself._cache[key])
            }
        }
        itself._cache = {};
    }

    register(clazz: Component) {
        let itself = this;
        if (!clazz) {
            return ccf.Logger.error("")
        }
        let uiName = clazz.NAME || ccf.Obj.getClassName(clazz);
        if (!uiName) {
            return ccf.Logger.error("不存在类名：", clazz);
        }
        if (itself._uiNameToClass[uiName]) {
            return ccf.Logger.error("界面已注册：", uiName);
        }
        itself._uiNameToClass[uiName] = clazz;
    }

    /**
     * 打开界面
     * @param uiName 界面名
     * @param dataOrCb 界面数据、回调，无序
     */
    open(uiName: string, ...dataOrCb: any[]) {
        let itself = this;
        let clazz = itself._uiNameToClass[uiName];
        if (!clazz) {
            return ccf.Logger.error("未注册的界面：", uiName);
        }
        let callBack: Function;
        let uiData: any;
        if (dataOrCb && dataOrCb.length) {
            for (let index = 0, len = dataOrCb.length; index < len; index++) {
                let temp = dataOrCb[index];
                if (typeof temp == "function") {
                    callBack = temp;
                } else {
                    uiData = temp;
                }
            }
        }
        ccf.ResMgr.loadPrefab(clazz.URL, (prefab) => {
            itself._open(uiName, uiData);
            if (callBack) {
                callBack();
            }
        })
    }
    private _open(uiName: string, uiData: any) {
        let itself = this;
        //todo
        if (itself._cache[uiName]) {
        }
    }

    /**
     * 关闭界面
     * @param uiComp 界面名称
     * @param force 是否强制
     */
    close(uiComp: Component, force?: boolean) {
        //todo
    }
    /**
     * 获取顶层的界面
     * @param layer 层级类型
     */
    getTopUI(layer: LayerType) {

    }
    /**
     * 是否顶层
     * @param layer 层级类型
     * @param uiName 界面名 
     */
    isOnTop(layer: LayerType, uiName: number) {

    }
}
