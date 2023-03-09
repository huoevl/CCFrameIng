/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_CompHeader extends fgui.GComponent {

	public ctrl_state:fgui.Controller;
	public background:fgui.GImage;
	public label_title:fgui.GTextField;
	public grp_di:fgui.GGroup;
	public $btn_close:fgui.GButton;
	public btn_help:fgui.GButton;
	public list_res:fgui.GList;

	public static URL:string = "ui://0463csswlglwk52k";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompHeader";

	public static createInstance():UI_CompHeader {
		return <UI_CompHeader>(fgui.UIPackage.createObject("base","CompHeader"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_state = self.getController("ctrl_state");
		self.background = <fgui.GImage>(self.getChild("background"));
		self.label_title = <fgui.GTextField>(self.getChild("label_title"));
		self.grp_di = <fgui.GGroup>(self.getChild("grp_di"));
		self.$btn_close = <fgui.GButton>(self.getChild("$btn_close"));
		self.btn_help = <fgui.GButton>(self.getChild("btn_help"));
		self.list_res = <fgui.GList>(self.getChild("list_res"));
		super.onConstruct();
	}
}