/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_HelpDlg extends fgui.GComponent {

	public label_title:fgui.GTextField;
	public btn_close:fgui.GButton;
	public list_item:fgui.GList;

	public static URL:string = "ui://0463csswni381s";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_HelpDlg";

	public static createInstance():UI_HelpDlg {
		return <UI_HelpDlg>(fgui.UIPackage.createObject("base","HelpDlg"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label_title = <fgui.GTextField>(self.getChild("label_title"));
		self.btn_close = <fgui.GButton>(self.getChild("btn_close"));
		self.list_item = <fgui.GList>(self.getChild("list_item"));
		super.onConstruct();
	}
}