/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_AntiqueAdd from "./UI_AntiqueAdd";

import * as fgui from "fairygui-cc";
export default class UI_AntiqueName extends fgui.GLabel {

	public ctrl_qual:fgui.Controller;
	public ctrl_mc:fgui.Controller;
	public mc_name:fgui.GLoader;
	public comp_add:UI_AntiqueAdd;

	public static URL:string = "ui://0463csswpsaa30";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_AntiqueName";

	public static createInstance():UI_AntiqueName {
		return <UI_AntiqueName>(fgui.UIPackage.createObject("base","AntiqueName"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_qual = self.getController("ctrl_qual");
		self.ctrl_mc = self.getController("ctrl_mc");
		self.mc_name = <fgui.GLoader>(self.getChild("mc_name"));
		self.comp_add = <UI_AntiqueAdd>(self.getChild("comp_add"));
		super.onConstruct();
	}
}