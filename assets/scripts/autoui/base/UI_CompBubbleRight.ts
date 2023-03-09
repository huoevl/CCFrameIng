/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_CompBubbleRight extends fgui.GComponent {

	public label:fgui.GTextField;
	public group_1:fgui.GGroup;
	public t0:fgui.Transition;

	public static URL:string = "ui://0463csswecdas6g";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompBubbleRight";

	public static createInstance():UI_CompBubbleRight {
		return <UI_CompBubbleRight>(fgui.UIPackage.createObject("base","CompBubbleRight"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label = <fgui.GTextField>(self.getChild("label"));
		self.group_1 = <fgui.GGroup>(self.getChild("group_1"));
		self.t0 = self.getTransition("t0");
		super.onConstruct();
	}
}