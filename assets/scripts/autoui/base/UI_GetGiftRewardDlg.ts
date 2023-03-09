/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_IcoItem from "./UI_IcoItem";

import * as fgui from "fairygui-cc";
export default class UI_GetGiftRewardDlg extends fgui.GComponent {

	public mc_efx:fgui.GLoader;
	public mc_eff3:fgui.GLoader;
	public comp_item:UI_IcoItem;
	public label_item:fgui.GRichTextField;
	public label_desc:fgui.GTextField;
	public grp_oneRow:fgui.GGroup;
	public mc_eff1:fgui.GLoader;
	public mc_eff2:fgui.GLoader;
	public mc_eff4:fgui.GLoader;
	public mc_eff5:fgui.GLoader;

	public static URL:string = "ui://0463csswe5dfmk54n";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_GetGiftRewardDlg";

	public static createInstance():UI_GetGiftRewardDlg {
		return <UI_GetGiftRewardDlg>(fgui.UIPackage.createObject("base","GetGiftRewardDlg"));
	}

	protected onConstruct(): void {
		let self = this;
		self.mc_efx = <fgui.GLoader>(self.getChild("mc_efx"));
		self.mc_eff3 = <fgui.GLoader>(self.getChild("mc_eff3"));
		self.comp_item = <UI_IcoItem>(self.getChild("comp_item"));
		self.label_item = <fgui.GRichTextField>(self.getChild("label_item"));
		self.label_desc = <fgui.GTextField>(self.getChild("label_desc"));
		self.grp_oneRow = <fgui.GGroup>(self.getChild("grp_oneRow"));
		self.mc_eff1 = <fgui.GLoader>(self.getChild("mc_eff1"));
		self.mc_eff2 = <fgui.GLoader>(self.getChild("mc_eff2"));
		self.mc_eff4 = <fgui.GLoader>(self.getChild("mc_eff4"));
		self.mc_eff5 = <fgui.GLoader>(self.getChild("mc_eff5"));
		super.onConstruct();
	}
}