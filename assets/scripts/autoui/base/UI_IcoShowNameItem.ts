/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_IcoItem from "./UI_IcoItem";

import * as fgui from "fairygui-cc";
export default class UI_IcoShowNameItem extends fgui.GComponent {

	public comp_ico:UI_IcoItem;
	public label_name:fgui.GTextField;

	public static URL:string = "ui://0463csswr69tk52r";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_IcoShowNameItem";

	public static createInstance():UI_IcoShowNameItem {
		return <UI_IcoShowNameItem>(fgui.UIPackage.createObject("base","IcoShowNameItem"));
	}

	protected onConstruct(): void {
		let self = this;
		self.comp_ico = <UI_IcoItem>(self.getChild("comp_ico"));
		self.label_name = <fgui.GTextField>(self.getChild("label_name"));
		super.onConstruct();
	}
}