declare global {
    interface IModuleMap {
        ccf: CCF;
    }
}
export class CCF {
    /**
     * 获取组件名
     * @param instanceOrClass 实例/类
     */
    getCompName(instanceOrClass: any) {
        let name = "";
        if (!instanceOrClass) {
            return name;
        }
        if (typeof instanceOrClass == "function") {
            name = instanceOrClass.prototype?.constructor?.name;
        } else {
            name = instanceOrClass.__proto__?.constructor?.name;
        }
        return name;
    }
}

export let ccf: IModuleMap = {} as any;