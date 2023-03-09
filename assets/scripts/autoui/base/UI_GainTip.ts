/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GainTip extends fgui.GComponent {

	public img_item:fgui.GLoader;
	public label_item:fgui.GTextField;

	public static URL:string = "ui://0463csswjn17v";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_GainTip";

	public static createInstance():UI_GainTip {
		return <UI_GainTip>(fgui.UIPackage.createObject("base","GainTip"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_item = <fgui.GLoader>(self.getChild("img_item"));
		self.label_item = <fgui.GTextField>(self.getChild("label_item"));
		super.onConstruct();
	}
}