/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_CompResTip extends fgui.GComponent {

	public label_tips:fgui.GTextField;

	public static URL:string = "ui://0463csswt1n0mk551";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompResTip";

	public static createInstance():UI_CompResTip {
		return <UI_CompResTip>(fgui.UIPackage.createObject("base","CompResTip"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label_tips = <fgui.GTextField>(self.getChild("label_tips"));
		super.onConstruct();
	}
}