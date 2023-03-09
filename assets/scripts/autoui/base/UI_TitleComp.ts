/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_TitleComp extends fgui.GLabel {

	public ctrl_mc:fgui.Controller;
	public mc_title:fgui.GLoader;

	public static URL:string = "ui://0463csswkoc9mk561";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_TitleComp";

	public static createInstance():UI_TitleComp {
		return <UI_TitleComp>(fgui.UIPackage.createObject("base","TitleComp"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_mc = self.getController("ctrl_mc");
		self.mc_title = <fgui.GLoader>(self.getChild("mc_title"));
		super.onConstruct();
	}
}