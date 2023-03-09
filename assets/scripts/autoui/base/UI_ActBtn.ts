/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_RedCom from "./UI_RedCom";

import * as fgui from "fairygui-cc";
export default class UI_ActBtn extends fgui.GButton {

	public img_red:UI_RedCom;

	public static URL:string = "ui://0463csswu0d4k52h";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_ActBtn";

	public static createInstance():UI_ActBtn {
		return <UI_ActBtn>(fgui.UIPackage.createObject("base","ActBtn"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_red = <UI_RedCom>(self.getChild("img_red"));
		super.onConstruct();
	}
}