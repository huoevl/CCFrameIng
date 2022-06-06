import { Component, Sprite } from "cc";

export class UIIndex extends Component {
	public static NAME = UIIndex;
	public Sprite_test: Sprite;

	onLoad() {
		let itself = this;
		itself.Sprite_test = itself.node.getChildByName("Sprite_test").getComponent(Sprite);
	}
}