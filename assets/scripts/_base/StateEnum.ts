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
    Lable,
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
}
/** 属性名 */
export const ConstPropName = {
    /** 不选择 */
    [EnumPropName.Non]: "Non ",
    /** 显示隐藏 */
    [EnumPropName.Active]: "Active",
    /** 位置 */
    [EnumPropName.Position]: "Position",
    /** 文本 */
    [EnumPropName.Lable]: "Lable",
    /** 图片 */
    [EnumPropName.SpriteFrame]: "SpriteFrame",
    /** 旋转、四元数*/
    // [EnumPropName.Rotation]: "Rotation",
    /** 旋转、欧拉角 */
    [EnumPropName.Euler]: "Euler",
    /** 缩放 */
    [EnumPropName.Scale]: "Scale",
    /** 锚点 */
    [EnumPropName.Anchor]: "Anchor",
    /** 宽高 */
    [EnumPropName.Size]: "Size",
    /** 颜色 */
    [EnumPropName.Color]: "Color",
    /** 透明度 */
    [EnumPropName.Opacity]: "Opacity"
}