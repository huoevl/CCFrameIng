import { SingleClass } from "./SingleClass";

declare global {
    interface IModuleMap {
        Date: typeof DataExt;
    }
}
export class DataExt extends SingleClass {

}