/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_ResItem extends fgui.GComponent {

	public label_gold:fgui.GTextField;
	public label_morale:fgui.GTextField;
	public label_money:fgui.GTextField;

	public static URL:string = "ui://0463csswrcxt6";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_ResItem";

	public static createInstance():UI_ResItem {
		return <UI_ResItem>(fgui.UIPackage.createObject("base","ResItem"));
	}

	protected onConstruct(): void {
		let self = this;
		self.label_gold = <fgui.GTextField>(self.getChild("label_gold"));
		self.label_morale = <fgui.GTextField>(self.getChild("label_morale"));
		self.label_money = <fgui.GTextField>(self.getChild("label_money"));
		super.onConstruct();
	}
}