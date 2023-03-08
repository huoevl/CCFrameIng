

import { GameThreeColorType } from "./GameThreeConst";

export class GameThreeUtil {

    /** 获取三色墙mc */
    static getWallMcId(type: GameThreeColorType, isOpen?: boolean) {
        let mcId;
        switch (type) {
            case GameThreeColorType.one: {
                if (isOpen) {
                    mcId = 1;
                } else {
                    mcId = 2;
                }
            } break;
            case GameThreeColorType.two: {
                if (isOpen) {
                    mcId = 1;
                } else {
                    mcId = 2;
                }
            } break;
            case GameThreeColorType.three: {
                if (isOpen) {
                    mcId = 1;
                } else {
                    mcId = 1;
                }
            } break;
            case GameThreeColorType.four: {
                if (isOpen) {
                    mcId = 2;
                } else {
                    mcId = 3;
                }
            } break;
            case GameThreeColorType.five: {
                if (isOpen) {
                    mcId = 5;
                } else {
                    mcId = 3;
                }
            } break;
        }
        return mcId;
    }
    /** 获取三色池 */
    static getPollUrl(type: GameThreeColorType) {
        return type;
    }
    /** 获取角色 */
    static getUserUrl(type: GameThreeColorType) {
        return type;
    }
    /** 数字转中文 */
    static getTxtByNum(num: number) {
        let self = this;
        // let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        let chnNumChar = self.getNumChar();
        if (num == 0) {
            return chnNumChar[0];
        }
        /** 正负数 */
        // let symbol = num < 0 ? "负" : "";
        let symbol = "";
        /** 单位 */
        // let unit = ["", "十", "百", "千", "万"];
        let unit = self.getUnit();
        let str = String(num);
        /** 位数 */
        let len = str.length;
        let strIns = '', chnStr = '';
        let unitPos = 0;
        let zero = true;
        while (num > 0) {
            let one = num % 10;
            if (one === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[one] + chnStr;
                }
            } else {
                zero = false;
                strIns = chnNumChar[one] as string;
                //一十一 ==> 十一；一百十一 ==> 一百一十一
                if (len == 2 && strIns == '一' && unit[unitPos] == '十') {
                    strIns = '';
                }
                strIns += unit[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            num = Math.floor(num / 10);
        }
        return symbol + chnStr;
    }
    private static getNumChar() {
        let txt0 = "零";//后续需要自行加表
        let txt1 = 5;
        let txt2 = 5;
        let txt3 = 5;
        let txt4 = 5;
        let txt5 = 5;
        let txt6 = 5;
        let txt7 = 5;
        let txt8 = 5;
        let txt9 = 5;
        return [txt0, txt1, txt2, txt3, txt4, txt5, txt6, txt7, txt8, txt9];
    }
    private static getUnit() {
        let txt0 = "十";
        let txt1 = "百";
        let txt2 = "千";
        let txt3 = "万";
        return ["", txt0, txt1, txt2, txt3];
    }
}
