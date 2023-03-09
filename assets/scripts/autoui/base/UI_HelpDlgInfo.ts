/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_HelpDlgInfo extends fgui.GComponent {

	public label_title:fgui.GTextField;
	public list_txt:fgui.GList;

	public static URL:string = "ui://0463csswrb25k537";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_HelpDlgInfo";

	public static createInstance():UI_HelpDlgInfo {
		return <UI_HelpDlgInfo>(fgui.UIPackage.createObject("base","HelpDlgInfo"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label_title = <fgui.GTextField>(self.getChild("label_title"));
		self.list_txt = <fgui.GList>(self.getChild("list_txt"));
		super.onConstruct();
	}
}