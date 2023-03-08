export class PkgMgr {
    /**
     * 设置扩展类
     * @param clazz ui类
     * @param jumpID 跳转id
     * @param bgArr 背景数组
     * @param bgFunc 动态获取背景
     */
    setPkgExt2(clazz: god.UI_CLS, jumpID?: string, bgArray?: string[], bgFunc?: (uiData: any) => string[]) {
        if (!clazz) {
            console.error("扩展类为空");
            return;
        }
        if (!clazz.CLS_NAME) {
            console.error("不存在CLS_NAME:" + clazz);
            return;
        }

        let inst: UIMgr = UIMgr.inst;
        let name: string = clazz.CLS_NAME;
        if (inst.layerClazzMap[name]) {
            console.error("name:%s,已经设置过对应的扩展类!请检查!name:" + clazz['name']);
            return;
        }

        fgui.UIObjectFactory.setExtension(clazz.URL, clazz as any);

        let pkg = inst.layerClazzMap[name] = { clazz } as PkgCls;
        let bgFullArr: string[] = pkg.bgArr = [];
        if (bgFunc) {
            pkg.getBgFunc = bgFunc;
        }
        else if (bgArray) {
            for (let bg of bgArray) {
                bgFullArr.push(bg);
            }
        }

        Jump.setJump(jumpID, clazz);
    }

    setPkgExt(clazz: typeof fgui.GComponent) {
        let name = god.getCompName(clazz);
        if (layerClazzMap[name]) {
            throw `name:${name},已经设置过对应的扩展类!请检查!`;
        }
        fgui.UIObjectFactory.setPackageItemExtension(clazz["URL"], clazz);
        layerClazzMap[name] = clazz;
    }
}