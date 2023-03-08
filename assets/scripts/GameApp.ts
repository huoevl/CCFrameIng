import { AssetManager, assetManager, Component, instantiate, Prefab, _decorator } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('GameApp')
export class GameApp extends Component {
    onLoad() {
        assetManager.loadBundle("prefab", (err, data: AssetManager.Bundle) => {
            if (err) {
                console.log("load bundle erro: ", err);
                return;
            }

            let bound = assetManager.getBundle("prefab");
            if (!bound) {
                console.error("没有bound")
                return
            }
            // bound.load("login/Login", Prefab, (err, data) => {
            //     var uiView = instantiate(data);
            //     this.node.addChild(uiView);

            //     // uiView.addComponent(UILogin);
            // })
        });


    }
}

