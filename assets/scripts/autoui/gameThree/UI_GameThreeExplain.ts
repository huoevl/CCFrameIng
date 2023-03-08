/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeExplain extends fgui.GComponent {

	public ctrl_page:fgui.Controller;
	public img_bg:fgui.GLoader;
	public btn_next:fgui.GButton;
	public btn_restart:fgui.GButton;
	public btn_end:fgui.GButton;

	public static URL:string = "ui://xtdgeoaplsv619";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeExplain";

	public static createInstance():UI_GameThreeExplain {
		return <UI_GameThreeExplain>(fgui.UIPackage.createObject("gameThree","GameThreeExplain"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_page = self.getController("ctrl_page");
		self.img_bg = <fgui.GLoader>(self.getChild("img_bg"));
		self.btn_next = <fgui.GButton>(self.getChild("btn_next"));
		self.btn_restart = <fgui.GButton>(self.getChild("btn_restart"));
		self.btn_end = <fgui.GButton>(self.getChild("btn_end"));
		super.onConstruct();
	}
}