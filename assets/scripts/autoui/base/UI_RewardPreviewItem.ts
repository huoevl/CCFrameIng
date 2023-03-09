/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_IcoItem from "./UI_IcoItem";

import * as fgui from "fairygui-cc";
export default class UI_RewardPreviewItem extends fgui.GComponent {

	public item:UI_IcoItem;
	public label_name:fgui.GTextField;

	public static URL:string = "ui://0463csswrmoe1";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_RewardPreviewItem";

	public static createInstance():UI_RewardPreviewItem {
		return <UI_RewardPreviewItem>(fgui.UIPackage.createObject("base","RewardPreviewItem"));
	}

	protected onConstruct(): void {
		let self = this;
		self.item = <UI_IcoItem>(self.getChild("item"));
		self.label_name = <fgui.GTextField>(self.getChild("label_name"));
		super.onConstruct();
	}
}