import { CCF } from 'base/CCF';
import { AssetManager, assetManager, Component, instantiate, Prefab, _decorator } from 'cc';
import { UIUtils } from './base/utils/UIUtils';
const { ccclass, property } = _decorator;
@ccclass('GameApp')
export class GameApp extends Component {
    onLoad() {
        CCF.getIns(this.node);
        assetManager.loadBundle("res", (err, bound: AssetManager.Bundle) => {
            if (err) {
                console.log("load bundle erro: ", err);
                return;
            }
            UIUtils.bundle = bound;
            bound.load("login/Login", Prefab, (err, data) => {
                var uiView = instantiate(data);
                this.node.addChild(uiView);
                // uiView.addComponent(UILogin); 

            })
        });
    }
}

