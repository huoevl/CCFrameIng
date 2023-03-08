/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeHome extends fgui.GComponent {

	public label_date: fgui.GTextField;
	public btn_award: fgui.GButton;
	public btn_help: fgui.GButton;
	public btn_buy: fgui.GButton;
	public btn_start: fgui.GButton; 
	public btn_rank: fgui.GButton;
	public img_item: fgui.GLoader;
	public label_item: fgui.GTextField;
	public com_head: fgui.GComponent;
	public comp_res0: fgui.GComponent;
	public comp_res1: fgui.GComponent;
	public comp_res2: fgui.GComponent;
	public mc_loader: fgui.GLoader;

	public static URL: string = "ui://xtdgeoapeisi0";
	public static PKG: string = "gameThree";
	public static CLS_NAME: string = "UI_GameThreeHome";

	public static createInstance(): UI_GameThreeHome {
		return <UI_GameThreeHome>(fgui.UIPackage.createObject("gameThree", "GameThreeHome"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label_date = <fgui.GTextField>(self.getChild("label_date"));
		self.btn_award = <fgui.GButton>(self.getChild("btn_award"));
		self.btn_help = <fgui.GButton>(self.getChild("btn_help"));
		self.btn_buy = <fgui.GButton>(self.getChild("btn_buy"));
		self.btn_start = <fgui.GButton>(self.getChild("btn_start"));
		self.btn_rank = <fgui.GButton>(self.getChild("btn_rank"));
		self.img_item = <fgui.GLoader>(self.getChild("img_item"));
		self.label_item = <fgui.GTextField>(self.getChild("label_item"));
		self.com_head = <fgui.GComponent>(self.getChild("com_head"));
		self.comp_res0 = <fgui.GComponent>(self.getChild("comp_res0"));
		self.comp_res1 = <fgui.GComponent>(self.getChild("comp_res1"));
		self.comp_res2 = <fgui.GComponent>(self.getChild("comp_res2"));
		self.mc_loader = <fgui.GLoader>(self.getChild("mc_loader"));
		super.onConstruct();
	}
}