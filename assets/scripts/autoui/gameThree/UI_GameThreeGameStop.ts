/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeGameStop extends fgui.GComponent {

	public img_user:fgui.GLoader;
	public label_tips:fgui.GTextField;
	public t1:fgui.Transition;

	public static URL:string = "ui://xtdgeoapwn3i20";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeGameStop";

	public static createInstance():UI_GameThreeGameStop {
		return <UI_GameThreeGameStop>(fgui.UIPackage.createObject("gameThree","GameThreeGameStop"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_user = <fgui.GLoader>(self.getChild("img_user"));
		self.label_tips = <fgui.GTextField>(self.getChild("label_tips"));
		self.t1 = self.getTransition("t1");
		super.onConstruct();
	}
}