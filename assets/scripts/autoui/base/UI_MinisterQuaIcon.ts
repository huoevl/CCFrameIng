/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_MinisterQuaIcon extends fgui.GComponent {

	public ctrl_star:fgui.Controller;
	public ctrl_showName:fgui.Controller;
	public img_qual:fgui.GLoader;
	public label_name:fgui.GTextField;
	public list_star:fgui.GList;

	public static URL:string = "ui://0463csswimhp6";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_MinisterQuaIcon";

	public static createInstance():UI_MinisterQuaIcon {
		return <UI_MinisterQuaIcon>(fgui.UIPackage.createObject("base","MinisterQuaIcon"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_star = self.getController("ctrl_star");
		self.ctrl_showName = self.getController("ctrl_showName");
		self.img_qual = <fgui.GLoader>(self.getChild("img_qual"));
		self.label_name = <fgui.GTextField>(self.getChild("label_name"));
		self.list_star = <fgui.GList>(self.getChild("list_star"));
		super.onConstruct();
	}
}