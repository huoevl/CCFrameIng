/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeAwardItem extends fgui.GComponent {

	public ctrl_state:fgui.Controller;
	public label_txt:fgui.GTextField;
	public img_item:fgui.GLoader;
	public label_item:fgui.GTextField;

	public static URL:string = "ui://xtdgeoapvwyis";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeAwardItem";

	public static createInstance():UI_GameThreeAwardItem {
		return <UI_GameThreeAwardItem>(fgui.UIPackage.createObject("gameThree","GameThreeAwardItem"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_state = self.getController("ctrl_state");
		self.label_txt = <fgui.GTextField>(self.getChild("label_txt"));
		self.img_item = <fgui.GLoader>(self.getChild("img_item"));
		self.label_item = <fgui.GTextField>(self.getChild("label_item"));
		super.onConstruct();
	}
}