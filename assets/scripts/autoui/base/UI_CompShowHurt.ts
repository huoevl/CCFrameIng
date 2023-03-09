/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_CompShowHurt extends fgui.GComponent {

	public label_hurt:fgui.GTextField;
	public t0:fgui.Transition;

	public static URL:string = "ui://0463csswmmq9h";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompShowHurt";

	public static createInstance():UI_CompShowHurt {
		return <UI_CompShowHurt>(fgui.UIPackage.createObject("base","CompShowHurt"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label_hurt = <fgui.GTextField>(self.getChild("label_hurt"));
		self.t0 = self.getTransition("t0");
		super.onConstruct();
	}
}