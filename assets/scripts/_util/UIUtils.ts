import { Component, Node } from "cc";

export class UIUtils {
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
}