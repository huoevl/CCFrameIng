import { Component, Label, Sprite } from "cc";

export class Login extends Component {
    public static NAME = Login;
    public label_01: Label;
    public img_testUrl: Sprite;
    public img_animation: Sprite;

    onLoad() {
        let itself = this;

        itself.label_01 = itself.node.getChildByName("label_01").getComponent(Label);
        itself.img_testUrl = itself.node.getChildByName("img_testUrl").getComponent(Sprite);
        itself.img_animation = itself.node.getChildByName("img_animation").getComponent(Sprite);
    }
}