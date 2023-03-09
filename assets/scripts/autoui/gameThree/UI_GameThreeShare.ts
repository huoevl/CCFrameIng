/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeShare extends fgui.GComponent {

	public ctrl_shareType:fgui.Controller;
	public com_frame:fgui.GComponent;
	public btn_back:fgui.GButton;
	public comp_item:fgui.GComponent;
	public label_itemDesc:fgui.GTextField;
	public btn_use:fgui.GButton;
	public label_shareDesc:fgui.GTextField;
	public label_count:fgui.GTextField;
	public btn_share:fgui.GButton;
	public btn_movie:fgui.GButton;
	public img_vip:fgui.GImage;
	public btn_back1:fgui.GLoader;
	public grp_back:fgui.GGroup;

	public static URL:string = "ui://xtdgeoapr7ab1i";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeShare";

	public static createInstance():UI_GameThreeShare {
		return <UI_GameThreeShare>(fgui.UIPackage.createObject("gameThree","GameThreeShare"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_shareType = self.getController("ctrl_shareType");
		self.com_frame = <fgui.GComponent>(self.getChild("com_frame"));
		self.btn_back = <fgui.GButton>(self.getChild("btn_back"));
		self.comp_item = <fgui.GComponent>(self.getChild("comp_item"));
		self.label_itemDesc = <fgui.GTextField>(self.getChild("label_itemDesc"));
		self.btn_use = <fgui.GButton>(self.getChild("btn_use"));
		self.label_shareDesc = <fgui.GTextField>(self.getChild("label_shareDesc"));
		self.label_count = <fgui.GTextField>(self.getChild("label_count"));
		self.btn_share = <fgui.GButton>(self.getChild("btn_share"));
		self.btn_movie = <fgui.GButton>(self.getChild("btn_movie"));
		self.img_vip = <fgui.GImage>(self.getChild("img_vip"));
		self.btn_back1 = <fgui.GLoader>(self.getChild("btn_back1"));
		self.grp_back = <fgui.GGroup>(self.getChild("grp_back"));
		super.onConstruct();
	}
}