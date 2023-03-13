
import * as _fse from "fs-extra";
import { logger } from "./Logger";
import * as _jsonToLua from "json_to_lua";
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
/**
 * 把obj转lua写入文件
 * @param src 文件路径
 * @param jsonData obj数据
 */
export function outputJsonToLuaSync(src: string, jsonData: object) {
    let content = _jsonToLua.jsObjectToLuaPretty(jsonData, 1);
    content = `local t =${content}\nreturn t`;
    content = content.replace(/"__nil__"/g, "nil");
    _fse.outputFileSync(src, content);
}