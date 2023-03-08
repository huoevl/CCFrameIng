/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeGameOver extends fgui.GComponent {

	public ctrl_newScore:fgui.Controller;
	public ctrl_newRank:fgui.Controller;
	public ctrl_target:fgui.Controller;
	public label_score:fgui.GTextField;
	public btn_confirm:fgui.GButton;
	public label_history:fgui.GTextField;
	public label_rank:fgui.GTextField;
	public label_target:fgui.GTextField;
	public list_item:fgui.GList;
	public label_rank1:fgui.GTextField;

	public static URL:string = "ui://xtdgeoaplsv6z";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeGameOver";

	public static createInstance():UI_GameThreeGameOver {
		return <UI_GameThreeGameOver>(fgui.UIPackage.createObject("gameThree","GameThreeGameOver"));
	}

	protected onConstruct(): void {
		let self = this;
		self.ctrl_newScore = self.getController("ctrl_newScore");
		self.ctrl_newRank = self.getController("ctrl_newRank");
		self.ctrl_target = self.getController("ctrl_target");
		self.label_score = <fgui.GTextField>(self.getChild("label_score"));
		self.btn_confirm = <fgui.GButton>(self.getChild("btn_confirm"));
		self.label_history = <fgui.GTextField>(self.getChild("label_history"));
		self.label_rank = <fgui.GTextField>(self.getChild("label_rank"));
		self.label_target = <fgui.GTextField>(self.getChild("label_target"));
		self.list_item = <fgui.GList>(self.getChild("list_item"));
		self.label_rank1 = <fgui.GTextField>(self.getChild("label_rank1"));
		super.onConstruct();
	}
}