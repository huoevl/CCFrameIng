/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_ChatRedNum from "./UI_ChatRedNum";

import * as fgui from "fairygui-cc";
export default class UI_Comp_Chat extends fgui.GComponent {

	public btn_chat:fgui.GButton;
	public label_chatType:fgui.GTextField;
	public label_chat:fgui.GRichTextField;
	public img_sl:fgui.GImage;
	public img_redSL:fgui.GMovieClip;
	public img_channel:fgui.GLoader;
	public comp_redSL:UI_ChatRedNum;

	public static URL:string = "ui://0463csswla9as8n";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_Comp_Chat";

	public static createInstance():UI_Comp_Chat {
		return <UI_Comp_Chat>(fgui.UIPackage.createObject("base","Comp_Chat"));
	}

	protected onConstruct(): void {
		let self = this;
		self.btn_chat = <fgui.GButton>(self.getChild("btn_chat"));
		self.label_chatType = <fgui.GTextField>(self.getChild("label_chatType"));
		self.label_chat = <fgui.GRichTextField>(self.getChild("label_chat"));
		self.img_sl = <fgui.GImage>(self.getChild("img_sl"));
		self.img_redSL = <fgui.GMovieClip>(self.getChild("img_redSL"));
		self.img_channel = <fgui.GLoader>(self.getChild("img_channel"));
		self.comp_redSL = <UI_ChatRedNum>(self.getChild("comp_redSL"));
		super.onConstruct();
	}
}