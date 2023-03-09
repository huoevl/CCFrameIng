/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_MsgTipsCom from "./UI_MsgTipsCom";

import * as fgui from "fairygui-cc";
export default class UI_MsgTips extends fgui.GComponent {

	public spt_bg:UI_MsgTipsCom;

	public static URL:string = "ui://0463csswnlzt6";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_MsgTips";

	public static createInstance():UI_MsgTips {
		return <UI_MsgTips>(fgui.UIPackage.createObject("base","MsgTips"));
	}

	protected onConstruct(): void {
		let self = this;
		self.spt_bg = <UI_MsgTipsCom>(self.getChild("spt_bg"));
		super.onConstruct();
	}
}