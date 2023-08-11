import * as _path from "path";
/** 
 * 项目路径配置
 *  
 */

/** 项目路径 */
export const RootDir = _path.join(__dirname);
/** 项目设置路径 */
export const SettingDir = _path.join(RootDir, ".setting");
/** 预制体模块路径 */
export const PrefabModuleDir = _path.join(RootDir, "assets/prefab");
/** 代码模块路径 */
export const ScriptModuleDir = _path.join(RootDir, "assets/scripts/src");