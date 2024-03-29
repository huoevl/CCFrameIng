/**
 * xlsx工具配置
 * 
 * xlsx表格配置定义：<br>
 *  第一行：C代表客户端，S代表服务端，CS代表客户端服务端一起<br>
 *  第二行：注释
 *  第三行：字段名
 *  第四行：字段类型
 * 
 */
export const configBase = {
    /** 主要数据配置页切，xlsx左下角名字 */
    languageMain: "zhCN",
    /** 多语言页切 ["zhGT","kr"] */
    language: [],
    /** 转表类型：看TransType */
    tansType: TransType.AllTest,
    /** 数值转换类型 */
    valueTansType: ValueTransType.source,

    /** xlsx表格路径 */
    xlsxPath: "../xlsx",
    /** lua输出路径 */
    luaPath: "../auto/lua",
    /** json输出路径 */
    jsonPath: "../auto/json",

    //客户端相关
    /** CfgNameInfo1输出路径 */
    cfgNameInfo1Path: "../auto",
    /** InitConfig输出路径 */
    initConfigPath: "../auto",
    /** GlobalCOnfig输出路径 */
    globalConfigPath: "../auto",
    /** vo输出路径 */
    voPath: "../auto/config/vo",
    /** config类输出路径 */
    configClassPath: "../auto/config/clazz",
}

/** 前几行的类型，后面数字代表行数 */
export enum RowType {
    /** 客户端还是服务端：c,s,cs。不知道就全配cs。必配，用来遍历列数 */
    COrS = 1,
    /** 注释说明 */
    comment,
    /** 字段名 */
    field,
    /** 字段类型，以下为基础类型，数组后面加[]，几维数组就加几个：[]。
     * int：整数（lua不支持小数混合）,
     * float：小数
     * string：字符串,
     * localstring：也是字符串，处理多语言，一般是中文需要
     * map：对象类型：{key:value}，也可以是其他JSON.parse能解析的obj
     * 
     */
    fieldType,
    /** lua数组自定义字段行，有这个功能就填对应的行，没有填0 */
    luaArr,
    /** 数据开始行 */
    data,
}

export const enum ValueTransType {
    /** 原始数据：数据该是怎么样就怎么样
     * [1,2]或者[[1,2],[2,3]]
     * ["字符串","字符串"]
     * {"key":value|"value"}
     */
    source = 1,
    /** 定义格式
     *  * 数组：
        *  一维数组：int[],sting[]等           ==> 用英文 "|" 分隔         比如：1|2|3|4 ==> [1,2,3,4]
        *  二维数组：int[][],sting[][]等       ==> 用英文 "| ;" 分隔       比如：1|2;3|4 ==> [[1,2],[3,4]]
        *  三维数组：int[][][],sting[][][]等   ==> 用英文 "| ; :" 分隔     比如： 101|10;102|20:201|10;202|20 ==> [[[101,10],[102,20]],[[201,10],[202,20]]]
     */
    cust = 2,
}
/** 转表类型*/
export const enum TransType {
    //以下做互斥类型辨别 2的n次方
    /** 客户端json数据 */
    clientData = 1,
    /** 服务端lua数据 */
    severData = 2,
    /** 客户端提示ts文件 */
    clientTs = 4,

    //以下做合并类型 上面相加
    /** 客户端+服务端数据 */
    csData = 3,
    /** 客户端数据+提示文件 */
    clientAll = 5,
    /** 全部 */
    AllTest = 7,
}

/** excel安全数字范围 */
export const maxNum = 999999999999999;