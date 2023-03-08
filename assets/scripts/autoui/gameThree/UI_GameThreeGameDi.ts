/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeGameDi extends fgui.GComponent {

	public img_free:fgui.GLoader;
	public img_di:fgui.GLoader;
	public t0:fgui.Transition;

	public static URL:string = "ui://xtdgeoapgm4lf";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeGameDi";

	public static createInstance():UI_GameThreeGameDi {
		return <UI_GameThreeGameDi>(fgui.UIPackage.createObject("gameThree","GameThreeGameDi"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_free = <fgui.GLoader>(self.getChild("img_free"));
		self.img_di = <fgui.GLoader>(self.getChild("img_di"));
		self.t0 = self.getTransition("t0");
		super.onConstruct();
	}
}