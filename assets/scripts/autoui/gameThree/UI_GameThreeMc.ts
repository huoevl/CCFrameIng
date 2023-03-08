/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeMc extends fgui.GComponent {

	public spt_xxx:fgui.GGraph;
	public img_mc:fgui.GLoader;

	public static URL:string = "ui://xtdgeoaphxrk1f";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeMc";

	public static createInstance():UI_GameThreeMc {
		return <UI_GameThreeMc>(fgui.UIPackage.createObject("gameThree","GameThreeMc"));
	}

	protected onConstruct(): void {
		let self = this;
		self.spt_xxx = <fgui.GGraph>(self.getChild("spt_xxx"));
		self.img_mc = <fgui.GLoader>(self.getChild("img_mc"));
		super.onConstruct();
	}
}