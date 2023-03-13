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
 *  一维数组：int[],sting[]等       ==> 用英文 "|" 分隔         比如：1|2|3|4 ==> [1,2,3,4]
 *  二维数组：int[][],sting[][]等   ==> 用英文 "|" + ";" 分隔   比如：1|2;3|4 ==> [[1,2],[3,4]]
 */
export const config_xlsx = {
    /** 主要数据配置页切，xlsx左下角名字 */
    languageMain: "zhCN",
    /** 多语言页切 ["zhGT","kr"] */
    language: [],
    /** 转表类型：看TransType */
    tansType: TransType.clientData,

    //客户端相关

}
/** 转表类型*/
export const enum TransType {
    //以下做互斥类型辨别 2的n次方
    /** 客户端数据 */
    clientData = 1,
    /** 服务端数据 */
    severData = 2,
    /** 客户端提示ts文件 */
    clientTs = 4,

    //以下做合并类型 上面相加
    /** 客户端+服务端数据 */
    csData = 3,
    /** 客户端数据+提示文件 */
    clientAll = 5,
}