/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_ChatRedNum extends fgui.GComponent {

	public label_num:fgui.GTextField;

	public static URL:string = "ui://0463csswetey53";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_ChatRedNum";

	public static createInstance():UI_ChatRedNum {
		return <UI_ChatRedNum>(fgui.UIPackage.createObject("base","ChatRedNum"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label_num = <fgui.GTextField>(self.getChild("label_num"));
		super.onConstruct();
	}
}