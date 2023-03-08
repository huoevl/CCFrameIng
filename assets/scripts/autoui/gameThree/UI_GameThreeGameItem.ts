/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeGameItem extends fgui.GButton {

	public ctrl_state:fgui.Controller;
	public ctrl_item:fgui.Controller;
	public comp_item:fgui.GComponent;
	public label_itemNum:fgui.GTextField;
	public btn_use:fgui.GGraph;

	public static URL:string = "ui://xtdgeoapgm4ln";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeGameItem";

	public static createInstance():UI_GameThreeGameItem {
		return <UI_GameThreeGameItem>(fgui.UIPackage.createObject("gameThree","GameThreeGameItem"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_state = self.getController("ctrl_state");
		self.ctrl_item = self.getController("ctrl_item");
		self.comp_item = <fgui.GComponent>(self.getChild("comp_item"));
		self.label_itemNum = <fgui.GTextField>(self.getChild("label_itemNum"));
		self.btn_use = <fgui.GGraph>(self.getChild("btn_use"));
		super.onConstruct();
	}
}