/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_UserDiyHeadIconMask extends fgui.GComponent {

	public img_headdiy:fgui.GLoader;

	public static URL:string = "ui://0463csswi80qmk54u";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_UserDiyHeadIconMask";

	public static createInstance():UI_UserDiyHeadIconMask {
		return <UI_UserDiyHeadIconMask>(fgui.UIPackage.createObject("base","UserDiyHeadIconMask"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_headdiy = <fgui.GLoader>(self.getChild("img_headdiy"));
		super.onConstruct();
	}
}