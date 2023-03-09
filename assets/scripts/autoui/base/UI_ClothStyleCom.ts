/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_ClothStyleCom extends fgui.GComponent {

	public ctrl_main:fgui.Controller;
	public img_icon:fgui.GLoader;
	public img_main:fgui.GImage;
	public img_qual:fgui.GLoader;

	public static URL:string = "ui://0463csswknc3l";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_ClothStyleCom";

	public static createInstance():UI_ClothStyleCom {
		return <UI_ClothStyleCom>(fgui.UIPackage.createObject("base","ClothStyleCom"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_main = self.getController("ctrl_main");
		self.img_icon = <fgui.GLoader>(self.getChild("img_icon"));
		self.img_main = <fgui.GImage>(self.getChild("img_main"));
		self.img_qual = <fgui.GLoader>(self.getChild("img_qual"));
		super.onConstruct();
	}
}