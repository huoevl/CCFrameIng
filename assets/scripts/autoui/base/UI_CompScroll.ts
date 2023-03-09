/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_CompScroll extends fgui.GComponent {

	public img:fgui.GLoader;

	public static URL:string = "ui://0463csswt6ay3w";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompScroll";

	public static createInstance():UI_CompScroll {
		return <UI_CompScroll>(fgui.UIPackage.createObject("base","CompScroll"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img = <fgui.GLoader>(self.getChild("img"));
		super.onConstruct();
	}
}