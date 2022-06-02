import { Component, Label } from "cc";

export class Login extends Component {
    public static NAME = "Login";
    public label_xxx: Label;

    constructor() {
        super();
        let itself = this;
        itself.label_xxx = itself.node.getChildByName("label_xxx").getComponent(Label);
    }
}