/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_Container from "./UI_Container";

import * as fgui from "fairygui-cc";
export default class UI_Act extends fgui.GComponent {

	public ctrl_state:fgui.Controller;
	public img_bg:fgui.GLoader;
	public view_con:UI_Container;
	public img_bottom:fgui.GLoader;
	public list_btn:fgui.GList;
	public btn_close:fgui.GButton;

	public static URL:string = "ui://0463csswu0d4k52g";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_Act";

	public static createInstance():UI_Act {
		return <UI_Act>(fgui.UIPackage.createObject("base","Act"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_state = self.getController("ctrl_state");
		self.img_bg = <fgui.GLoader>(self.getChild("img_bg"));
		self.view_con = <UI_Container>(self.getChild("view_con"));
		self.img_bottom = <fgui.GLoader>(self.getChild("img_bottom"));
		self.list_btn = <fgui.GList>(self.getChild("list_btn"));
		self.btn_close = <fgui.GButton>(self.getChild("btn_close"));
		super.onConstruct();
	}
}