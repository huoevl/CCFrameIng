/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_GainTipTxtItem from "./UI_GainTipTxtItem";

import * as fgui from "fairygui-cc";
export default class UI_GainTipTxt extends fgui.GComponent {

	public comp_txt:UI_GainTipTxtItem;

	public static URL:string = "ui://0463csswf9fm2p";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_GainTipTxt";

	public static createInstance():UI_GainTipTxt {
		return <UI_GainTipTxt>(fgui.UIPackage.createObject("base","GainTipTxt"));
	}

	protected onConstruct(): void {
		let self = this;
		self.comp_txt = <UI_GainTipTxtItem>(self.getChild("comp_txt"));
		super.onConstruct();
	}
}