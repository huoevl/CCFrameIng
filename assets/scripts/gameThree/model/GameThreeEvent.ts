export const enum Event_GameThree {
    /** 反馈三色绫罗数据 */
    HomeInfo = 1,
    /** 游戏界面信息 */
    GameInfo = 2,
    /** 反馈使用道具 param: 结果, itemId */
    UserItem = 3,
    /** 反馈通过障碍 */
    PassWall = 4,
    /** 返回游戏结束 */
    GameOver = 5,
    /** 反馈分享成功继续游戏 */
    ShareBack = 6,
    /** 反馈周榜 */
    RankInfo = 7,
    /** 反馈下一目标积分 */
    NextTargetLv = 8,
    /** 开始游戏 */
    StartGame = 100,
    /** 停止游戏 */
    StopGame = 101,
    /** 加分 */
    AddScore = 102,
    /** 复活 */
    Recover = 103,
    /** 进入游戏界面 */
    EnterGame = 104,
    /** 开始倒计时 */
    StartDownTime = 105,
    /** 设置颜色 param: index*/
    SetDiColor = 106,

    /** 游戏结算弹窗关闭 */
    OverDlgClose = 200,
}