/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_UserLvlLabel extends fgui.GComponent {

	public ctrl_state:fgui.Controller;
	public label_lv1:fgui.GTextField;
	public label_lv2:fgui.GTextField;

	public static URL:string = "ui://0463csswf6v0mk563";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_UserLvlLabel";

	public static createInstance():UI_UserLvlLabel {
		return <UI_UserLvlLabel>(fgui.UIPackage.createObject("base","UserLvlLabel"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_state = self.getController("ctrl_state");
		self.label_lv1 = <fgui.GTextField>(self.getChild("label_lv1"));
		self.label_lv2 = <fgui.GTextField>(self.getChild("label_lv2"));
		super.onConstruct();
	}
}