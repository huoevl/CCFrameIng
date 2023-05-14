
export class SingleClass {
    private static instance: any;
    static getIns<T extends SingleClass>(data?: any): T {
        return this.instance ||= new this(data);
    }
    protected constructor(data?: any) {
        this.init(data);
    }
    /** 初始化 */
    protected init(data?: any) {

    }
}
