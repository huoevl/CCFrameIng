/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_GameThreeGameItem from "./UI_GameThreeGameItem";

import * as fgui from "fairygui-cc";
export default class UI_GameThreeGame extends fgui.GComponent {

	public ctrl_rank:fgui.Controller;
	public label_weekMax:fgui.GTextField;
	public label_weekRank:fgui.GTextField;
	public label_curr:fgui.GTextField;
	public label_targetLv:fgui.GTextField;
	public label_target:fgui.GTextField;
	public comp_item_0:UI_GameThreeGameItem;
	public comp_item_1:UI_GameThreeGameItem;
	public label_item_1:fgui.GTextField;
	public btn_back:fgui.GButton;
	public comp_res2:fgui.GComponent;

	public static URL:string = "ui://xtdgeoapgm4le";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeGame";

	public static createInstance():UI_GameThreeGame {
		return <UI_GameThreeGame>(fgui.UIPackage.createObject("gameThree","GameThreeGame"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_rank = self.getController("ctrl_rank");
		self.label_weekMax = <fgui.GTextField>(self.getChild("label_weekMax"));
		self.label_weekRank = <fgui.GTextField>(self.getChild("label_weekRank"));
		self.label_curr = <fgui.GTextField>(self.getChild("label_curr"));
		self.label_targetLv = <fgui.GTextField>(self.getChild("label_targetLv"));
		self.label_target = <fgui.GTextField>(self.getChild("label_target"));
		self.comp_item_0 = <UI_GameThreeGameItem>(self.getChild("comp_item_0"));
		self.comp_item_1 = <UI_GameThreeGameItem>(self.getChild("comp_item_1"));
		self.label_item_1 = <fgui.GTextField>(self.getChild("label_item_1"));
		self.btn_back = <fgui.GButton>(self.getChild("btn_back"));
		self.comp_res2 = <fgui.GComponent>(self.getChild("comp_res2"));
		super.onConstruct();
	}
}