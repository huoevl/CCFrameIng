/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_Comp_Idtt extends fgui.GComponent {

	public img_di:fgui.GLoader;
	public label_lv:fgui.GTextField;
	public label_idtt:fgui.GTextField;

	public static URL:string = "ui://0463csswl7yek58h";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_Comp_Idtt";

	public static createInstance():UI_Comp_Idtt {
		return <UI_Comp_Idtt>(fgui.UIPackage.createObject("base","Comp_Idtt"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_di = <fgui.GLoader>(self.getChild("img_di"));
		self.label_lv = <fgui.GTextField>(self.getChild("label_lv"));
		self.label_idtt = <fgui.GTextField>(self.getChild("label_idtt"));
		super.onConstruct();
	}
}