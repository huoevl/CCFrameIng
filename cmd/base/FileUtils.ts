
import * as _fse from "fs-extra";
import { logger } from "./Logger";
//继承模块
export * from "fs-extra";

/**
 * 是否文件夹
 * @param src 路径
 */
export function isDir(src: string) {
    if (!_fse.pathExistsSync(src)) {
        logger.error("不存在的路径", src)
        return false;
    }
    if (_fse.statSync(src).isDirectory()) {
        return true;
    }
    return false;
}
/**
 * 获取文件夹内容
 * @param src 
 */
export function getDirList(src: string) {
    if (this.isDir(src)) {
        return _fse.readdirSync(src);
    }
    return [];
}