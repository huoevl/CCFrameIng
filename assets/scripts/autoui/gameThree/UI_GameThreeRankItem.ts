/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeRankItem extends fgui.GComponent {

	public ctrl_rank:fgui.Controller;
	public label_name:fgui.GTextField;
	public label_value:fgui.GTextField;
	public label_rank:fgui.GTextField;

	public static URL:string = "ui://xtdgeoaplsv618";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeRankItem";

	public static createInstance():UI_GameThreeRankItem {
		return <UI_GameThreeRankItem>(fgui.UIPackage.createObject("gameThree","GameThreeRankItem"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_rank = self.getController("ctrl_rank");
		self.label_name = <fgui.GTextField>(self.getChild("label_name"));
		self.label_value = <fgui.GTextField>(self.getChild("label_value"));
		self.label_rank = <fgui.GTextField>(self.getChild("label_rank"));
		super.onConstruct();
	}
}