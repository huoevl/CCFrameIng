/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_AvatarCom from "./UI_AvatarCom";

import * as fgui from "fairygui-cc";
export default class UI_CompPlayerHalf extends fgui.GComponent {

	public db_com:UI_AvatarCom;

	public static URL:string = "ui://0463csswlexsk53j";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompPlayerHalf";

	public static createInstance():UI_CompPlayerHalf {
		return <UI_CompPlayerHalf>(fgui.UIPackage.createObject("base","CompPlayerHalf"));
	}

	protected onConstruct(): void {
		let self = this;
		self.db_com = <UI_AvatarCom>(self.getChild("db_com"));
		super.onConstruct();
	}
}