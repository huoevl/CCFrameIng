/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_ComVipBtn extends fgui.GButton {

	public label_vip:fgui.GTextField;

	public static URL:string = "ui://0463csswr7kgk544";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_ComVipBtn";

	public static createInstance():UI_ComVipBtn {
		return <UI_ComVipBtn>(fgui.UIPackage.createObject("base","ComVipBtn"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label_vip = <fgui.GTextField>(self.getChild("label_vip"));
		super.onConstruct();
	}
}