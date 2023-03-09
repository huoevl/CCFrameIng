/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_AntiqueImg extends fgui.GLabel {

	public ctrl_mc:fgui.Controller;
	public mc_antique:fgui.GLoader;

	public static URL:string = "ui://0463csswmj325o";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_AntiqueImg";

	public static createInstance():UI_AntiqueImg {
		return <UI_AntiqueImg>(fgui.UIPackage.createObject("base","AntiqueImg"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_mc = self.getController("ctrl_mc");
		self.mc_antique = <fgui.GLoader>(self.getChild("mc_antique"));
		super.onConstruct();
	}
}