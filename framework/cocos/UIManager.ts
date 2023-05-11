import { Component, Node } from "cc";

declare global {
    interface IModuleMap {
        uiMgr: UIManager;
    }
}
export const enum LayerType {
    /** 互斥 */
    MutEx,
    /** 全屏 */
    Full,
    /** 弹窗 */
    Dialog,
    /** 提示 */
    Tips,
}
export class UIManager {
    /** root节点 */
    root: Node;
    /** 排序 */
    sortId: number;
    /** 界面缓存 */
    cache: { [uiName: string]: Component };
    constructor(root: Node) {
        let itself = this;
        itself.root = root;
        itself.reset();
    }
    /** 重置/初始化 */
    reset() {
        let itself = this;
        if (itself.cache) {
            for (let key in itself.cache) {
                itself.close(itself.cache[key])
            }
        }
        itself.cache = {};
    }

    /**
     * 打开界面
     * @param uiComp 界面名
     * @param uiData 界面数据
     */
    private open(uiComp: Component, uiData?: any) {

    }

    /**
     * 关闭界面
     * @param uiComp 界面名称
     * @param force 是否强制
     */
    close(uiComp: Component, force?: boolean) {

    }
}

/**
 * 打开界面
 * @param uiName 
 * @param uiData 
 * @param callBack 
 */
export function open(uiName: string, uiData?: any, callBack?: Function) {

}
