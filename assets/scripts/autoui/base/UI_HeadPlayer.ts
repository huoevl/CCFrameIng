/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_UserDiyHeadIcon from "./UI_UserDiyHeadIcon";
import UI_CompVipDesc from "./UI_CompVipDesc";

import * as fgui from "fairygui-cc";
export default class UI_HeadPlayer extends fgui.GComponent {

	public img_bg:fgui.GLoader;
	public headComp:UI_UserDiyHeadIcon;
	public img_frame:fgui.GLoader;
	public comp_vip:UI_CompVipDesc;

	public static URL:string = "ui://0463csswb86h1r";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_HeadPlayer";

	public static createInstance():UI_HeadPlayer {
		return <UI_HeadPlayer>(fgui.UIPackage.createObject("base","HeadPlayer"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_bg = <fgui.GLoader>(self.getChild("img_bg"));
		self.headComp = <UI_UserDiyHeadIcon>(self.getChild("headComp"));
		self.img_frame = <fgui.GLoader>(self.getChild("img_frame"));
		self.comp_vip = <UI_CompVipDesc>(self.getChild("comp_vip"));
		super.onConstruct();
	}
}