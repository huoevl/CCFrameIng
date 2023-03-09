/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_AvatarBodyCom from "./UI_AvatarBodyCom";

import * as fgui from "fairygui-cc";
export default class UI_CompMateHalf extends fgui.GComponent {

	public db_body:UI_AvatarBodyCom;
	public img_mate:fgui.GLoader;

	public static URL:string = "ui://0463csswshnqk53m";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_CompMateHalf";

	public static createInstance():UI_CompMateHalf {
		return <UI_CompMateHalf>(fgui.UIPackage.createObject("base","CompMateHalf"));
	}

	protected onConstruct(): void {
		let self = this;
		self.db_body = <UI_AvatarBodyCom>(self.getChild("db_body"));
		self.img_mate = <fgui.GLoader>(self.getChild("img_mate"));
		super.onConstruct();
	}
}