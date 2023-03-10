/**
 * xlsx工具配置
 * 
 * xlsx表格配置定义：
 *  第一行：C代表客户端，S代表服务端，CS代表客户端服务端一起
 *  第二行：字段名
 *  第三行：字段类型
 *  第四行：注释
 */
export const config_xlsx = {
    /** 多语言 */
    lang: ["zhCN"],
    /** 是否生成.ts文件 */
    isOutTs: true,
    /** 转表类型 ，1：客户端，2：服务端，3都转*/
    tansType: TransType.C,
}
/** 转表类型 1：客户端，2：服务端，3都转*/
export const enum TransType {
    C = 1,
    S = 2,
    CS = 3,
}