/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_TrySearchResult extends fgui.GComponent {

	public ctrl_state:fgui.Controller;
	public btn_exit:fgui.GButton;
	public list_style:fgui.GList;
	public label_name:fgui.GTextField;

	public static URL:string = "ui://0463csswnydk52p";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_TrySearchResult";

	public static createInstance():UI_TrySearchResult {
		return <UI_TrySearchResult>(fgui.UIPackage.createObject("base","TrySearchResult"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_state = self.getController("ctrl_state");
		self.btn_exit = <fgui.GButton>(self.getChild("btn_exit"));
		self.list_style = <fgui.GList>(self.getChild("list_style"));
		self.label_name = <fgui.GTextField>(self.getChild("label_name"));
		super.onConstruct();
	}
}