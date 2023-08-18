/** 用户代码组件 */
export const ConfigCustComp = "CustComp";
/** 节点命名规则配置： */
export const ConfigRole = {
    //cc预留组件
    node_: "Node",
    label_: "Label",
    rich_: "RichText",
    img_: "Sprite",
    btn_: "Button",
    edit_: "EditBox",
    pro_: "ProgressBar",
    graph_: "Graphics",
    tog_: "Togggle",
    togC_: "ToggleContainer",
    slider_: "Slider",
    scroll_: "ScrollView",
    layout_: "Layout",
    //用户代码组件
    list_: "CustComp",
    comp_: "CustComp",
    //子节点生成用户组件：如item_TestUI ---> UI_TestUI.ts
    item_: "AutoComp",
}
/** 跳过的组件 */
export enum ConfigBreakComp {
    StateController = 1,
    StateSelect = 2,
}
