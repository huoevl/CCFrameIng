/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_BaseFrame from "./UI_BaseFrame";

import * as fgui from "fairygui-cc";
export default class UI_BuyClothDlg3 extends fgui.GComponent {

	public com_frame:UI_BaseFrame;
	public img_icon:fgui.GLoader;
	public label_name:fgui.GTextField;
	public list_star:fgui.GList;
	public img_style0:fgui.GLoader;
	public img_style1:fgui.GLoader;
	public img_tag0:fgui.GLoader;
	public img_tag1:fgui.GLoader;
	public img_color:fgui.GImage;
	public img_up:fgui.GImage;
	public label_has:fgui.GTextField;
	public img_old:fgui.GLoader;
	public label_price:fgui.GTextField;
	public grp_yuanjia:fgui.GGroup;
	public btn_close:fgui.GButton;
	public btn_buy:fgui.GButton;
	public label_num:fgui.GRichTextField;
	public btn_reduct:fgui.GButton;
	public btn_add:fgui.GButton;
	public slider_num:fgui.GSlider;

	public static URL:string = "ui://0463csswexvdmk556";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_BuyClothDlg3";

	public static createInstance():UI_BuyClothDlg3 {
		return <UI_BuyClothDlg3>(fgui.UIPackage.createObject("base","BuyClothDlg3"));
	}

	protected onConstruct(): void {
		let self = this;
		self.com_frame = <UI_BaseFrame>(self.getChild("com_frame"));
		self.img_icon = <fgui.GLoader>(self.getChild("img_icon"));
		self.label_name = <fgui.GTextField>(self.getChild("label_name"));
		self.list_star = <fgui.GList>(self.getChild("list_star"));
		self.img_style0 = <fgui.GLoader>(self.getChild("img_style0"));
		self.img_style1 = <fgui.GLoader>(self.getChild("img_style1"));
		self.img_tag0 = <fgui.GLoader>(self.getChild("img_tag0"));
		self.img_tag1 = <fgui.GLoader>(self.getChild("img_tag1"));
		self.img_color = <fgui.GImage>(self.getChild("img_color"));
		self.img_up = <fgui.GImage>(self.getChild("img_up"));
		self.label_has = <fgui.GTextField>(self.getChild("label_has"));
		self.img_old = <fgui.GLoader>(self.getChild("img_old"));
		self.label_price = <fgui.GTextField>(self.getChild("label_price"));
		self.grp_yuanjia = <fgui.GGroup>(self.getChild("grp_yuanjia"));
		self.btn_close = <fgui.GButton>(self.getChild("btn_close"));
		self.btn_buy = <fgui.GButton>(self.getChild("btn_buy"));
		self.label_num = <fgui.GRichTextField>(self.getChild("label_num"));
		self.btn_reduct = <fgui.GButton>(self.getChild("btn_reduct"));
		self.btn_add = <fgui.GButton>(self.getChild("btn_add"));
		self.slider_num = <fgui.GSlider>(self.getChild("slider_num"));
		super.onConstruct();
	}
}