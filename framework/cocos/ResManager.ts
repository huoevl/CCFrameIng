

//资源管理

import { Component } from "cc";
import { ccf } from "./CCF";


declare global {
    interface IModuleMap {
        resMgr: ResManager;
    }
}
export class ResManager {

}
export function register(clazz: Component) {
    // let uiName = 
}
/** 界面名称对应的类 */
export let uiNameToClass: { [uiName: string]: Component } = {};

