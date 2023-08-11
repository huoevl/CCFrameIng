import * as _path from "path";
import * as ConfigGlobal from "../../ConfigGlobal";
import * as _fileUtils from "../base/FileUtils";
import { logger } from "../base/Logger";

/**
 * 从预制体生成代码模板，
 */
export class CmdPrefab {
    /** uuid对应的预制体路径 */
    private uuidToPathDic: { [uuid: string]: string };
    /** 文件id对应的类名 */
    private fileIdToClassDic: { [fileId: string]: string };
    /** 文件id对应的路径 */
    private fileIdToPathDic: { [fileId: string]: string };
    /** 类名对应的路径 */
    private clazzToPathDic: { [clazz: string]: string };
    /** 当前模块 */
    private currModule: string;

    exec(moduleName: string, fileName?: string) {
        let itself = this;
        itself.parsePrefabPath();
        itself.parseCalssName();
        if (typeof moduleName == "string") {

        } else {
            logger.error("使用方法：npm run prefab -- -n 模块名 [-f 文件名]");
        }
    }
    /** 解析预制体 */
    private parsePrefabPath() {
        let itself = this;
        let filePath = _path.join(ConfigGlobal.RootDir, "library/.assets-info.json");
        let jsonData = _fileUtils.readJsonSync(filePath);
        for (let prefab in jsonData) {
            if (_path.extname(prefab) != ".prefab") {
                continue;
            }
            itself.uuidToPathDic[jsonData[prefab].uuid] = prefab;
        }
    }
    private parseCalssName() {
        let itself = this;
        let temp = "temp/programming/packer-driver/targets/editor";
        let filePath = _path.join(ConfigGlobal.RootDir, temp, "import-map.json");
        let jsonData = _fileUtils.readJsonSync(filePath).imports;
        for (let tsFile in jsonData) {
            if (_path.extname(tsFile) != ".ts") {
                continue;
            }
            let jsFile = _path.join(ConfigGlobal.RootDir, temp, jsonData[tsFile]);
            let jsFileData = _fileUtils.readFileSync(jsFile, { encoding: "utf-8" });
            let matchStr = jsFileData.match(/_cclegacy\._RF\.push.*\);/g);
            if (!matchStr) {
                continue;
            }
            for (let str of matchStr) {
                let arr = str.replace(/'/g, "").replace(/ /g, "").replace(/"/g, "").split(",");
                itself.fileIdToClassDic[arr[1]] = arr[2];
                let tsPath = itself.fileIdToPathDic[arr[1]] = tsFile.slice(8);
                itself.clazzToPathDic[arr[2]] = tsPath;
            }
        }
    }
}
new CmdPrefab()
