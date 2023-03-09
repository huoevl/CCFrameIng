/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_AvatarGardenRoleCom extends fgui.GComponent {

	public ctrl_hideShadow:fgui.Controller;
	public img_shadow:fgui.GLoader;
	public test:fgui.GLoader;

	public static URL:string = "ui://0463csswihp7mk566";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_AvatarGardenRoleCom";

	public static createInstance():UI_AvatarGardenRoleCom {
		return <UI_AvatarGardenRoleCom>(fgui.UIPackage.createObject("base","AvatarGardenRoleCom"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_hideShadow = self.getController("ctrl_hideShadow");
		self.img_shadow = <fgui.GLoader>(self.getChild("img_shadow"));
		self.test = <fgui.GLoader>(self.getChild("test"));
		super.onConstruct();
	}
}