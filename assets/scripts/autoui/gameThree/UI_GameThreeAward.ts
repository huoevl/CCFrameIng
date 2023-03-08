/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeAward extends fgui.GComponent {

	public com_frame:fgui.GComponent;
	public list_award:fgui.GList;

	public static URL:string = "ui://xtdgeoapvwyir";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeAward";

	public static createInstance():UI_GameThreeAward {
		return <UI_GameThreeAward>(fgui.UIPackage.createObject("gameThree","GameThreeAward"));
	}

	protected onConstruct(): void {
		let self = this;
		self.com_frame = <fgui.GComponent>(self.getChild("com_frame"));
		self.list_award = <fgui.GList>(self.getChild("list_award"));
		super.onConstruct();
	}
}