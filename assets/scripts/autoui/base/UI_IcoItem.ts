/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_IcoItem extends fgui.GComponent {

	public ctrl_type:fgui.Controller;
	public ctrl_effct:fgui.Controller;
	public img_none:fgui.GLoader;
	public img_qua:fgui.GLoader;
	public img_item:fgui.GLoader;
	public img_timeLimit:fgui.GImage;
	public label_count:fgui.GTextField;
	public label_cAndt:fgui.GTextField;
	public img_effect:fgui.GLoader;
	public img_effect1:fgui.GLoader;
	public img_effect2:fgui.GLoader;
	public img_draw:fgui.GLoader;

	public static URL:string = "ui://0463cssw80uj4";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_IcoItem";

	public static createInstance():UI_IcoItem {
		return <UI_IcoItem>(fgui.UIPackage.createObject("base","IcoItem"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_type = self.getController("ctrl_type");
		self.ctrl_effct = self.getController("ctrl_effct");
		self.img_none = <fgui.GLoader>(self.getChild("img_none"));
		self.img_qua = <fgui.GLoader>(self.getChild("img_qua"));
		self.img_item = <fgui.GLoader>(self.getChild("img_item"));
		self.img_timeLimit = <fgui.GImage>(self.getChild("img_timeLimit"));
		self.label_count = <fgui.GTextField>(self.getChild("label_count"));
		self.label_cAndt = <fgui.GTextField>(self.getChild("label_cAndt"));
		self.img_effect = <fgui.GLoader>(self.getChild("img_effect"));
		self.img_effect1 = <fgui.GLoader>(self.getChild("img_effect1"));
		self.img_effect2 = <fgui.GLoader>(self.getChild("img_effect2"));
		self.img_draw = <fgui.GLoader>(self.getChild("img_draw"));
		super.onConstruct();
	}
}