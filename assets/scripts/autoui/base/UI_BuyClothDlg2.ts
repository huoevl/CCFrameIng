/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_BaseFrame from "./UI_BaseFrame";

import * as fgui from "fairygui-cc";
export default class UI_BuyClothDlg2 extends fgui.GComponent {

	public ctrl_discount:fgui.Controller;
	public ctrl_reach:fgui.Controller;
	public ctrl_pay:fgui.Controller;
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
	public img_old:fgui.GLoader;
	public label_oldPrice:fgui.GTextField;
	public grp_yuanjia:fgui.GGroup;
	public btn_card:fgui.GButton;
	public img_curr:fgui.GLoader;
	public label_curr:fgui.GTextField;
	public btn_close:fgui.GButton;
	public btn_buy:fgui.GButton;

	public static URL:string = "ui://0463csswe7xwk52i";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_BuyClothDlg2";

	public static createInstance():UI_BuyClothDlg2 {
		return <UI_BuyClothDlg2>(fgui.UIPackage.createObject("base","BuyClothDlg2"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_discount = self.getController("ctrl_discount");
		self.ctrl_reach = self.getController("ctrl_reach");
		self.ctrl_pay = self.getController("ctrl_pay");
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
		self.img_old = <fgui.GLoader>(self.getChild("img_old"));
		self.label_oldPrice = <fgui.GTextField>(self.getChild("label_oldPrice"));
		self.grp_yuanjia = <fgui.GGroup>(self.getChild("grp_yuanjia"));
		self.btn_card = <fgui.GButton>(self.getChild("btn_card"));
		self.img_curr = <fgui.GLoader>(self.getChild("img_curr"));
		self.label_curr = <fgui.GTextField>(self.getChild("label_curr"));
		self.btn_close = <fgui.GButton>(self.getChild("btn_close"));
		self.btn_buy = <fgui.GButton>(self.getChild("btn_buy"));
		super.onConstruct();
	}
}