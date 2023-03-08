/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeBuyLife extends fgui.GComponent {

	public com_frame:fgui.GComponent;
	public label_msg:fgui.GRichTextField;
	public btn_cancel:fgui.GButton;
	public btn_ok:fgui.GButton;

	public static URL:string = "ui://xtdgeoapr7ab1h";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeBuyLife";

	public static createInstance():UI_GameThreeBuyLife {
		return <UI_GameThreeBuyLife>(fgui.UIPackage.createObject("gameThree","GameThreeBuyLife"));
	}

	protected onConstruct(): void {
		let self = this;
		self.com_frame = <fgui.GComponent>(self.getChild("com_frame"));
		self.label_msg = <fgui.GRichTextField>(self.getChild("label_msg"));
		self.btn_cancel = <fgui.GButton>(self.getChild("btn_cancel"));
		self.btn_ok = <fgui.GButton>(self.getChild("btn_ok"));
		super.onConstruct();
	}
}