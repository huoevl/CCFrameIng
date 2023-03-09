/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_CompBubbleLeft extends fgui.GComponent {

	public label:fgui.GTextField;
	public group_1:fgui.GGroup;
	public t0:fgui.Transition;

	public static URL:string = "ui://0463csswecdas6h";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompBubbleLeft";

	public static createInstance():UI_CompBubbleLeft {
		return <UI_CompBubbleLeft>(fgui.UIPackage.createObject("base","CompBubbleLeft"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label = <fgui.GTextField>(self.getChild("label"));
		self.group_1 = <fgui.GGroup>(self.getChild("group_1"));
		self.t0 = self.getTransition("t0");
		super.onConstruct();
	}
}