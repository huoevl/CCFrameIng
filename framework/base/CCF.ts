import { Component } from "cc";
import { ResManager } from "../cocos/ResManager";
import { UIManager } from "../cocos/UIManager";
import { UITool } from "../cocos/UITool";
import { ResUtil } from "../utils/ResUtil";
import { LogExt } from "./LogExt";
import { MathExt } from "./MathExt";
import { ObjectExt } from "./ObjectExt";
import { SingleClass } from "./SingleClass";



export class CCF extends SingleClass {
    init(root: Component) {
        ccf.Obj = ObjectExt;
        ccf.Math = MathExt;
        ccf.Logger = LogExt;
        ccf.ResUtil = ResUtil;
        ccf.UITool = UITool;
        ccf.ResMgr = ResManager.getIns();
        ccf.UIMgr = UIManager.getIns<UIManager>(root);
    }
}
export let ccf: IModuleMap = {} as any;