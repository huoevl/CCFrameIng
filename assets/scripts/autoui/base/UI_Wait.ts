/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_Wait extends fgui.GComponent {

	public loading:fgui.GImage;

	public static URL:string = "ui://0463csswm5q0mk54q";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_Wait";

	public static createInstance():UI_Wait {
		return <UI_Wait>(fgui.UIPackage.createObject("base","Wait"));
	}

	protected onConstruct(): void {
		let self = this;
		self.loading = <fgui.GImage>(self.getChild("loading"));
		super.onConstruct();
	}
}