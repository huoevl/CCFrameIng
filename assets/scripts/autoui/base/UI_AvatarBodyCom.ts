/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_AvatarBodyCom extends fgui.GComponent {

	public ctrl_hideShadow:fgui.Controller;
	public img_shadow:fgui.GImage;
	public test:fgui.GLoader;

	public static URL:string = "ui://0463csswm1q4k53f";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_AvatarBodyCom";

	public static createInstance():UI_AvatarBodyCom {
		return <UI_AvatarBodyCom>(fgui.UIPackage.createObject("base","AvatarBodyCom"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_hideShadow = self.getController("ctrl_hideShadow");
		self.img_shadow = <fgui.GImage>(self.getChild("img_shadow"));
		self.test = <fgui.GLoader>(self.getChild("test"));
		super.onConstruct();
	}
}