/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_MinisterQuaIcon from "./UI_MinisterQuaIcon";

import * as fgui from "fairygui-cc";
export default class UI_PlayerMinisterQuaIcon extends fgui.GComponent {

	public minister_qual:UI_MinisterQuaIcon;
	public label_level:fgui.GTextField;

	public static URL:string = "ui://0463csswhs3gmk55h";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_PlayerMinisterQuaIcon";

	public static createInstance():UI_PlayerMinisterQuaIcon {
		return <UI_PlayerMinisterQuaIcon>(fgui.UIPackage.createObject("base","PlayerMinisterQuaIcon"));
	}

	protected onConstruct(): void {
		let self = this;
		self.minister_qual = <UI_MinisterQuaIcon>(self.getChild("minister_qual"));
		self.label_level = <fgui.GTextField>(self.getChild("label_level"));
		super.onConstruct();
	}
}