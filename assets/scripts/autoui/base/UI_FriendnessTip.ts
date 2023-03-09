/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_FriendnessTip extends fgui.GComponent {

	public img_item:fgui.GLoader;
	public label_friendness:fgui.GTextField;

	public static URL:string = "ui://0463csswkk96mk55l";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_FriendnessTip";

	public static createInstance():UI_FriendnessTip {
		return <UI_FriendnessTip>(fgui.UIPackage.createObject("base","FriendnessTip"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_item = <fgui.GLoader>(self.getChild("img_item"));
		self.label_friendness = <fgui.GTextField>(self.getChild("label_friendness"));
		super.onConstruct();
	}
}