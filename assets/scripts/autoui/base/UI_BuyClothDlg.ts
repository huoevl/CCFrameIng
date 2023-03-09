/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_BaseFrame from "./UI_BaseFrame";

import * as fgui from "fairygui-cc";
export default class UI_BuyClothDlg extends fgui.GComponent {

	public com_frame:UI_BaseFrame;
	public img_icon:fgui.GLoader;
	public label_name:fgui.GTextField;
	public list_star:fgui.GList;
	public label_count:fgui.GTextField;
	public img_style0:fgui.GLoader;
	public img_style1:fgui.GLoader;
	public img_tag0:fgui.GLoader;
	public img_tag1:fgui.GLoader;
	public img_res:fgui.GLoader;
	public label_price:fgui.GTextField;
	public grp_price:fgui.GGroup;
	public img_color:fgui.GImage;
	public img_up:fgui.GImage;
	public btn_close:fgui.GButton;
	public btn_buy:fgui.GButton;

	public static URL:string = "ui://0463csswe4kfk543";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_BuyClothDlg";

	public static createInstance():UI_BuyClothDlg {
		return <UI_BuyClothDlg>(fgui.UIPackage.createObject("base","BuyClothDlg"));
	}

	protected onConstruct(): void {
		let self = this;
		self.com_frame = <UI_BaseFrame>(self.getChild("com_frame"));
		self.img_icon = <fgui.GLoader>(self.getChild("img_icon"));
		self.label_name = <fgui.GTextField>(self.getChild("label_name"));
		self.list_star = <fgui.GList>(self.getChild("list_star"));
		self.label_count = <fgui.GTextField>(self.getChild("label_count"));
		self.img_style0 = <fgui.GLoader>(self.getChild("img_style0"));
		self.img_style1 = <fgui.GLoader>(self.getChild("img_style1"));
		self.img_tag0 = <fgui.GLoader>(self.getChild("img_tag0"));
		self.img_tag1 = <fgui.GLoader>(self.getChild("img_tag1"));
		self.img_res = <fgui.GLoader>(self.getChild("img_res"));
		self.label_price = <fgui.GTextField>(self.getChild("label_price"));
		self.grp_price = <fgui.GGroup>(self.getChild("grp_price"));
		self.img_color = <fgui.GImage>(self.getChild("img_color"));
		self.img_up = <fgui.GImage>(self.getChild("img_up"));
		self.btn_close = <fgui.GButton>(self.getChild("btn_close"));
		self.btn_buy = <fgui.GButton>(self.getChild("btn_buy"));
		super.onConstruct();
	}
}