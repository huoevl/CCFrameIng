/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_RedCom from "./UI_RedCom";

import * as fgui from "fairygui-cc";
export default class UI_ComAtListBtn extends fgui.GComponent {

	public img_icon:fgui.GLoader;
	public img_title:fgui.GLoader;
	public label_rank:fgui.GTextField;
	public label_time:fgui.GTextField;
	public btn_jump:fgui.GButton;
	public red:UI_RedCom;

	public static URL:string = "ui://0463cssw7oymasdy";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_ComAtListBtn";

	public static createInstance():UI_ComAtListBtn {
		return <UI_ComAtListBtn>(fgui.UIPackage.createObject("base","ComAtListBtn"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_icon = <fgui.GLoader>(self.getChild("img_icon"));
		self.img_title = <fgui.GLoader>(self.getChild("img_title"));
		self.label_rank = <fgui.GTextField>(self.getChild("label_rank"));
		self.label_time = <fgui.GTextField>(self.getChild("label_time"));
		self.btn_jump = <fgui.GButton>(self.getChild("btn_jump"));
		self.red = <UI_RedCom>(self.getChild("red"));
		super.onConstruct();
	}
}