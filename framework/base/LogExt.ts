import { SingleClass } from "./SingleClass";

declare global {
    interface IModuleMap {
        Logger: typeof LogExt;
    }
}
export class LogExt extends SingleClass {
    isOpen: boolean;
    init(isOpen: boolean) {
        let itself = this;
        itself.isOpen = isOpen;

    }
    static log(...data: any[]) {
        console.log(data);
    }
    static warn(...data: any[]) {
        console.warn(data);
    }
    static error(...data: any[]) {
        console.error(data);
    }
}