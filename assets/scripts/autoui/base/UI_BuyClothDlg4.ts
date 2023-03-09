/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_BaseFrame from "./UI_BaseFrame";

import * as fgui from "fairygui-cc";
export default class UI_BuyClothDlg4 extends fgui.GComponent {

	public c1:fgui.Controller;
	public c_audit:fgui.Controller;
	public com_frame:UI_BaseFrame;
	public img_icon:fgui.GLoader;
	public label_name:fgui.GTextField;
	public list_star:fgui.GList;
	public label_count:fgui.GTextField;
	public img_style0:fgui.GLoader;
	public img_style1:fgui.GLoader;
	public img_tag0:fgui.GLoader;
	public img_tag1:fgui.GLoader;
	public img_color:fgui.GImage;
	public img_up:fgui.GImage;
	public btn_buy_card:fgui.GButton;
	public label_buy_card:fgui.GTextField;
	public btn_buy:fgui.GButton;
	public img_res:fgui.GLoader;
	public label_price:fgui.GTextField;
	public img_cost:fgui.GLoader;
	public price:fgui.GTextField;
	public discount:fgui.GTextField;

	public static URL:string = "ui://0463csswn84lmk55b";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_BuyClothDlg4";

	public static createInstance():UI_BuyClothDlg4 {
		return <UI_BuyClothDlg4>(fgui.UIPackage.createObject("base","BuyClothDlg4"));
	}

	protected onConstruct(): void {
		let self = this;
		self.c1 = self.getController("c1");
		self.c_audit = self.getController("c_audit");
		self.com_frame = <UI_BaseFrame>(self.getChild("com_frame"));
		self.img_icon = <fgui.GLoader>(self.getChild("img_icon"));
		self.label_name = <fgui.GTextField>(self.getChild("label_name"));
		self.list_star = <fgui.GList>(self.getChild("list_star"));
		self.label_count = <fgui.GTextField>(self.getChild("label_count"));
		self.img_style0 = <fgui.GLoader>(self.getChild("img_style0"));
		self.img_style1 = <fgui.GLoader>(self.getChild("img_style1"));
		self.img_tag0 = <fgui.GLoader>(self.getChild("img_tag0"));
		self.img_tag1 = <fgui.GLoader>(self.getChild("img_tag1"));
		self.img_color = <fgui.GImage>(self.getChild("img_color"));
		self.img_up = <fgui.GImage>(self.getChild("img_up"));
		self.btn_buy_card = <fgui.GButton>(self.getChild("btn_buy_card"));
		self.label_buy_card = <fgui.GTextField>(self.getChild("label_buy_card"));
		self.btn_buy = <fgui.GButton>(self.getChild("btn_buy"));
		self.img_res = <fgui.GLoader>(self.getChild("img_res"));
		self.label_price = <fgui.GTextField>(self.getChild("label_price"));
		self.img_cost = <fgui.GLoader>(self.getChild("img_cost"));
		self.price = <fgui.GTextField>(self.getChild("price"));
		self.discount = <fgui.GTextField>(self.getChild("discount"));
		super.onConstruct();
	}
}