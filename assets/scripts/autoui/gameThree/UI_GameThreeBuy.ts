/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeBuy extends fgui.GComponent {

	public com_frame:fgui.GComponent;
	public list_items:fgui.GList;

	public static URL:string = "ui://xtdgeoaplsv6y";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeBuy";

	public static createInstance():UI_GameThreeBuy {
		return <UI_GameThreeBuy>(fgui.UIPackage.createObject("gameThree","GameThreeBuy"));
	}

	protected onConstruct(): void {
		let self = this;
		self.com_frame = <fgui.GComponent>(self.getChild("com_frame"));
		self.list_items = <fgui.GList>(self.getChild("list_items"));
		super.onConstruct();
	}
}