/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_CompRes extends fgui.GComponent {

	public ctrl_type:fgui.Controller;
	public img_di:fgui.GLoader;
	public img_res:fgui.GLoader;
	public label_num:fgui.GTextField;
	public btn_add:fgui.GButton;

	public static URL:string = "ui://0463csswsxnsb";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompRes";

	public static createInstance():UI_CompRes {
		return <UI_CompRes>(fgui.UIPackage.createObject("base","CompRes"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_type = self.getController("ctrl_type");
		self.img_di = <fgui.GLoader>(self.getChild("img_di"));
		self.img_res = <fgui.GLoader>(self.getChild("img_res"));
		self.label_num = <fgui.GTextField>(self.getChild("label_num"));
		self.btn_add = <fgui.GButton>(self.getChild("btn_add"));
		super.onConstruct();
	}
}