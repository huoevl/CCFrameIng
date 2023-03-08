



/** 游戏数据 */
interface IPondData {
    /** 背景颜色 */
    pondColor?: number;
    /** 墙颜色 */
    wallColor?: number[];
}
declare global {
    interface IFacadeModuleMap {
        gameThreeModel: GameThreeModel;
    }
}
export class GameThreeModel {
    static CLS_NAME: string = "gameThreeModel";
    /** 主界面数据 */
    homeInfo = {};
    /** 游戏界面信息 */
    gameData = {};
    /** 通过墙返回的下一组数据 */
    nextGameInfo = {};
    /** 游戏结束数据 */
    gameOverInfo = {};
    /** 排行数据 */
    rankInfo = {};
    /** 是否进入过三色小游戏 */
    enterThreeGame: boolean = false;
}