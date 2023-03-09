/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_TaskAchReach extends fgui.GComponent {

	public label_target:fgui.GTextField;
	public label_title:fgui.GTextField;

	public static URL:string = "ui://0463csswxq6t11";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_TaskAchReach";

	public static createInstance():UI_TaskAchReach {
		return <UI_TaskAchReach>(fgui.UIPackage.createObject("base","TaskAchReach"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label_target = <fgui.GTextField>(self.getChild("label_target"));
		self.label_title = <fgui.GTextField>(self.getChild("label_title"));
		super.onConstruct();
	}
}