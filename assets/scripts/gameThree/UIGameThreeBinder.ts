
import { gameThreeBinder } from "../autoui/gameThree/gameThreeBinder";

import * as fgui from "fairygui-cc";
import { UIGameThreeHome } from "./view/UIGameThreeHome";

export class UIGameThreeBinder extends gameThreeBinder {
    setPkgExt(clazz: any) {
        if (!clazz) {
            console.error("扩展类为空");
            return;
        }
        if (!clazz.CLS_NAME) {
            console.error("不存在CLS_NAME:" + clazz);
            return;
        }
        fgui.UIObjectFactory.setExtension(clazz["URL"], clazz as any);
    }
    bindExt() {
        let itself = this;
        itself.setPkgExt(UIGameThreeHome);
    }
}