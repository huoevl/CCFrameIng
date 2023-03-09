/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_UserExpBar extends fgui.GProgressBar {

	public ctrl_show:fgui.Controller;

	public static URL:string = "ui://0463csswonu526";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_UserExpBar";

	public static createInstance():UI_UserExpBar {
		return <UI_UserExpBar>(fgui.UIPackage.createObject("base","UserExpBar"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_show = self.getController("ctrl_show");
		super.onConstruct();
	}
}