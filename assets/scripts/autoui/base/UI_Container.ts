/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_Container extends fgui.GComponent {

	public test:fgui.GLoader;

	public static URL:string = "ui://0463csswzal1c";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_Container";

	public static createInstance():UI_Container {
		return <UI_Container>(fgui.UIPackage.createObject("base","Container"));
	}

	protected onConstruct(): void {
		let self = this;
		self.test = <fgui.GLoader>(self.getChild("test"));
		super.onConstruct();
	}
}