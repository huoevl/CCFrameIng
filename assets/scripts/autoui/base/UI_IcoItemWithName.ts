/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_IcoItem from "./UI_IcoItem";

import * as fgui from "fairygui-cc";
export default class UI_IcoItemWithName extends fgui.GComponent {

	public ctrl_type:fgui.Controller;
	public ctrl_effct:fgui.Controller;
	public icoItem:UI_IcoItem;
	public lbl_name:fgui.GTextField;

	public static URL:string = "ui://0463csswixdomk564";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_IcoItemWithName";

	public static createInstance():UI_IcoItemWithName {
		return <UI_IcoItemWithName>(fgui.UIPackage.createObject("base","IcoItemWithName"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_type = self.getController("ctrl_type");
		self.ctrl_effct = self.getController("ctrl_effct");
		self.icoItem = <UI_IcoItem>(self.getChild("icoItem"));
		self.lbl_name = <fgui.GTextField>(self.getChild("lbl_name"));
		super.onConstruct();
	}
}