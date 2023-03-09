/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_ZhiGouLimitComp extends fgui.GComponent {

	public img_pic:fgui.GLoader;
	public label_time:fgui.GTextField;

	public static URL:string = "ui://0463cssws9rjd";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_ZhiGouLimitComp";

	public static createInstance():UI_ZhiGouLimitComp {
		return <UI_ZhiGouLimitComp>(fgui.UIPackage.createObject("base","ZhiGouLimitComp"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_pic = <fgui.GLoader>(self.getChild("img_pic"));
		self.label_time = <fgui.GTextField>(self.getChild("label_time"));
		super.onConstruct();
	}
}