/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_BaseFrame from "./UI_BaseFrame";

import * as fgui from "fairygui-cc";
export default class UI_SocketMsgDlg extends fgui.GComponent {

	public ctrl_state:fgui.Controller;
	public com_frame:UI_BaseFrame;
	public label_msg:fgui.GTextField;
	public btn_ok:fgui.GButton;

	public static URL:string = "ui://0463csswcpf92r";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_SocketMsgDlg";

	public static createInstance():UI_SocketMsgDlg {
		return <UI_SocketMsgDlg>(fgui.UIPackage.createObject("base","SocketMsgDlg"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_state = self.getController("ctrl_state");
		self.com_frame = <UI_BaseFrame>(self.getChild("com_frame"));
		self.label_msg = <fgui.GTextField>(self.getChild("label_msg"));
		self.btn_ok = <fgui.GButton>(self.getChild("btn_ok"));
		super.onConstruct();
	}
}