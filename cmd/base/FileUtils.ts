
import * as _fse from "fs-extra";
import { logger } from "./Logger";

export class FileUitls {
    /**
     * 是否文件夹
     * @param src 路径
     */
    static isDir(src: string) {
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
    static getDirList(src: string) {
        if (this.isDir(src)) {
            return _fse.readdirSync(src);
        }
        return [];
    }

    /**
     * 复制文件或目录。目录可以包含内容。
     * 
     * @param src 源文件路径  注意，如果src是一个目录，它将复制该目录中的所有内容，而不是整个目录本身。
     * @param dest 目标文件路径  请注意，如果src是文件，则dest不能是目录。
     * @param opt 参数
     *  overwrite ＜boolean＞：覆盖现有文件或目录，默认值为true。请注意，如果将此设置为false并且目标存在，则复制操作将自动失败。使用errorOnExist选项更改此行为。
     *  errorOnExist＜boolean＞：当overwrite为false且目标存在时，抛出错误。默认值为false。
     *  dereference＜boolean＞：解引用符号链接，默认值为false。dereference symlinks, default is false
     *  preserveTimestamps＜boolean＞：如果为true，将设置对原始源文件的最后修改和访问时间。如果为false，则时间戳行为取决于操作系统。默认值为false。
     *  filter＜Function＞：过滤复制的文件/目录。返回true复制，返回false忽略。
     */
    static copyFile(src: string, dest: string, opt?: _fse.CopyOptionsSync) {
        _fse.copySync(src, dest, opt);
    }


}