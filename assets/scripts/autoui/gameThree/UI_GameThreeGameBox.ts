/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_GameThreeGameUser from "./UI_GameThreeGameUser";

import * as fgui from "fairygui-cc";
export default class UI_GameThreeGameBox extends fgui.GComponent {

	public ctrl_down:fgui.Controller;
	public game_di:fgui.GComponent;
	public label_score:fgui.GTextField;
	public comp_user:UI_GameThreeGameUser;
	public game_wall:fgui.GComponent;
	public mc_temp:fgui.GLoader;
	public img_down:fgui.GLoader;
	public btn_stage:fgui.GGraph;
	public t0:fgui.Transition;
	public t1:fgui.Transition;

	public static URL:string = "ui://xtdgeoapgm4lm";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeGameBox";

	public static createInstance():UI_GameThreeGameBox {
		return <UI_GameThreeGameBox>(fgui.UIPackage.createObject("gameThree","GameThreeGameBox"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_down = self.getController("ctrl_down");
		self.game_di = <fgui.GComponent>(self.getChild("game_di"));
		self.label_score = <fgui.GTextField>(self.getChild("label_score"));
		self.comp_user = <UI_GameThreeGameUser>(self.getChild("comp_user"));
		self.game_wall = <fgui.GComponent>(self.getChild("game_wall"));
		self.mc_temp = <fgui.GLoader>(self.getChild("mc_temp"));
		self.img_down = <fgui.GLoader>(self.getChild("img_down"));
		self.btn_stage = <fgui.GGraph>(self.getChild("btn_stage"));
		self.t0 = self.getTransition("t0");
		self.t1 = self.getTransition("t1");
		super.onConstruct();
	}
}