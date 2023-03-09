/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_IcoItem from "./UI_IcoItem";

import * as fgui from "fairygui-cc";
export default class UI_GetRewardItem extends fgui.GComponent {

	public comp_item:UI_IcoItem;
	public label_name:fgui.GTextField;

	public static URL:string = "ui://0463csswm1q4k53e";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_GetRewardItem";

	public static createInstance():UI_GetRewardItem {
		return <UI_GetRewardItem>(fgui.UIPackage.createObject("base","GetRewardItem"));
	}

	protected onConstruct(): void {
		let self = this;
		self.comp_item = <UI_IcoItem>(self.getChild("comp_item"));
		self.label_name = <fgui.GTextField>(self.getChild("label_name"));
		super.onConstruct();
	}
}