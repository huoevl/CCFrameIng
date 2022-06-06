import { _decorator } from 'cc';
import { Login } from '../../ui/login/Login';
const { ccclass, property } = _decorator;

export class UILogin extends Login {
    start() {
        let itself = this;
        console.log(itself.label_01.string);
        itself.label_01.string = "测试文本"
    }
}

