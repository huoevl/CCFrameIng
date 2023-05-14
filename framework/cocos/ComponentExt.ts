

//组件扩展

declare module "cc" {
    interface Component {
        /** 相对路径 */
        URL: string;
        /** 包名/文件夹名/模块名 */
        PKG: string;
        /** 类名 */
        NAME: string;
    }
}

