import * as fileUtils from "../base/FileUtils";
import { logger } from "../base/Logger";

let p1 = "D:\\github\\project\\a\\assets\\scripts\\autoui\\gameThree"
let p2 = "D:\\github\\project\\CCFrameIng\\assets\\scripts\\autoui\\gameThree\\gameThreeBinder.ts";
logger.info(fileUtils.getRelativePath(p1, p2));