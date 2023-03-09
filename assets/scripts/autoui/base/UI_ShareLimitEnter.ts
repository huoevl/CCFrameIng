/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_ShareLimitEnter extends fgui.GComponent {

	public mc_enter:fgui.GLoader;
	public t0:fgui.Transition;

	public static URL:string = "ui://0463csswg7c3mk54x";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_ShareLimitEnter";

	public static createInstance():UI_ShareLimitEnter {
		return <UI_ShareLimitEnter>(fgui.UIPackage.createObject("base","ShareLimitEnter"));
	}

	protected onConstruct(): void {
		let self = this;
		self.mc_enter = <fgui.GLoader>(self.getChild("mc_enter"));
		self.t0 = self.getTransition("t0");
		super.onConstruct();
	}
}