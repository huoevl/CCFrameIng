/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_UserDiyHeadIcon extends fgui.GComponent {

	public ctrl_diy:fgui.Controller;
	public img_head:fgui.GLoader;
	public img_headdiy:fgui.GLoader;

	public static URL:string = "ui://0463csswni5uk5fh";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_UserDiyHeadIcon";

	public static createInstance():UI_UserDiyHeadIcon {
		return <UI_UserDiyHeadIcon>(fgui.UIPackage.createObject("base","UserDiyHeadIcon"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_diy = self.getController("ctrl_diy");
		self.img_head = <fgui.GLoader>(self.getChild("img_head"));
		self.img_headdiy = <fgui.GLoader>(self.getChild("img_headdiy"));
		super.onConstruct();
	}
}