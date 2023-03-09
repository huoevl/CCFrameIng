/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_MsgTipsCom extends fgui.GComponent {

	public spt_bg:fgui.GImage;
	public label_msg:fgui.GTextField;

	public static URL:string = "ui://0463cssww13kk52f";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_MsgTipsCom";

	public static createInstance():UI_MsgTipsCom {
		return <UI_MsgTipsCom>(fgui.UIPackage.createObject("base","MsgTipsCom"));
	}

	protected onConstruct(): void {
		let self = this;
		self.spt_bg = <fgui.GImage>(self.getChild("spt_bg"));
		self.label_msg = <fgui.GTextField>(self.getChild("label_msg"));
		super.onConstruct();
	}
}