/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_CompAdoHeadMask extends fgui.GComponent {

	public img_head:fgui.GLoader;

	public static URL:string = "ui://0463csswrb25k538";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompAdoHeadMask";

	public static createInstance():UI_CompAdoHeadMask {
		return <UI_CompAdoHeadMask>(fgui.UIPackage.createObject("base","CompAdoHeadMask"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_head = <fgui.GLoader>(self.getChild("img_head"));
		super.onConstruct();
	}
}