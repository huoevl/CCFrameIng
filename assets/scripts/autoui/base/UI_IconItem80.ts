/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_IcoItem from "./UI_IcoItem";

import * as fgui from "fairygui-cc";
export default class UI_IconItem80 extends fgui.GComponent {

	public item:UI_IcoItem;

	public static URL:string = "ui://0463csswj73kk53h";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_IconItem80";

	public static createInstance():UI_IconItem80 {
		return <UI_IconItem80>(fgui.UIPackage.createObject("base","IconItem80"));
	}

	protected onConstruct(): void {
		let self = this;
		self.item = <UI_IcoItem>(self.getChild("item"));
		super.onConstruct();
	}
}