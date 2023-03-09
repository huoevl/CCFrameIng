/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GainTipTxtItem extends fgui.GComponent {

	public img_bg:fgui.GLoader;
	public img_item:fgui.GLoader;
	public label_item:fgui.GRichTextField;

	public static URL:string = "ui://0463csswf9fm2q";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_GainTipTxtItem";

	public static createInstance():UI_GainTipTxtItem {
		return <UI_GainTipTxtItem>(fgui.UIPackage.createObject("base","GainTipTxtItem"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_bg = <fgui.GLoader>(self.getChild("img_bg"));
		self.img_item = <fgui.GLoader>(self.getChild("img_item"));
		self.label_item = <fgui.GRichTextField>(self.getChild("label_item"));
		super.onConstruct();
	}
}