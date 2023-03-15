import { Test } from "./config/clazz/Test";
export class CONFIG {
	/** -测试表 */
	public static get Test(): Test {
	return GAME.CfgMgr.getConfig<Test>(CfgConst.CfgName.Test);
	}
}