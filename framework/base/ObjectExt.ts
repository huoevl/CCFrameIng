import { SingleClass } from "./SingleClass";

declare global {
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
    static getClassName(insOrClass: any) {
        let name = "";
        if (!insOrClass) {
            return name;
        }
        if (typeof insOrClass == "function") {
            name = insOrClass.prototype?.constructor?.name;
        } else {
            name = insOrClass.__proto__?.constructor?.name;
        }
        return name;
    }
    test() {

    }
}