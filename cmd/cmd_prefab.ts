const fse: typeof import("fs-extra") = require("fs-extra");
const path: typeof import("path") = require("path");

interface ICfg {
    /** prefab路径 */
    ui_path: string;

}

class cmd_prefab {
    /** 配置 */
    cfg = {} as ICfg;
    constructor() {
        let itself = this;
        let cfg = itself.cfg;
        cfg.ui_path = path.join(__dirname, "../assets/ui");
        itself.execute();
    }
    async execute() {
        let itself = this;
        itself.parsePrefab();
    }

    /** 读取 */
    parsePrefab() {
        let itself = this;
        let ui_path = itself.cfg.ui_path;
        let dirArr = fse.readdirSync(ui_path);
        for (let index = 0, len = dirArr.length; index < len; index++) {
            let module_dir = path.join(ui_path, dirArr[index]);
            if (fse.statSync(module_dir).isDirectory()) {
                let files = fse.readdirSync(module_dir);
                for (let indexPrf = 0, len = files.length; indexPrf < len; indexPrf++) {
                    let filename = files[indexPrf];
                    /** 后缀 */
                    let houzui = path.extname(filename);
                    let file_path = path.join(module_dir, filename);
                    if (houzui == ".prefab") {
                        let json = fse.readFileSync(file_path, { encoding: "utf-8" });
                        console.log(json)
                        let jsonObj = JSON.parse(json);
                        console.log(jsonObj);
                    } else if (houzui == ".ts") {
                        fse.unlinkSync(file_path);
                    }

                }
            }
            // let filename=fse.
        }
    }
    /** 写入 */
    wirteToFile() {

    }
}
new cmd_prefab()
