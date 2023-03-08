/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_GameThreeRank extends fgui.GComponent {

	public com_frame:fgui.GComponent;
	public label_rank:fgui.GTextField;
	public label_name:fgui.GTextField;
	public label_score:fgui.GTextField;
	public list_rank:fgui.GList;

	public static URL:string = "ui://xtdgeoaplsv616";
	public static PKG:string = "gameThree";
	public static CLS_NAME:string = "UI_GameThreeRank";

	public static createInstance():UI_GameThreeRank {
		return <UI_GameThreeRank>(fgui.UIPackage.createObject("gameThree","GameThreeRank"));
	}

	protected onConstruct(): void {
		let self = this;
		self.com_frame = <fgui.GComponent>(self.getChild("com_frame"));
		self.label_rank = <fgui.GTextField>(self.getChild("label_rank"));
		self.label_name = <fgui.GTextField>(self.getChild("label_name"));
		self.label_score = <fgui.GTextField>(self.getChild("label_score"));
		self.list_rank = <fgui.GList>(self.getChild("list_rank"));
		super.onConstruct();
	}
}