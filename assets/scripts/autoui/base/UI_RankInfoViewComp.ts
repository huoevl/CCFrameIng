/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_AvatarCom from "./UI_AvatarCom";

import * as fgui from "fairygui-cc";
export default class UI_RankInfoViewComp extends fgui.GComponent {

	public db_com:UI_AvatarCom;

	public static URL:string = "ui://0463csswi8191k5ov";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_RankInfoViewComp";

	public static createInstance():UI_RankInfoViewComp {
		return <UI_RankInfoViewComp>(fgui.UIPackage.createObject("base","RankInfoViewComp"));
	}

	protected onConstruct(): void {
		let self = this;
		self.db_com = <UI_AvatarCom>(self.getChild("db_com"));
		super.onConstruct();
	}
}