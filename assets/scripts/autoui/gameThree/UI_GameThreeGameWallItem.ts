/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_GameThreeMc from "./UI_GameThreeMc";

import * as fgui from "fairygui-cc";
export default class UI_GameThreeGameWallItem extends fgui.GComponent {

	public ctrl_ren:fgui.Controller;
	public img_wall:fgui.GLoader;
	public comp_mc:UI_GameThreeMc;
	public mc_temp:fgui.GLoader;
	public t1:fgui.Transition;

	public static URL:string = "ui://xtdgeoappextu";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeGameWallItem";

	public static createInstance():UI_GameThreeGameWallItem {
		return <UI_GameThreeGameWallItem>(fgui.UIPackage.createObject("gameThree","GameThreeGameWallItem"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_ren = self.getController("ctrl_ren");
		self.img_wall = <fgui.GLoader>(self.getChild("img_wall"));
		self.comp_mc = <UI_GameThreeMc>(self.getChild("comp_mc"));
		self.mc_temp = <fgui.GLoader>(self.getChild("mc_temp"));
		self.t1 = self.getTransition("t1");
		super.onConstruct();
	}
}