import { AssetManager, Component, Node, view } from "cc";
import * as fgui from "fairygui-cc";
export class UIUtils {
    static bundle: AssetManager.Bundle;
    static uiMap: { [viewName: string]: fgui.GComponent } = {};
    /** 界面组件绑定 */
    static bindNode(comp: Component) {
        let compDefinde = comp["compDefinde"];
        let bind = function (parent: Node) {
            let children = parent.children;
            for (let index = 0, len = children.length; index < len; index++) {
                let child = children[index];
                let compType = compDefinde[child.name];
                if (compType) {
                    comp[child.name] = child.getComponent(compType);
                }
                bind(child);
            }
        }
        bind(comp.node);
    }

    static show(clazz: any) {
        let pkgName = "fgui/" + clazz["PKG"];
        fgui.UIPackage.loadPackage(pkgName, (err, pkg) => {
            if (!fgui.UIPackage.getByName(pkgName)) {
                fgui.UIPackage.addPackage(pkgName);
            }
            let view = clazz.createInstance();
            UIUtils.uiMap[clazz.CLS_NAME] = view;
            fgui.GRoot.inst.addChild(view);
        });
    }

    static close(clazz: fgui.GComponent) {
        let view = UIUtils.uiMap[clazz.constructor["CLS_NAME"]];
        view.dispose()
    }
}