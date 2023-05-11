/** 状态名 */
export enum EnumStateName {
}

/** 更新选择器的类型 */
export enum EnumUpdataType {
    /** 名字 */
    name = 0,
    /** 可选状态 */
    selPage,
    /** 状态 */
    state,
    /** 删除控制器 */
    delete,
    /** 初始化 */
    init,
    /** 更新选中的属性 */
    prop,
}
/** 控制器名字 */
export enum EnumCtrlName {
}
/** 属性名 */
export enum EnumPropName {
    /** 不选择 */
    Non = 0,
    /** 显示隐藏 */
    Active,
    /** 位置 */
    Position,
    /** 文本 */
    Label,
    /** 描边 */
    LabelOutline,
    /** 图片 */
    SpriteFrame,
    // /** 旋转、四元数*/
    // Rotation,
    /** 旋转、欧拉角 */
    Euler,
    /** 缩放 */
    Scale,
    /** 锚点 */
    Anchor,
    /** 宽高 */
    Size,
    /** 颜色 */
    Color,
    /** 透明度 */
    Opacity,
    /** 灰度 */
    GrayScale,
    /** 字体 */
    Font,
}