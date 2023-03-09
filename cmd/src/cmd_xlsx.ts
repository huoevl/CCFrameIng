import _path from "path";
import { FileUitls } from "../base/FileUtils";
import { logger } from "../base/Logger";

export class CmdXlsx {
    /** json数据 */
    private _jsonData = {};
    /** lua数据 */
    private _luaData = {};
    /** 执行函数 */
    exec() {
        let itself = this;
        let dir = _path.join(__dirname, "../", "xlsx");
        let dirlist = FileUitls.getDirList(dir);
        logger.info(dirlist)

    }

    /**
     * 读xlsx文件
     * @param file 
     */
    readXlsx(file: string) {
        let itself = this;

    }
}
new CmdXlsx().exec();