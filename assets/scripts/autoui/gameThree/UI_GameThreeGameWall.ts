/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_GameThreeGameWallItem from "./UI_GameThreeGameWallItem";

import * as fgui from "fairygui-cc";
export default class UI_GameThreeGameWall extends fgui.GComponent {

	public img_wall_0:UI_GameThreeGameWallItem;
	public img_wall_1:UI_GameThreeGameWallItem;
	public img_wall_2:UI_GameThreeGameWallItem;

	public static URL:string = "ui://xtdgeoapgm4li";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeGameWall";

	public static createInstance():UI_GameThreeGameWall {
		return <UI_GameThreeGameWall>(fgui.UIPackage.createObject("gameThree","GameThreeGameWall"));
	}

	protected onConstruct(): void {
		let self = this;
		self.img_wall_0 = <UI_GameThreeGameWallItem>(self.getChild("img_wall_0"));
		self.img_wall_1 = <UI_GameThreeGameWallItem>(self.getChild("img_wall_1"));
		self.img_wall_2 = <UI_GameThreeGameWallItem>(self.getChild("img_wall_2"));
		super.onConstruct();
	}
}