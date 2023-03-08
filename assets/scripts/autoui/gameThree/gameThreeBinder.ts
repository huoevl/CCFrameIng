/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_GameThreeHome from "./UI_GameThreeHome";
import UI_GameThreeGame from "./UI_GameThreeGame";
import UI_GameThreeGameDi from "./UI_GameThreeGameDi";
import UI_GameThreeGameWall from "./UI_GameThreeGameWall";
import UI_GameThreeGameBox from "./UI_GameThreeGameBox";
import UI_GameThreeGameItem from "./UI_GameThreeGameItem";
import UI_GameThreeMc from "./UI_GameThreeMc";
import UI_GameThreeRank from "./UI_GameThreeRank";
import UI_GameThreeRankItem from "./UI_GameThreeRankItem";
import UI_GameThreeExplain from "./UI_GameThreeExplain";
import UI_GameThreeBuyItem from "./UI_GameThreeBuyItem";
import UI_GameThreeBuy from "./UI_GameThreeBuy";
import UI_GameThreeGameOver from "./UI_GameThreeGameOver";
import UI_GameThreeGameWallItem from "./UI_GameThreeGameWallItem";
import UI_GameThreeBuyLife from "./UI_GameThreeBuyLife";
import UI_GameThreeShare from "./UI_GameThreeShare";
import UI_GameThreeGameUser from "./UI_GameThreeGameUser";
import UI_GameThreeAward from "./UI_GameThreeAward";
import UI_GameThreeAwardItem from "./UI_GameThreeAwardItem";
import UI_GameThreeGameStop from "./UI_GameThreeGameStop";

import * as fgui from "fairygui-cc";
export class gameThreeBinder {

	constructor(){
		let self = this;
		self.bindAll();
	}

	private bindAll():void {
		let self = this;

		fgui.UIObjectFactory.setExtension(UI_GameThreeHome.URL, UI_GameThreeHome);
		fgui.UIObjectFactory.setExtension(UI_GameThreeGame.URL, UI_GameThreeGame);
		fgui.UIObjectFactory.setExtension(UI_GameThreeGameDi.URL, UI_GameThreeGameDi);
		fgui.UIObjectFactory.setExtension(UI_GameThreeGameWall.URL, UI_GameThreeGameWall);
		fgui.UIObjectFactory.setExtension(UI_GameThreeGameBox.URL, UI_GameThreeGameBox);
		fgui.UIObjectFactory.setExtension(UI_GameThreeGameItem.URL, UI_GameThreeGameItem);
		fgui.UIObjectFactory.setExtension(UI_GameThreeMc.URL, UI_GameThreeMc);
		fgui.UIObjectFactory.setExtension(UI_GameThreeRank.URL, UI_GameThreeRank);
		fgui.UIObjectFactory.setExtension(UI_GameThreeRankItem.URL, UI_GameThreeRankItem);
		fgui.UIObjectFactory.setExtension(UI_GameThreeExplain.URL, UI_GameThreeExplain);
		fgui.UIObjectFactory.setExtension(UI_GameThreeBuyItem.URL, UI_GameThreeBuyItem);
		fgui.UIObjectFactory.setExtension(UI_GameThreeBuy.URL, UI_GameThreeBuy);
		fgui.UIObjectFactory.setExtension(UI_GameThreeGameOver.URL, UI_GameThreeGameOver);
		fgui.UIObjectFactory.setExtension(UI_GameThreeGameWallItem.URL, UI_GameThreeGameWallItem);
		fgui.UIObjectFactory.setExtension(UI_GameThreeBuyLife.URL, UI_GameThreeBuyLife);
		fgui.UIObjectFactory.setExtension(UI_GameThreeShare.URL, UI_GameThreeShare);
		fgui.UIObjectFactory.setExtension(UI_GameThreeGameUser.URL, UI_GameThreeGameUser);
		fgui.UIObjectFactory.setExtension(UI_GameThreeAward.URL, UI_GameThreeAward);
		fgui.UIObjectFactory.setExtension(UI_GameThreeAwardItem.URL, UI_GameThreeAwardItem);
		fgui.UIObjectFactory.setExtension(UI_GameThreeGameStop.URL, UI_GameThreeGameStop);

		if(!self['bindExt']) console.error('未实现bindExt');
		self['bindExt']();
	}
}