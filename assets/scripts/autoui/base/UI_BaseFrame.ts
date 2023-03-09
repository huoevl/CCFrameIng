/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_BaseFrame extends fgui.GComponent {

	public title:fgui.GTextField;
	public $btn_close:fgui.GButton;

	public static URL:string = "ui://0463csswi2jck52x";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_BaseFrame";

	public static createInstance():UI_BaseFrame {
		return <UI_BaseFrame>(fgui.UIPackage.createObject("base","BaseFrame"));
	}

	protected onConstruct(): void {
		let self = this;
		self.title = <fgui.GTextField>(self.getChild("title"));
		self.$btn_close = <fgui.GButton>(self.getChild("$btn_close"));
		super.onConstruct();
	}
}