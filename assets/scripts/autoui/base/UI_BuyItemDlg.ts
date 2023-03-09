/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_BaseFrame from "./UI_BaseFrame";
import UI_IcoItem from "./UI_IcoItem";

import * as fgui from "fairygui-cc";
export default class UI_BuyItemDlg extends fgui.GComponent {

	public ctrl_type:fgui.Controller;
	public com_frame:UI_BaseFrame;
	public comp_item:UI_IcoItem;
	public label_has:fgui.GRichTextField;
	public label_name:fgui.GTextField;
	public label_desc:fgui.GTextField;
	public label_num:fgui.GRichTextField;
	public label_limit:fgui.GRichTextField;
	public label_numL:fgui.GRichTextField;
	public btn_reduct:fgui.GButton;
	public btn_add:fgui.GButton;
	public slider_num:fgui.GSlider;
	public img_res:fgui.GLoader;
	public label_price:fgui.GTextField;
	public grp_price:fgui.GGroup;
	public img_coin:fgui.GLoader;
	public label_coin:fgui.GTextField;
	public grp_coin:fgui.GGroup;
	public label_price0:fgui.GTextField;
	public btn_close:fgui.GButton;
	public btn_buy:fgui.GButton;

	public static URL:string = "ui://0463csswl1r2d";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_BuyItemDlg";

	public static createInstance():UI_BuyItemDlg {
		return <UI_BuyItemDlg>(fgui.UIPackage.createObject("base","BuyItemDlg"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_type = self.getController("ctrl_type");
		self.com_frame = <UI_BaseFrame>(self.getChild("com_frame"));
		self.comp_item = <UI_IcoItem>(self.getChild("comp_item"));
		self.label_has = <fgui.GRichTextField>(self.getChild("label_has"));
		self.label_name = <fgui.GTextField>(self.getChild("label_name"));
		self.label_desc = <fgui.GTextField>(self.getChild("label_desc"));
		self.label_num = <fgui.GRichTextField>(self.getChild("label_num"));
		self.label_limit = <fgui.GRichTextField>(self.getChild("label_limit"));
		self.label_numL = <fgui.GRichTextField>(self.getChild("label_numL"));
		self.btn_reduct = <fgui.GButton>(self.getChild("btn_reduct"));
		self.btn_add = <fgui.GButton>(self.getChild("btn_add"));
		self.slider_num = <fgui.GSlider>(self.getChild("slider_num"));
		self.img_res = <fgui.GLoader>(self.getChild("img_res"));
		self.label_price = <fgui.GTextField>(self.getChild("label_price"));
		self.grp_price = <fgui.GGroup>(self.getChild("grp_price"));
		self.img_coin = <fgui.GLoader>(self.getChild("img_coin"));
		self.label_coin = <fgui.GTextField>(self.getChild("label_coin"));
		self.grp_coin = <fgui.GGroup>(self.getChild("grp_coin"));
		self.label_price0 = <fgui.GTextField>(self.getChild("label_price0"));
		self.btn_close = <fgui.GButton>(self.getChild("btn_close"));
		self.btn_buy = <fgui.GButton>(self.getChild("btn_buy"));
		super.onConstruct();
	}
}