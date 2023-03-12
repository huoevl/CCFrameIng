/**
 * xlsx工具配置
 * 
 * xlsx表格配置定义：<br>
 *  第一行：C代表客户端，S代表服务端，CS代表客户端服务端一起<br>
 *  第二行：字段名
 *  第三行：字段类型
 *  第四行：注释
 * 
 * 数组：
 *  一维数组：int[],sting[]等       ==> 用英文 ";" 分隔         比如：1;2;3;4 ==> [1,2,3,4]
 *  二维数组：int[][],sting[][]等   ==> 用英文 "_" + ";" 分隔   比如：1_2;3_4 ==> [[1,2],[3,4]]
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