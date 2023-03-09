/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_BaseFrame from "./UI_BaseFrame";

import * as fgui from "fairygui-cc";
export default class UI_MsgDlg extends fgui.GComponent {

	public ctrl_msgType:fgui.Controller;
	public com_frame:UI_BaseFrame;
	public label_msg:fgui.GRichTextField;
	public btn_do:fgui.GButton;
	public btn_cancel:fgui.GButton;
	public btn_ok:fgui.GButton;
	public btn_rchg:fgui.GButton;
	public btn_exitShare:fgui.GButton;
	public btn_share:fgui.GButton;

	public static URL:string = "ui://0463csswd7tg5";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_MsgDlg";

	public static createInstance():UI_MsgDlg {
		return <UI_MsgDlg>(fgui.UIPackage.createObject("base","MsgDlg"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_msgType = self.getController("ctrl_msgType");
		self.com_frame = <UI_BaseFrame>(self.getChild("com_frame"));
		self.label_msg = <fgui.GRichTextField>(self.getChild("label_msg"));
		self.btn_do = <fgui.GButton>(self.getChild("btn_do"));
		self.btn_cancel = <fgui.GButton>(self.getChild("btn_cancel"));
		self.btn_ok = <fgui.GButton>(self.getChild("btn_ok"));
		self.btn_rchg = <fgui.GButton>(self.getChild("btn_rchg"));
		self.btn_exitShare = <fgui.GButton>(self.getChild("btn_exitShare"));
		self.btn_share = <fgui.GButton>(self.getChild("btn_share"));
		super.onConstruct();
	}
}