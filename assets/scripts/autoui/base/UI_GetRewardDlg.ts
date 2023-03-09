/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GetRewardDlg extends fgui.GComponent {

	public ctrl_model:fgui.Controller;
	public mc_efx:fgui.GLoader;
	public mc_eff3:fgui.GLoader;
	public list_item:fgui.GList;
	public grp_oneRow:fgui.GGroup;
	public mc_eff1:fgui.GLoader;
	public mc_eff2:fgui.GLoader;
	public mc_eff4:fgui.GLoader;
	public mc_eff5:fgui.GLoader;
	public img_tj:fgui.GLoader;
	public list_tsItem:fgui.GList;
	public btn_ok:fgui.GButton;
	public img_online:fgui.GLoader;
	public btn_share:fgui.GButton;
	public btn_noThanks:fgui.GButton;
	public title_tips:fgui.GTextField;
	public list_olItem:fgui.GList;

	public static URL:string = "ui://0463csswrcxt5";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_GetRewardDlg";

	public static createInstance():UI_GetRewardDlg {
		return <UI_GetRewardDlg>(fgui.UIPackage.createObject("base","GetRewardDlg"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_model = self.getController("ctrl_model");
		self.mc_efx = <fgui.GLoader>(self.getChild("mc_efx"));
		self.mc_eff3 = <fgui.GLoader>(self.getChild("mc_eff3"));
		self.list_item = <fgui.GList>(self.getChild("list_item"));
		self.grp_oneRow = <fgui.GGroup>(self.getChild("grp_oneRow"));
		self.mc_eff1 = <fgui.GLoader>(self.getChild("mc_eff1"));
		self.mc_eff2 = <fgui.GLoader>(self.getChild("mc_eff2"));
		self.mc_eff4 = <fgui.GLoader>(self.getChild("mc_eff4"));
		self.mc_eff5 = <fgui.GLoader>(self.getChild("mc_eff5"));
		self.img_tj = <fgui.GLoader>(self.getChild("img_tj"));
		self.list_tsItem = <fgui.GList>(self.getChild("list_tsItem"));
		self.btn_ok = <fgui.GButton>(self.getChild("btn_ok"));
		self.img_online = <fgui.GLoader>(self.getChild("img_online"));
		self.btn_share = <fgui.GButton>(self.getChild("btn_share"));
		self.btn_noThanks = <fgui.GButton>(self.getChild("btn_noThanks"));
		self.title_tips = <fgui.GTextField>(self.getChild("title_tips"));
		self.list_olItem = <fgui.GList>(self.getChild("list_olItem"));
		super.onConstruct();
	}
}