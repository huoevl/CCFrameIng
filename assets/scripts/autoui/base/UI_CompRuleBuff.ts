/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_CompRuleBuff extends fgui.GComponent {

	public ctrl_hasRule:fgui.Controller;
	public label_add:fgui.GTextField;
	public btn_rule:fgui.GButton;

	public static URL:string = "ui://0463csswr9gx20";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompRuleBuff";

	public static createInstance():UI_CompRuleBuff {
		return <UI_CompRuleBuff>(fgui.UIPackage.createObject("base","CompRuleBuff"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_hasRule = self.getController("ctrl_hasRule");
		self.label_add = <fgui.GTextField>(self.getChild("label_add"));
		self.btn_rule = <fgui.GButton>(self.getChild("btn_rule"));
		super.onConstruct();
	}
}