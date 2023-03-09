/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_BaseFrame from "./UI_BaseFrame";

import * as fgui from "fairygui-cc";
export default class UI_RewardPreview extends fgui.GComponent {

	public ctrl_tips:fgui.Controller;
	public com_frame:UI_BaseFrame;
	public list_item:fgui.GList;

	public static URL:string = "ui://0463csswfw1qk534";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_RewardPreview";

	public static createInstance():UI_RewardPreview {
		return <UI_RewardPreview>(fgui.UIPackage.createObject("base","RewardPreview"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_tips = self.getController("ctrl_tips");
		self.com_frame = <UI_BaseFrame>(self.getChild("com_frame"));
		self.list_item = <fgui.GList>(self.getChild("list_item"));
		super.onConstruct();
	}
}