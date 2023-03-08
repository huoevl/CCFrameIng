/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeBuyItem extends fgui.GComponent {

	public comp_item:fgui.GComponent;
	public label_name:fgui.GTextField;
	public label_num:fgui.GTextField;
	public label_desc:fgui.GTextField;
	public btn_buy:fgui.GButton;
	public img_dmd:fgui.GLoader;
	public label_cost:fgui.GTextField;

	public static URL:string = "ui://xtdgeoaplsv6x";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeBuyItem";

	public static createInstance():UI_GameThreeBuyItem {
		return <UI_GameThreeBuyItem>(fgui.UIPackage.createObject("gameThree","GameThreeBuyItem"));
	}

	protected onConstruct(): void {
		let self = this;
		self.comp_item = <fgui.GComponent>(self.getChild("comp_item"));
		self.label_name = <fgui.GTextField>(self.getChild("label_name"));
		self.label_num = <fgui.GTextField>(self.getChild("label_num"));
		self.label_desc = <fgui.GTextField>(self.getChild("label_desc"));
		self.btn_buy = <fgui.GButton>(self.getChild("btn_buy"));
		self.img_dmd = <fgui.GLoader>(self.getChild("img_dmd"));
		self.label_cost = <fgui.GTextField>(self.getChild("label_cost"));
		super.onConstruct();
	}
}