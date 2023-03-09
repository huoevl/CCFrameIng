import _path from "path";
import _xlsx from "xlsx";
import _fse from "fs-extra";
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
        let bastPath = _path.join(__dirname, "../");
        let dir = _path.join(bastPath, "xlsx");
        let dirlist = FileUitls.getDirList(dir);
        logger.info(dirlist)
        for (let index = 0, len = dirlist.length; index < len; index++) {
            let name = dirlist[index];
            let suffix = _path.extname(name);
            if (suffix != ".xlsx") {
                logger.info("不是：", name)
                continue;
            }
            if (!name.match(/^[a-zA-Z0-9]+/)) {
                logger.info("不是：", name)
                continue;
            }
            let filePath = _path.join(dir, dirlist[index]);
            itself.readXlsx(filePath);
        }
        //写入

    }

    /**
     * 读xlsx文件
     * @param src 
     */
    readXlsx(src: string) {
        let itself = this;
        let data = _xlsx.readFile(src);
        let sheetNames = data.SheetNames || [];
        for (let index = 0, len = sheetNames.length; index < len; index++) {
            let sheetJson = data.Sheets[sheetNames[index]];

        }
        let xlsxName = itself.getXlsxName(src);
        _fse.outputJsonSync(_path.join(__dirname, "../", "xlsx", xlsxName + ".json"), data);
    }
    /**
     * 获取xlsx文件名
     * @param src 
     */
    private getXlsxName(src: string) {
        let xlsxName = _path.basename(src);
        let matchName = xlsxName.match(/[a-zA-Z0-9]+/) || [];
        let name = matchName[0] || "";
        return name;
    }
}
new CmdXlsx().exec();