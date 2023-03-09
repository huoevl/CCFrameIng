/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_Comp_ShareBtn extends fgui.GComponent {

	public ctrl_btnType:fgui.Controller;
	public ctrl_straight:fgui.Controller;
	public btn_share:fgui.GButton;
	public btn_share1:fgui.GButton;
	public img_res:fgui.GLoader;
	public label_num:fgui.GTextField;
	public t0:fgui.Transition;
	public t1:fgui.Transition;
	public t2:fgui.Transition;

	public static URL:string = "ui://0463csswfjqqk53l";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_Comp_ShareBtn";

	public static createInstance():UI_Comp_ShareBtn {
		return <UI_Comp_ShareBtn>(fgui.UIPackage.createObject("base","Comp_ShareBtn"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_btnType = self.getController("ctrl_btnType");
		self.ctrl_straight = self.getController("ctrl_straight");
		self.btn_share = <fgui.GButton>(self.getChild("btn_share"));
		self.btn_share1 = <fgui.GButton>(self.getChild("btn_share1"));
		self.img_res = <fgui.GLoader>(self.getChild("img_res"));
		self.label_num = <fgui.GTextField>(self.getChild("label_num"));
		self.t0 = self.getTransition("t0");
		self.t1 = self.getTransition("t1");
		self.t2 = self.getTransition("t2");
		super.onConstruct();
	}
}