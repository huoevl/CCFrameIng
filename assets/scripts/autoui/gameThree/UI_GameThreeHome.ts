/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeHome extends fgui.GComponent {

	public label_date:fgui.GTextField;
	public btn_award:fgui.GButton;
	public btn_help2:fgui.GButton;
	public btn_help:fgui.GButton;
	public list_test:fgui.GList;

	public static URL:string = "ui://xtdgeoapeisi0";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeHome";

	public static createInstance():UI_GameThreeHome {
		return <UI_GameThreeHome>(fgui.UIPackage.createObject("gameThree","GameThreeHome"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label_date = <fgui.GTextField>(self.getChild("label_date"));
		self.btn_award = <fgui.GButton>(self.getChild("btn_award"));
		self.btn_help2 = <fgui.GButton>(self.getChild("btn_help2"));
		self.btn_help = <fgui.GButton>(self.getChild("btn_help"));
		self.list_test = <fgui.GList>(self.getChild("list_test"));
		super.onConstruct();
	}
}