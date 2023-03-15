import { Test } from "./config/clazz/Test";
export class InitConfig {
	public constructor() {
		GAME.CfgMgr.register(CfgConst.CfgName.Test, Test);
	}
}