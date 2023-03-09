/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_CompMinisterBody extends fgui.GComponent {

	public img_shadow:fgui.GImage;
	public mc_bot1:fgui.GLoader;
	public img_body:fgui.GLoader;
	public mc_top1:fgui.GLoader;
	public mc_top2:fgui.GLoader;

	public static URL:string = "ui://0463csswth4yk53n";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompMinisterBody";

	public static createInstance():UI_CompMinisterBody {
		return <UI_CompMinisterBody>(fgui.UIPackage.createObject("base","CompMinisterBody"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_shadow = <fgui.GImage>(self.getChild("img_shadow"));
		self.mc_bot1 = <fgui.GLoader>(self.getChild("mc_bot1"));
		self.img_body = <fgui.GLoader>(self.getChild("img_body"));
		self.mc_top1 = <fgui.GLoader>(self.getChild("mc_top1"));
		self.mc_top2 = <fgui.GLoader>(self.getChild("mc_top2"));
		super.onConstruct();
	}
}