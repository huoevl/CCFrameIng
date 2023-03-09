/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_AntiqueAdd extends fgui.GLabel {

	public label_add:fgui.GTextField;

	public static URL:string = "ui://0463csswmjc9mk565";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_AntiqueAdd";

	public static createInstance():UI_AntiqueAdd {
		return <UI_AntiqueAdd>(fgui.UIPackage.createObject("base","AntiqueAdd"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label_add = <fgui.GTextField>(self.getChild("label_add"));
		super.onConstruct();
	}
}