/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_GameThreeMc from "./UI_GameThreeMc";

import * as fgui from "fairygui-cc";
export default class UI_GameThreeGameUser extends fgui.GComponent {

	public ctrl_double:fgui.Controller;
	public ctrl_run:fgui.Controller;
	public ctrl_ren:fgui.Controller;
	public img_user:fgui.GLoader;
	public mc_bulingbuling:UI_GameThreeMc;
	public mc_jujujuju:fgui.GLoader;
	public mc_water:fgui.GLoader;
	public t0:fgui.Transition;
	public t1:fgui.Transition;
	public doubleShow:fgui.Transition;
	public doubleBlBl:fgui.Transition;

	public static URL:string = "ui://xtdgeoapvwyip";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeGameUser";

	public static createInstance():UI_GameThreeGameUser {
		return <UI_GameThreeGameUser>(fgui.UIPackage.createObject("gameThree","GameThreeGameUser"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_double = self.getController("ctrl_double");
		self.ctrl_run = self.getController("ctrl_run");
		self.ctrl_ren = self.getController("ctrl_ren");
		self.img_user = <fgui.GLoader>(self.getChild("img_user"));
		self.mc_bulingbuling = <UI_GameThreeMc>(self.getChild("mc_bulingbuling"));
		self.mc_jujujuju = <fgui.GLoader>(self.getChild("mc_jujujuju"));
		self.mc_water = <fgui.GLoader>(self.getChild("mc_water"));
		self.t0 = self.getTransition("t0");
		self.t1 = self.getTransition("t1");
		self.doubleShow = self.getTransition("doubleShow");
		self.doubleBlBl = self.getTransition("doubleBlBl");
		super.onConstruct();
	}
}