/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_CompVipDesc extends fgui.GComponent {

	public img_vip:fgui.GLoader;

	public static URL:string = "ui://0463csswgue4k533";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompVipDesc";

	public static createInstance():UI_CompVipDesc {
		return <UI_CompVipDesc>(fgui.UIPackage.createObject("base","CompVipDesc"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_vip = <fgui.GLoader>(self.getChild("img_vip"));
		super.onConstruct();
	}
}