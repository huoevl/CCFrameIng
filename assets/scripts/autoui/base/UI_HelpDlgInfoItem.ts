/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_HelpDlgInfoItem extends fgui.GComponent {

	public label_content:fgui.GRichTextField;

	public static URL:string = "ui://0463csswu5w8mk55s";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_HelpDlgInfoItem";

	public static createInstance():UI_HelpDlgInfoItem {
		return <UI_HelpDlgInfoItem>(fgui.UIPackage.createObject("base","HelpDlgInfoItem"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label_content = <fgui.GRichTextField>(self.getChild("label_content"));
		super.onConstruct();
	}
}