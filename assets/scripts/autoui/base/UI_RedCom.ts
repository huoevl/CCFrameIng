/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_RedCom extends fgui.GComponent {

	public img:fgui.GMovieClip;

	public static URL:string = "ui://0463csswnvwnk";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_RedCom";

	public static createInstance():UI_RedCom {
		return <UI_RedCom>(fgui.UIPackage.createObject("base","RedCom"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img = <fgui.GMovieClip>(self.getChild("img"));
		super.onConstruct();
	}
}