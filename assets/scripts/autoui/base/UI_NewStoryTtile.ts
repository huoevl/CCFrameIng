/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


import * as fgui from "fairygui-cc";
export default class UI_NewStoryTtile extends fgui.GComponent {

	public mc_eff1:fgui.GLoader;
	public mc_eff2:fgui.GLoader;
	public mc_eff3:fgui.GLoader;
	public mc_eff4:fgui.GLoader;
	public img_di:fgui.GLoader;
	public img_title:fgui.GLoader;
	public ani:fgui.Transition;

	public static URL:string = "ui://0463csswklf2mk559";
	public static PKG:string = "base";
	public static CLS_NAME:string = "UI_NewStoryTtile";

	public static createInstance():UI_NewStoryTtile {
		return <UI_NewStoryTtile>(fgui.UIPackage.createObject("base","NewStoryTtile"));
	}

	protected onConstruct(): void {
		let self = this;
		self.mc_eff1 = <fgui.GLoader>(self.getChild("mc_eff1"));
		self.mc_eff2 = <fgui.GLoader>(self.getChild("mc_eff2"));
		self.mc_eff3 = <fgui.GLoader>(self.getChild("mc_eff3"));
		self.mc_eff4 = <fgui.GLoader>(self.getChild("mc_eff4"));
		self.img_di = <fgui.GLoader>(self.getChild("img_di"));
		self.img_title = <fgui.GLoader>(self.getChild("img_title"));
		self.ani = self.getTransition("ani");
		super.onConstruct();
	}
}