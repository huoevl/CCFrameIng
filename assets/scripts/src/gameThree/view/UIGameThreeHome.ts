import UI_GameThreeHome from "../../../autoui/gameThree/UI_GameThreeHome";
import { UIUtils } from "../../../base/utils/UIUtils";


export class UIGameThreeHome extends UI_GameThreeHome {
    onEnable() {
        //console   
        this.btn_help.onClick(() => {
            UIUtils.close(this);
        }, this)
    }
}