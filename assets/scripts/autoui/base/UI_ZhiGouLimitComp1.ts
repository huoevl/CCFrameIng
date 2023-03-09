/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_ZhiGouLimitComp1 extends fgui.GComponent {

	public img_di:fgui.GLoader;
	public img_title:fgui.GLoader;
	public label_time:fgui.GTextField;
	public btn_jump:fgui.GButton;

	public static URL:string = "ui://0463csswi0sqk58h";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_ZhiGouLimitComp1";

	public static createInstance():UI_ZhiGouLimitComp1 {
		return <UI_ZhiGouLimitComp1>(fgui.UIPackage.createObject("base","ZhiGouLimitComp1"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_di = <fgui.GLoader>(self.getChild("img_di"));
		self.img_title = <fgui.GLoader>(self.getChild("img_title"));
		self.label_time = <fgui.GTextField>(self.getChild("label_time"));
		self.btn_jump = <fgui.GButton>(self.getChild("btn_jump"));
		super.onConstruct();
	}
}