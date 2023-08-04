var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//组件扩展
System.register("base/SingleClass", [], function (exports_1, context_1) {
    "use strict";
    var SingleClass;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            SingleClass = /** @class */ (function () {
                function SingleClass(data) {
                    this.init(data);
                }
                SingleClass.getIns = function (data) {
                    return this.instance || (this.instance = new this(data));
                };
                /** 初始化 */
                SingleClass.prototype.init = function (data) {
                };
                return SingleClass;
            }());
            exports_1("SingleClass", SingleClass);
        }
    };
});
//资源管理
System.register("cocos/ResManager", ["cc", "base/CCF", "base/SingleClass"], function (exports_2, context_2) {
    "use strict";
    var cc_1, CCF_1, SingleClass_1, ResManager;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (CCF_1_1) {
                CCF_1 = CCF_1_1;
            },
            function (SingleClass_1_1) {
                SingleClass_1 = SingleClass_1_1;
            }
        ],
        execute: function () {
            //资源管理
            ResManager = /** @class */ (function (_super) {
                __extends(ResManager, _super);
                function ResManager() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ResManager.prototype.init = function () {
                    var itself = this;
                    itself._bundle = {};
                };
                /**
                 * 加载包
                 * @param url
                 */
                ResManager.prototype.loadBundle = function (url, onComplete) {
                    var itself = this;
                    var opt = {};
                    cc_1.assetManager.loadBundle(url, opt, function (err, data) {
                        if (err) {
                            return CCF_1.ccf.Logger.error("加载包失败：", url);
                        }
                        if (onComplete) {
                            onComplete(data);
                        }
                        itself._bundle[itself.getBundleName(url)] = data;
                    });
                };
                /**
                 * 获取包
                 * @param name
                 * @returns
                 */
                ResManager.prototype.getBundle = function (name) {
                    var itself = this;
                    return itself._bundle[name];
                };
                /**
                 * 获取包名
                 * @param url
                 * @returns
                 */
                ResManager.prototype.getBundleName = function (url) {
                    var itself = this;
                    return url;
                };
                /**
                 * 加载远程资源
                 * @param url
                 * @param onComplete
                 */
                ResManager.prototype.loadRemote = function (url, onComplete) {
                    cc_1.assetManager.loadRemote(url, { cacheEnabled: true }, function (err, data) {
                        if (err) {
                            return CCF_1.ccf.Logger.error("加载远程资源失败：", url);
                        }
                        if (onComplete) {
                            onComplete(data);
                        }
                    });
                };
                /**
                 * 加载预制体
                 * @param url 相对路径
                 */
                ResManager.prototype.loadPrefab = function (url, onComplete) {
                    var itself = this;
                    var bundle = itself.getBundle(url);
                    var prefab = bundle.get(url, cc_1.Prefab);
                    if (!prefab) {
                        bundle.load(url, cc_1.Prefab, function (err, data) {
                            if (err) {
                                return CCF_1.ccf.Logger.error("加载预制体失败：", url);
                            }
                            if (onComplete) {
                                onComplete(data);
                            }
                        });
                    }
                    else {
                        if (onComplete) {
                            onComplete(prefab);
                        }
                    }
                };
                return ResManager;
            }(SingleClass_1.SingleClass));
            exports_2("ResManager", ResManager);
        }
    };
});
System.register("base/Const", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
// import { Component, Node } from "cc";
// <reference types="../@types/cc" />
System.register("cocos/UIManager", ["base/CCF", "base/SingleClass"], function (exports_4, context_4) {
    "use strict";
    var CCF_2, SingleClass_2, UIManager;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (CCF_2_1) {
                CCF_2 = CCF_2_1;
            },
            function (SingleClass_2_1) {
                SingleClass_2 = SingleClass_2_1;
            }
        ],
        execute: function () {// import { Component, Node } from "cc";
            // <reference types="../@types/cc" />
            UIManager = /** @class */ (function (_super) {
                __extends(UIManager, _super);
                function UIManager() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /** 界面名称对应的类 */
                    _this._uiNameToClass = {};
                    return _this;
                }
                /** 重置/初始化 */
                UIManager.prototype.init = function (root) {
                    var itself = this;
                    itself.root = root;
                    itself.reset();
                };
                /** 重置 */
                UIManager.prototype.reset = function () {
                    var itself = this;
                    if (itself._cache) {
                        for (var key in itself._cache) {
                            itself.close(itself._cache[key]);
                        }
                    }
                    itself._cache = {};
                };
                UIManager.prototype.register = function (clazz) {
                    var itself = this;
                    if (!clazz) {
                        return CCF_2.ccf.Logger.error("");
                    }
                    var uiName = clazz.NAME || CCF_2.ccf.Obj.getClassName(clazz);
                    if (!uiName) {
                        return CCF_2.ccf.Logger.error("不存在类名：", clazz);
                    }
                    if (itself._uiNameToClass[uiName]) {
                        return CCF_2.ccf.Logger.error("界面已注册：", uiName);
                    }
                    itself._uiNameToClass[uiName] = clazz;
                };
                /**
                 * 打开界面
                 * @param uiName 界面名
                 * @param dataOrCb 界面数据、回调，无序
                 */
                UIManager.prototype.open = function (uiName) {
                    var dataOrCb = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        dataOrCb[_i - 1] = arguments[_i];
                    }
                    var itself = this;
                    var clazz = itself._uiNameToClass[uiName];
                    if (!clazz) {
                        return CCF_2.ccf.Logger.error("未注册的界面：", uiName);
                    }
                    var callBack;
                    var uiData;
                    if (dataOrCb && dataOrCb.length) {
                        for (var index = 0, len = dataOrCb.length; index < len; index++) {
                            var temp = dataOrCb[index];
                            if (typeof temp == "function") {
                                callBack = temp;
                            }
                            else {
                                uiData = temp;
                            }
                        }
                    }
                    CCF_2.ccf.ResMgr.loadPrefab(clazz.URL, function (prefab) {
                        itself._open(uiName, uiData);
                        if (callBack) {
                            callBack();
                        }
                    });
                };
                UIManager.prototype._open = function (uiName, uiData) {
                    var itself = this;
                    //todo
                    if (itself._cache[uiName]) {
                    }
                };
                /**
                 * 关闭界面
                 * @param uiComp 界面名称
                 * @param force 是否强制
                 */
                UIManager.prototype.close = function (uiComp, force) {
                    //
                };
                /**
                 * 获取顶层的界面
                 * @param layer 层级类型
                 */
                UIManager.prototype.getTopUI = function (layer) {
                };
                /**
                 * 是否顶层
                 * @param layer 层级类型
                 * @param uiName 界面名
                 */
                UIManager.prototype.isOnTop = function (layer, uiName) {
                };
                return UIManager;
            }(SingleClass_2.SingleClass));
            exports_4("UIManager", UIManager);
        }
    };
});
System.register("cocos/UITool", [], function (exports_5, context_5) {
    "use strict";
    var UITool;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            UITool = /** @class */ (function () {
                function UITool() {
                }
                /** 界面组件绑定 */
                UITool.bindNode = function (comp) {
                    var compDefinde = comp["compDefinde"];
                    var bind = function (parent) {
                        var children = parent.children;
                        for (var index = 0, len = children.length; index < len; index++) {
                            var child = children[index];
                            var compType = compDefinde[child.name];
                            if (compType) {
                                comp[child.name] = child.getComponent(compType);
                            }
                            bind(child);
                        }
                    };
                    bind(comp.node);
                };
                return UITool;
            }());
            exports_5("UITool", UITool);
        }
    };
});
System.register("utils/ResUtil", [], function (exports_6, context_6) {
    "use strict";
    var ResUtil;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            ResUtil = /** @class */ (function () {
                function ResUtil() {
                }
                return ResUtil;
            }());
            exports_6("ResUtil", ResUtil);
        }
    };
});
System.register("base/LogExt", ["base/SingleClass"], function (exports_7, context_7) {
    "use strict";
    var SingleClass_3, LogExt;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (SingleClass_3_1) {
                SingleClass_3 = SingleClass_3_1;
            }
        ],
        execute: function () {
            LogExt = /** @class */ (function (_super) {
                __extends(LogExt, _super);
                function LogExt() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LogExt.prototype.init = function (isOpen) {
                    var itself = this;
                    itself.isOpen = isOpen;
                };
                LogExt.log = function () {
                    var data = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        data[_i] = arguments[_i];
                    }
                    console.log(data);
                };
                LogExt.warn = function () {
                    var data = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        data[_i] = arguments[_i];
                    }
                    console.warn(data);
                };
                LogExt.error = function () {
                    var data = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        data[_i] = arguments[_i];
                    }
                    console.error(data);
                };
                return LogExt;
            }(SingleClass_3.SingleClass));
            exports_7("LogExt", LogExt);
        }
    };
});
System.register("base/MathExt", [], function (exports_8, context_8) {
    "use strict";
    var MathExt;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
            MathExt = /** @class */ (function () {
                function MathExt() {
                }
                /** 两点获取角度 */
                MathExt.getAngle = function (x0, y0, x1, y1) {
                    var radian = this.getRadian(x0, y0, x1, y1);
                    return this.radianToAngle(radian);
                };
                /** 两点获取弧度 */
                MathExt.getRadian = function (x0, y0, x1, y1) {
                    var radian = Math.atan2((y1 - y0), (x1 - x0));
                    if (radian < 0) {
                        radian += Math.PI * 2;
                    }
                    return radian;
                };
                /** 两点获取距离 */
                MathExt.getDistance = function (x0, y0, x1, y1) {
                    var result = (x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1);
                    return Math.sqrt(result);
                };
                /**
                 * 通过线段、角度、计算分解的xy
                 * 坐标系中，y向下或向上为正，计算所得都一样
                 * @param line 边
                 * @param angle 角度
                 * @param isRadian 是否弧度
                 */
                MathExt.getXYByLine = function (line, angle, isRadian) {
                    var radian = isRadian ? angle : this.angleToRadian(angle);
                    var x = line * Math.cos(radian);
                    var y = line * Math.sin(radian);
                    return { x: x, y: y };
                };
                /** 角度转弧度 */
                MathExt.angleToRadian = function (angle) {
                    return angle * Math.PI / 180;
                };
                /** 弧度转角度 */
                MathExt.radianToAngle = function (radian) {
                    return radian * 180 / Math.PI;
                };
                return MathExt;
            }());
            exports_8("MathExt", MathExt);
        }
    };
});
System.register("base/ObjectExt", ["base/SingleClass"], function (exports_9, context_9) {
    "use strict";
    var SingleClass_4, ObjectExt;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (SingleClass_4_1) {
                SingleClass_4 = SingleClass_4_1;
            }
        ],
        execute: function () {
            /** 对象类 */
            ObjectExt = /** @class */ (function (_super) {
                __extends(ObjectExt, _super);
                function ObjectExt() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * 获取组件名
                 * @param insOrClass 实例/类
                 */
                ObjectExt.getClassName = function (insOrClass) {
                    var _a, _b, _c, _d;
                    var name = "";
                    if (!insOrClass) {
                        return name;
                    }
                    if (typeof insOrClass == "function") {
                        name = (_b = (_a = insOrClass.prototype) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name;
                    }
                    else {
                        name = (_d = (_c = insOrClass.__proto__) === null || _c === void 0 ? void 0 : _c.constructor) === null || _d === void 0 ? void 0 : _d.name;
                    }
                    return name;
                };
                ObjectExt.prototype.test = function () {
                };
                return ObjectExt;
            }(SingleClass_4.SingleClass));
            exports_9("ObjectExt", ObjectExt);
        }
    };
});
System.register("base/CCF", ["cocos/ResManager", "cocos/UIManager", "cocos/UITool", "utils/ResUtil", "base/LogExt", "base/MathExt", "base/ObjectExt", "base/SingleClass"], function (exports_10, context_10) {
    "use strict";
    var ResManager_1, UIManager_1, UITool_1, ResUtil_1, LogExt_1, MathExt_1, ObjectExt_1, SingleClass_5, CCF, ccf;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (ResManager_1_1) {
                ResManager_1 = ResManager_1_1;
            },
            function (UIManager_1_1) {
                UIManager_1 = UIManager_1_1;
            },
            function (UITool_1_1) {
                UITool_1 = UITool_1_1;
            },
            function (ResUtil_1_1) {
                ResUtil_1 = ResUtil_1_1;
            },
            function (LogExt_1_1) {
                LogExt_1 = LogExt_1_1;
            },
            function (MathExt_1_1) {
                MathExt_1 = MathExt_1_1;
            },
            function (ObjectExt_1_1) {
                ObjectExt_1 = ObjectExt_1_1;
            },
            function (SingleClass_5_1) {
                SingleClass_5 = SingleClass_5_1;
            }
        ],
        execute: function () {
            CCF = /** @class */ (function (_super) {
                __extends(CCF, _super);
                function CCF() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                CCF.prototype.init = function (root) {
                    ccf.Obj = ObjectExt_1.ObjectExt;
                    ccf.Math = MathExt_1.MathExt;
                    ccf.Logger = LogExt_1.LogExt;
                    ccf.ResUtil = ResUtil_1.ResUtil;
                    ccf.UITool = UITool_1.UITool;
                    ccf.ResMgr = ResManager_1.ResManager.getIns();
                    ccf.UIMgr = UIManager_1.UIManager.getIns(root);
                };
                return CCF;
            }(SingleClass_5.SingleClass));
            exports_10("CCF", CCF);
            exports_10("ccf", ccf = {});
        }
    };
});
System.register("base/DateExt", ["base/SingleClass"], function (exports_11, context_11) {
    "use strict";
    var SingleClass_6, DataExt;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (SingleClass_6_1) {
                SingleClass_6 = SingleClass_6_1;
            }
        ],
        execute: function () {
            DataExt = /** @class */ (function (_super) {
                __extends(DataExt, _super);
                function DataExt() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return DataExt;
            }(SingleClass_6.SingleClass));
            exports_11("DataExt", DataExt);
        }
    };
});
System.register("base/index", ["base/CCF", "base/Const", "base/DateExt", "base/LogExt", "base/MathExt", "base/ObjectExt", "base/SingleClass"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_12(exports);
    }
    return {
        setters: [
            function (CCF_3_1) {
                exportStar_1(CCF_3_1);
            },
            function (Const_1_1) {
                exportStar_1(Const_1_1);
            },
            function (DateExt_1_1) {
                exportStar_1(DateExt_1_1);
            },
            function (LogExt_2_1) {
                exportStar_1(LogExt_2_1);
            },
            function (MathExt_2_1) {
                exportStar_1(MathExt_2_1);
            },
            function (ObjectExt_2_1) {
                exportStar_1(ObjectExt_2_1);
            },
            function (SingleClass_7_1) {
                exportStar_1(SingleClass_7_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("exports/base", ["base/index"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_13(exports);
    }
    return {
        setters: [
            function (base_1_1) {
                exportStar_2(base_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("cocos/StateEnum", [], function (exports_14, context_14) {
    "use strict";
    var EnumStateName, EnumUpdataType, EnumCtrlName, EnumPropName;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [],
        execute: function () {
            /** 状态名 */
            (function (EnumStateName) {
            })(EnumStateName || (EnumStateName = {}));
            exports_14("EnumStateName", EnumStateName);
            /** 更新选择器的类型 */
            (function (EnumUpdataType) {
                /** 名字 */
                EnumUpdataType[EnumUpdataType["name"] = 0] = "name";
                /** 可选状态 */
                EnumUpdataType[EnumUpdataType["selPage"] = 1] = "selPage";
                /** 状态 */
                EnumUpdataType[EnumUpdataType["state"] = 2] = "state";
                /** 删除控制器 */
                EnumUpdataType[EnumUpdataType["delete"] = 3] = "delete";
                /** 初始化 */
                EnumUpdataType[EnumUpdataType["init"] = 4] = "init";
                /** 更新选中的属性 */
                EnumUpdataType[EnumUpdataType["prop"] = 5] = "prop";
            })(EnumUpdataType || (EnumUpdataType = {}));
            exports_14("EnumUpdataType", EnumUpdataType);
            /** 控制器名字 */
            (function (EnumCtrlName) {
            })(EnumCtrlName || (EnumCtrlName = {}));
            exports_14("EnumCtrlName", EnumCtrlName);
            /** 属性名 */
            (function (EnumPropName) {
                /** 不选择 */
                EnumPropName[EnumPropName["Non"] = 0] = "Non";
                /** 显示隐藏 */
                EnumPropName[EnumPropName["Active"] = 1] = "Active";
                /** 位置 */
                EnumPropName[EnumPropName["Position"] = 2] = "Position";
                /** 文本 */
                EnumPropName[EnumPropName["Label"] = 3] = "Label";
                /** 描边 */
                EnumPropName[EnumPropName["LabelOutline"] = 4] = "LabelOutline";
                /** 图片 */
                EnumPropName[EnumPropName["SpriteFrame"] = 5] = "SpriteFrame";
                // /** 旋转、四元数*/
                // Rotation,
                /** 旋转、欧拉角 */
                EnumPropName[EnumPropName["Euler"] = 6] = "Euler";
                /** 缩放 */
                EnumPropName[EnumPropName["Scale"] = 7] = "Scale";
                /** 锚点 */
                EnumPropName[EnumPropName["Anchor"] = 8] = "Anchor";
                /** 宽高 */
                EnumPropName[EnumPropName["Size"] = 9] = "Size";
                /** 颜色 */
                EnumPropName[EnumPropName["Color"] = 10] = "Color";
                /** 透明度 */
                EnumPropName[EnumPropName["Opacity"] = 11] = "Opacity";
                /** 灰度 */
                EnumPropName[EnumPropName["GrayScale"] = 12] = "GrayScale";
                /** 字体 */
                EnumPropName[EnumPropName["Font"] = 13] = "Font";
            })(EnumPropName || (EnumPropName = {}));
            exports_14("EnumPropName", EnumPropName);
        }
    };
});
/**
 * 这个类主要目的是为了存以下结构数据：状态对应的属性
 *
 *      _ctrlData数据存储结构
 *
 *      ctrlId:{
 *          //$$lastState$$ : state1
 *          $$default$$:{
 *              $$changedProp$$:[]
 *              $$lastProp$$:EnumPropName.active
 *              EnumPropName.active : true,//active
 *              1 : v3,//postion,
 *              .....
 *          }
 *          stateUUId0 : {
 *              $$changedProp$$:[]
 *              $$lastProp$$:EnumPropName.active
 *              EnumPropName.active : true,//active
 *              .....
 *          },
 *          stateUUId1:{
 *              $$lastProp$$:EnumPropName.pos
 *              1 : v3,//postion,
 *              .....
 *          }
 *          stateName1:{},
 *      }
 *
 */
System.register("cocos/StateSelect", ["cc", "cc/env", "cocos/StateController", "cocos/StateEnum"], function (exports_15, context_15) {
    "use strict";
    var cc_2, env_1, StateController_1, StateEnum_1, ccclass, property, executeInEditMode, disallowMultiple, StateSelect;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (cc_2_1) {
                cc_2 = cc_2_1;
            },
            function (env_1_1) {
                env_1 = env_1_1;
            },
            function (StateController_1_1) {
                StateController_1 = StateController_1_1;
            },
            function (StateEnum_1_1) {
                StateEnum_1 = StateEnum_1_1;
            }
        ],
        execute: function () {/**
             * 这个类主要目的是为了存以下结构数据：状态对应的属性
             *
             *      _ctrlData数据存储结构
             *
             *      ctrlId:{
             *          //$$lastState$$ : state1
             *          $$default$$:{
             *              $$changedProp$$:[]
             *              $$lastProp$$:EnumPropName.active
             *              EnumPropName.active : true,//active
             *              1 : v3,//postion,
             *              .....
             *          }
             *          stateUUId0 : {
             *              $$changedProp$$:[]
             *              $$lastProp$$:EnumPropName.active
             *              EnumPropName.active : true,//active
             *              .....
             *          },
             *          stateUUId1:{
             *              $$lastProp$$:EnumPropName.pos
             *              1 : v3,//postion,
             *              .....
             *          }
             *          stateName1:{},
             *      }
             *
             */
            ccclass = cc_2._decorator.ccclass, property = cc_2._decorator.property, executeInEditMode = cc_2._decorator.executeInEditMode, disallowMultiple = cc_2._decorator.disallowMultiple;
            cc_2.Enum(StateEnum_1.EnumCtrlName);
            cc_2.Enum(StateEnum_1.EnumStateName);
            cc_2.Enum(StateEnum_1.EnumPropName);
            StateSelect = /** @class */ (function (_super) {
                __extends(StateSelect, _super);
                function StateSelect() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /** root节点所有的ctrl */
                    _this._ctrlsMap = {};
                    /** 当前选中的ctrl名称对应的ctrlId */
                    _this._currCtrlId = null;
                    // /** 当前选中的状态 */
                    // @property(EnumStateName)
                    // private _currState: number = null;
                    _this._root = null;
                    /** 当前状态要改变的属性 */
                    _this._propKey = null;
                    /** 当前状态要改变的属性值 */
                    _this._propValue = null;
                    _this._isDeleteCurr = false;
                    /** 状态数据 */
                    _this._ctrlData = {};
                    /** 已经改变的属性 */
                    _this.changedProp = [];
                    _this._isPreload = false;
                    //==============更具控制器更新的状态 主要代码================
                    _this._isFromCtrl = false;
                    return _this;
                }
                Object.defineProperty(StateSelect.prototype, "isReload", {
                    /** 是否重新获取 */
                    get: function () {
                        return false;
                    },
                    set: function (value) {
                        var itself = this;
                        if (env_1.EDITOR && value) {
                            itself.__preload();
                        }
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(StateSelect.prototype, "ctrlState", {
                    get: function () {
                        var _a;
                        var itself = this;
                        return (_a = itself.getCurrCtrl()) === null || _a === void 0 ? void 0 : _a.selectedIndex;
                    },
                    set: function (value) {
                        var itself = this;
                        if (itself.getCurrCtrl()) {
                            itself.getCurrCtrl().selectedIndex = value;
                        }
                        else {
                            itself.propKey = StateEnum_1.EnumPropName.Non;
                        }
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(StateSelect.prototype, "root", {
                    /** 控制器所在节点 */
                    get: function () {
                        return this._root;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(StateSelect.prototype, "currCtrlId", {
                    /** 控制器名称 */
                    get: function () {
                        return this._currCtrlId;
                    },
                    set: function (value) {
                        if (!env_1.EDITOR) {
                            return;
                        }
                        var itself = this;
                        itself._currCtrlId = value;
                        if (!value) {
                            return;
                        }
                        itself.updateCtrlPage(itself.getCurrCtrl());
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(StateSelect.prototype, "propKey", {
                    /** 属性列表 */
                    get: function () {
                        return this._propKey;
                    },
                    set: function (value) {
                        if (!env_1.EDITOR) {
                            return;
                        }
                        var itself = this;
                        if (itself.getCurrCtrl() == void 0) {
                            itself._propKey = StateEnum_1.EnumPropName.Non;
                            return;
                        }
                        itself._propKey = value;
                        var propData = itself.getPropData();
                        propData.$$lastProp$$ = value;
                        var propValue = itself.setPropValue(value);
                        propData[value] = propValue;
                        if (propValue != void 0 && value != StateEnum_1.EnumPropName.Non) {
                            propData.$$changedProp$$ = propData.$$changedProp$$ || {};
                            propData.$$changedProp$$[StateEnum_1.EnumPropName[value]] = value;
                        }
                        itself.updateChangedProp();
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(StateSelect.prototype, "propValue", {
                    /** 属性值 */
                    get: function () {
                        return this._propValue;
                    },
                    set: function (value) {
                        if (!env_1.EDITOR) {
                            return;
                        }
                        var itself = this;
                        itself._propValue = value;
                        var propData = itself.getPropData();
                        propData[itself.propKey] = value;
                        itself.updateState(itself.getCurrCtrl());
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(StateSelect.prototype, "isDeleteCurr", {
                    /** 是否删除当前属性 */
                    get: function () {
                        return this._isDeleteCurr;
                    },
                    set: function (value) {
                        var itself = this;
                        if (!env_1.EDITOR || !value) {
                            return;
                        }
                        if (!itself.currCtrlId) {
                            return;
                        }
                        if (itself.propKey == StateEnum_1.EnumPropName.Non) {
                            return;
                        }
                        //删除属性
                        var pageData = itself.getPageData();
                        var propData = itself.getPropData();
                        var propKey = itself.propKey;
                        delete propData[propKey];
                        var $$changedProp$$ = propData.$$changedProp$$ || {};
                        var name = StateEnum_1.EnumPropName[propKey];
                        delete $$changedProp$$[name];
                        var isHas = itself.isOtherHans(itself.getCurrCtrl(), propKey);
                        if (!isHas) {
                            delete pageData.$$default$$[propKey];
                        }
                        itself.propKey = StateEnum_1.EnumPropName.Non;
                    },
                    enumerable: false,
                    configurable: true
                });
                /** 刷新上次选中属性 */
                StateSelect.prototype.refProp = function () {
                    var itself = this;
                    var propData = itself.getPropData();
                    var lastProp = propData.$$lastProp$$;
                    if (lastProp) {
                        itself.propKey = lastProp;
                    }
                    else {
                        itself.propKey = StateEnum_1.EnumPropName.Non;
                    }
                };
                StateSelect.prototype.__preload = function () {
                    if (!env_1.EDITOR) {
                        return;
                    }
                    var itself = this;
                    if (itself._isPreload) {
                        return;
                    }
                    itself._isPreload = true;
                    itself.updateCtrlName(itself.node.parent);
                    itself.updateCtrlPage(itself.getCurrCtrl());
                    if (!itself.currCtrlId) {
                        var ctrlIdKeys = Object.keys(itself._ctrlsMap);
                        if (ctrlIdKeys.length) {
                            itself.currCtrlId = Number(ctrlIdKeys[0]);
                            itself.refProp();
                        }
                        else {
                            console.error("没有添加控制器");
                            itself._onPreDestroy();
                        }
                    }
                    else {
                        itself.refProp();
                    }
                };
                StateSelect.prototype.onLoad = function () {
                    var itself = this;
                    if (!env_1.EDITOR) {
                        return;
                    }
                    itself.node.on(cc_2.Node.EventType.PARENT_CHANGED, itself._parentChanged, itself);
                    itself.node.on(cc_2.Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, itself._activeChanged, itself);
                    itself.node.on(cc_2.Node.EventType.TRANSFORM_CHANGED, itself._positionChanged, itself);
                    itself.node.on(cc_2.Node.EventType.SIZE_CHANGED, itself._sizeChanged, itself);
                    itself.node.on(cc_2.Node.EventType.ANCHOR_CHANGED, itself._anchorChanged, itself);
                    itself.node.on(cc_2.Node.EventType.COLOR_CHANGED, itself._colorChanged, itself);
                    itself.node.on(cc_2.Sprite.EventType.SPRITE_FRAME_CHANGED, itself._spriteChanged, itself);
                };
                //==============一些监听、设置默认属性=================
                /** 父节点改变 */
                StateSelect.prototype._parentChanged = function (oldParent) {
                    var itself = this;
                    itself.transPosition(oldParent);
                };
                /** 节点active改变 */
                StateSelect.prototype._activeChanged = function (node) {
                    var itself = this;
                    itself.setDefaultPorp(StateEnum_1.EnumPropName.Active);
                };
                /** 节点改变位置、旋转或缩放事件。如果具体需要判断是哪一个事件，可通过判断回调的第一个参数类型是 [[Node.TransformBit]] 中的哪一个来获取 */
                StateSelect.prototype._positionChanged = function (type) {
                    var itself = this;
                    if (type == cc_2.Node.TransformBit.POSITION) {
                        itself.setDefaultPorp(StateEnum_1.EnumPropName.Position);
                    }
                    else if (type == cc_2.Node.TransformBit.ROTATION) {
                        // itself.setDefaultPorp(EnumPropName.Rotation);
                        itself.setDefaultPorp(StateEnum_1.EnumPropName.Euler);
                    }
                    else if (type == cc_2.Node.TransformBit.SCALE) {
                        itself.setDefaultPorp(StateEnum_1.EnumPropName.Scale);
                    }
                };
                /** 节点大小改变 */
                StateSelect.prototype._sizeChanged = function (size) {
                    var itself = this;
                    itself.setDefaultPorp(StateEnum_1.EnumPropName.Size);
                };
                /** 锚点改变 */
                StateSelect.prototype._anchorChanged = function (anchor) {
                    var itself = this;
                    itself.setDefaultPorp(StateEnum_1.EnumPropName.Anchor);
                };
                /** 颜色改变 */
                StateSelect.prototype._colorChanged = function (color) {
                    var itself = this;
                    itself.setDefaultPorp(StateEnum_1.EnumPropName.Color);
                };
                /** 图片改变 */
                StateSelect.prototype._spriteChanged = function (sprite) {
                    var itself = this;
                    itself.setDefaultPorp(StateEnum_1.EnumPropName.SpriteFrame);
                };
                //=============一些界面的显示==============
                /** 更新控制器 */
                StateSelect.prototype.updateCtrlName = function (node) {
                    if (!env_1.EDITOR) {
                        return;
                    }
                    var itself = this;
                    var ctrls = itself.getCtrls(node);
                    var arr = ctrls.map(function (val, i) {
                        if (itself._ctrlsMap[val._ctrlId] == void 0) {
                            itself._ctrlsMap[val._ctrlId] = val;
                        }
                        return { name: val.ctrlName, value: val._ctrlId };
                    });
                    cc_2.CCClass.Attr.setClassAttr(itself, "currCtrlId", "enumList", arr);
                };
                /** 获取所有的Ctrl */
                StateSelect.prototype.getCtrls = function (node) {
                    if (!node || !env_1.EDITOR) {
                        return [];
                    }
                    var ctrls = node.getComponents(StateController_1.StateController);
                    if (ctrls.length) {
                        this._root = node;
                        return ctrls;
                    }
                    return this.getCtrls(node.parent);
                };
                /** 更新状态数量 */
                StateSelect.prototype.updateCtrlPage = function (ctrl, deleteIndex) {
                    var itself = this;
                    if (!ctrl || ctrl._ctrlId != itself.currCtrlId) {
                        return;
                    }
                    if (deleteIndex != void 0 && deleteIndex != -1) {
                        //被删的index，更新数据,一次只能删一个
                        var pageData_1 = itself.getPageData();
                        for (var state = deleteIndex; state <= ctrl.states.length - 1; state++) {
                            var next = pageData_1[state + 1];
                            if (next) {
                                pageData_1[state] = next;
                            }
                        }
                        var deleteProp_1 = pageData_1[ctrl.states.length];
                        delete pageData_1[ctrl.states.length];
                        setTimeout(function () {
                            for (var prop in deleteProp_1) { //这里要删除改变的属性
                                var isHas = itself.isOtherHans(ctrl, prop);
                                if (!isHas) {
                                    delete pageData_1.$$default$$[prop];
                                    itself.updateChangedProp();
                                }
                            }
                        });
                    }
                    var arr = ctrl.states.map(function (val, i) {
                        return { name: val.name, value: i };
                    });
                    cc_2.CCClass.Attr.setClassAttr(itself, "ctrlState", "enumList", arr);
                };
                /** 控制器被删除 */
                StateSelect.prototype.updateDelete = function (ctrl) {
                    if (!env_1.EDITOR) {
                        return;
                    }
                    var itself = this;
                    delete itself._ctrlData[ctrl._ctrlId];
                    if (itself.currCtrlId == ctrl._ctrlId) {
                        itself._onPreDestroy();
                    }
                    else {
                        setTimeout(function () {
                            itself.updateCtrlName(ctrl.node);
                        });
                    }
                };
                /** 已经改变的属性 */
                StateSelect.prototype.updateChangedProp = function () {
                    var itself = this;
                    var propdata = itself.getPropData();
                    var arr = [];
                    for (var name_1 in propdata.$$changedProp$$) {
                        arr.push(name_1);
                    }
                    itself.changedProp = arr;
                };
                StateSelect.prototype.updatePreLoad = function (ctrl) {
                    var itself = this;
                    if (!ctrl || ctrl._ctrlId != itself.currCtrlId) {
                        return;
                    }
                    itself.__preload();
                };
                StateSelect.prototype.updateProp = function (ctrl) {
                    var itself = this;
                    if (!ctrl || ctrl._ctrlId != itself.currCtrlId) {
                        return;
                    }
                    itself.refProp();
                };
                /** 更新状态 */
                StateSelect.prototype.updateState = function (ctrl) {
                    var itself = this;
                    if (!ctrl) {
                        return;
                    }
                    itself._isFromCtrl = true;
                    var propData = itself.getPropData(ctrl.selectedIndex, ctrl._ctrlId);
                    var defaultData = itself.getDefaultData(ctrl._ctrlId);
                    for (var key in defaultData) {
                        var value = propData[key] == void 0 ? defaultData[key] : propData[key];
                        itself.updateUI(Number(key), value);
                    }
                    itself._isFromCtrl = false;
                };
                StateSelect.prototype.updateUI = function (type, value) {
                    var itself = this;
                    switch (type) {
                        case StateEnum_1.EnumPropName.Non: {
                            return;
                        }
                        case StateEnum_1.EnumPropName.Active:
                            {
                                itself.node.active = value;
                            }
                            break;
                        case StateEnum_1.EnumPropName.Position:
                            {
                                itself.node.position = value;
                            }
                            break;
                        case StateEnum_1.EnumPropName.Label:
                            {
                                var label = itself.node.getComponent(cc_2.Label);
                                if (label) {
                                    label.string = value;
                                }
                            }
                            break;
                        case StateEnum_1.EnumPropName.Font:
                            {
                                var label = itself.node.getComponent(cc_2.Label);
                                if (label) {
                                    label.font = value;
                                }
                            }
                            break;
                        case StateEnum_1.EnumPropName.LabelOutline:
                            {
                                var labelOutline = itself.node.getComponent(cc_2.LabelOutline);
                                if (labelOutline) {
                                    labelOutline.color = value;
                                }
                            }
                            break;
                        case StateEnum_1.EnumPropName.SpriteFrame:
                            {
                                var sprite = itself.node.getComponent(cc_2.Sprite);
                                if (sprite) {
                                    sprite.spriteFrame = value;
                                }
                            }
                            break;
                        // case EnumPropName.Rotation: {
                        //     itself.node.rotation = value as Quat;
                        // } break;
                        case StateEnum_1.EnumPropName.Euler:
                            {
                                itself.node.eulerAngles = value;
                            }
                            break;
                        case StateEnum_1.EnumPropName.Scale:
                            {
                                itself.node.scale = value;
                            }
                            break;
                        case StateEnum_1.EnumPropName.Anchor:
                            {
                                var trans = itself.node.getComponent(cc_2.UITransform);
                                if (trans) {
                                    trans.anchorPoint = value;
                                }
                            }
                            break;
                        case StateEnum_1.EnumPropName.Size:
                            {
                                var trans = itself.node.getComponent(cc_2.UITransform);
                                if (trans) {
                                    trans.contentSize = value;
                                }
                            }
                            break;
                        case StateEnum_1.EnumPropName.Color:
                            {
                                var sprite_label = itself.node.getComponent(cc_2.Sprite) || itself.node.getComponent(cc_2.Label);
                                if (sprite_label) {
                                    sprite_label.color = value;
                                }
                            }
                            break;
                        case StateEnum_1.EnumPropName.Opacity:
                            {
                                var opacity = itself.node.getComponent(cc_2.UIOpacity);
                                if (opacity) {
                                    opacity.opacity = value;
                                }
                            }
                            break;
                        case StateEnum_1.EnumPropName.GrayScale:
                            {
                                var sprite = itself.node.getComponent(cc_2.Sprite);
                                if (sprite) {
                                    sprite.grayscale = value;
                                }
                            }
                            break;
                    }
                };
                //=============一些计算方式，仅储存值使用=================
                StateSelect.prototype.getCurrCtrl = function () {
                    var itself = this;
                    return itself._ctrlsMap[itself.currCtrlId];
                };
                /**
                 * 其他状态是否有存在这个属性
                 * @param ctrl
                 * @param prop
                 */
                StateSelect.prototype.isOtherHans = function (ctrl, prop) {
                    var itself = this;
                    var isHas = false;
                    var pageData = itself.getPageData();
                    for (var index = 0, len = ctrl.states.length; index < len; index++) {
                        var propData = pageData[index] || {};
                        if (propData[prop] != void 0) {
                            isHas = true;
                            break;
                        }
                    }
                    return isHas;
                };
                /** 获取某个控制器的状态数据 */
                StateSelect.prototype.getPageData = function (ctrlId) {
                    var itself = this;
                    ctrlId = ctrlId == void 0 ? itself.currCtrlId : ctrlId;
                    if (itself._ctrlData[ctrlId] == void 0) {
                        itself._ctrlData[ctrlId] = {};
                    }
                    return itself._ctrlData[ctrlId];
                };
                /** 获取某个状态的属性数据 */
                StateSelect.prototype.getPropData = function (state, ctrlId) {
                    var itself = this;
                    var pageData = itself.getPageData(ctrlId);
                    state = state == void 0 ? itself.ctrlState : state;
                    if (pageData[state] == void 0) {
                        pageData[state] = {};
                    }
                    return pageData[state];
                };
                /** 获取缓存的属性值 */
                StateSelect.prototype.getPropValue = function (type) {
                    var itself = this;
                    var propData = itself.getPropData();
                    var value = propData[type];
                    return value;
                };
                /** 获取默认属性 */
                StateSelect.prototype.getDefaultData = function (ctrlId) {
                    var itself = this;
                    var pageData = itself.getPageData(ctrlId);
                    if (pageData.$$default$$ == void 0) {
                        pageData.$$default$$ = {};
                    }
                    return pageData.$$default$$;
                };
                /** 还原编辑器属性值 */
                StateSelect.prototype.setPropValue = function (type) {
                    var itself = this;
                    var value = itself.handleValue(type);
                    if (value == void 0) {
                        cc_2.CCClass.Attr.setClassAttr(itself, "propValue", "visible", false);
                        return void 0;
                    }
                    cc_2.CCClass.Attr.setClassAttr(itself, "propValue", "visible", true);
                    itself._propValue = value;
                    return value;
                };
                //解析并返回属性值
                StateSelect.prototype.handleValue = function (type) {
                    var itself = this;
                    var value;
                    switch (type) {
                        case StateEnum_1.EnumPropName.Non:
                            {
                                value = void 0;
                            }
                            break;
                        case StateEnum_1.EnumPropName.Active:
                            {
                                value = itself.getActive();
                            }
                            break;
                        case StateEnum_1.EnumPropName.Position:
                            {
                                value = itself.getPosition();
                            }
                            break;
                        // case EnumPropName.Rotation: {
                        //     value = itself.getRotation();
                        // } break;
                        case StateEnum_1.EnumPropName.Euler:
                            {
                                value = itself.getEuler();
                            }
                            break;
                        case StateEnum_1.EnumPropName.Scale:
                            {
                                value = itself.getScale();
                            }
                            break;
                        case StateEnum_1.EnumPropName.Anchor:
                            {
                                value = itself.getAnchor();
                            }
                            break;
                        case StateEnum_1.EnumPropName.Size:
                            {
                                value = itself.getSize();
                            }
                            break;
                        case StateEnum_1.EnumPropName.Color:
                            {
                                value = itself.getColor();
                            }
                            break;
                        case StateEnum_1.EnumPropName.Opacity:
                            {
                                value = itself.getOpacity();
                            }
                            break;
                        case StateEnum_1.EnumPropName.GrayScale:
                            {
                                value = itself.getGrayScale();
                            }
                            break;
                        case StateEnum_1.EnumPropName.Label:
                            {
                                value = itself.getLabel();
                            }
                            break;
                        case StateEnum_1.EnumPropName.Font:
                            {
                                value = itself.getFont();
                            }
                            break;
                        case StateEnum_1.EnumPropName.LabelOutline:
                            {
                                value = itself.getLabelOutline();
                            }
                            break;
                        case StateEnum_1.EnumPropName.SpriteFrame:
                            {
                                value = itself.getSpriteFrame();
                            }
                            break;
                    }
                    return value;
                };
                /** 编辑器改变、改变对于状态属性（最开始是说改变默认属性） */
                StateSelect.prototype.setDefaultPorp = function (type) {
                    var itself = this;
                    if (!env_1.EDITOR) {
                        return;
                    }
                    if (itself._isFromCtrl) {
                        return; //不是编辑器改变
                    }
                    // let defaultData = itself.getDefaultData();
                    var getPropData = itself.getPropData();
                    if (getPropData[type] == void 0) {
                        return; //没有改变这个属性   
                    }
                    switch (type) {
                        case StateEnum_1.EnumPropName.Non: {
                            return;
                        }
                        case StateEnum_1.EnumPropName.Active:
                            {
                                getPropData[StateEnum_1.EnumPropName.Active] = itself.node.active;
                            }
                            break;
                        case StateEnum_1.EnumPropName.Position:
                            {
                                cc_2.Vec3.copy(getPropData[StateEnum_1.EnumPropName.Position], itself.node.position);
                            }
                            break;
                        case StateEnum_1.EnumPropName.Label:
                            {
                                var label = itself.node.getComponent(cc_2.Label);
                                if (!label) {
                                    return;
                                }
                                getPropData[StateEnum_1.EnumPropName.Label] = label.string;
                            }
                            break;
                        case StateEnum_1.EnumPropName.Font:
                            {
                                var label = itself.node.getComponent(cc_2.Label);
                                if (!label) {
                                    return;
                                }
                                getPropData[StateEnum_1.EnumPropName.Font] = label.font;
                            }
                            break;
                        case StateEnum_1.EnumPropName.LabelOutline:
                            {
                                var labelOutline = itself.node.getComponent(cc_2.LabelOutline);
                                if (!labelOutline) {
                                    return;
                                }
                                getPropData[StateEnum_1.EnumPropName.LabelOutline].set(labelOutline.color);
                            }
                            break;
                        case StateEnum_1.EnumPropName.SpriteFrame:
                            {
                                var sprite = itself.node.getComponent(cc_2.Sprite);
                                if (!sprite) {
                                    return;
                                }
                                getPropData[StateEnum_1.EnumPropName.SpriteFrame] = sprite.spriteFrame;
                            }
                            break;
                        // case EnumPropName.Rotation: {
                        //     Vec3.copy(defaultData[EnumPropName.Rotation] as Quat, itself.node.rotation);
                        // } break;
                        case StateEnum_1.EnumPropName.Euler:
                            {
                                cc_2.Vec3.copy(getPropData[StateEnum_1.EnumPropName.Euler], itself.node.eulerAngles);
                            }
                            break;
                        case StateEnum_1.EnumPropName.Scale:
                            {
                                cc_2.Vec3.copy(getPropData[StateEnum_1.EnumPropName.Scale], itself.node.scale);
                            }
                            break;
                        case StateEnum_1.EnumPropName.Anchor:
                            {
                                var trans = itself.node.getComponent(cc_2.UITransform);
                                if (!trans) {
                                    return;
                                }
                                cc_2.Vec2.copy(getPropData[StateEnum_1.EnumPropName.Anchor], trans.anchorPoint);
                            }
                            break;
                        case StateEnum_1.EnumPropName.Size:
                            {
                                var trans = itself.node.getComponent(cc_2.UITransform);
                                if (!trans) {
                                    return;
                                }
                                getPropData[StateEnum_1.EnumPropName.Size].set(trans.contentSize);
                            }
                            break;
                        case StateEnum_1.EnumPropName.Color:
                            {
                                var sprite_label = itself.node.getComponent(cc_2.Sprite) || itself.node.getComponent(cc_2.Label);
                                if (!sprite_label) {
                                    return;
                                }
                                getPropData[StateEnum_1.EnumPropName.Color].set(sprite_label.color);
                            }
                            break;
                        case StateEnum_1.EnumPropName.Opacity:
                            {
                                var opacity = itself.node.getComponent(cc_2.UIOpacity);
                                if (!opacity) {
                                    return;
                                }
                                getPropData[StateEnum_1.EnumPropName.Opacity] = opacity.opacity;
                            }
                            break;
                        case StateEnum_1.EnumPropName.GrayScale:
                            {
                                var sprite = itself.node.getComponent(cc_2.Sprite);
                                if (!sprite) {
                                    return;
                                }
                                getPropData[StateEnum_1.EnumPropName.GrayScale] = sprite.grayscale;
                            }
                            break;
                    }
                    if (type == itself.propKey) {
                        var propData = itself.getPropData();
                        itself._propValue = propData[itself.propKey];
                    }
                };
                /** 显示隐藏 */
                StateSelect.prototype.getActive = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.Active);
                    if (value == void 0) {
                        value = itself.node.active;
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.Active] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.Active] = value;
                        }
                    }
                    return value;
                };
                /** 获取位置 */
                StateSelect.prototype.getPosition = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.Position);
                    if (value == void 0) {
                        value = itself.node.getPosition();
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.Position] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.Position] = itself.node.getPosition();
                        }
                    }
                    return value;
                };
                // /** 旋转、四元数 */
                // private getRotation() {
                //     let itself = this;
                //     let value = itself.getPropValue(EnumPropName.Rotation) as Quat;
                //     if (value == void 0) {
                //         value = itself.node.getRotation();
                //         let defaultData = itself.getDefaultData();
                //         defaultData[EnumPropName.Rotation] = itself.node.getRotation();
                //     }
                //     return value;
                // }
                /** 旋转、欧拉角 */
                StateSelect.prototype.getEuler = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.Euler);
                    if (value == void 0) {
                        value = cc_2.Vec3.copy(new cc_2.Vec3(), itself.node.eulerAngles);
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.Euler] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.Euler] = cc_2.Vec3.copy(new cc_2.Vec3(), itself.node.eulerAngles);
                        }
                    }
                    return value;
                };
                /** 缩放 */
                StateSelect.prototype.getScale = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.Scale);
                    if (value == void 0) {
                        value = itself.node.getScale();
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.Scale] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.Scale] = itself.node.getScale();
                        }
                    }
                    return value;
                };
                /** 锚点 */
                StateSelect.prototype.getAnchor = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.Anchor);
                    if (value == void 0) {
                        var trans = itself.node.getComponent(cc_2.UITransform);
                        if (!trans) {
                            return void 0;
                        }
                        value = cc_2.Vec2.copy(new cc_2.Vec2(), trans.anchorPoint);
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.Anchor] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.Anchor] = cc_2.Vec2.copy(new cc_2.Vec2(), trans.anchorPoint);
                        }
                    }
                    return value;
                };
                /** 宽高 */
                StateSelect.prototype.getSize = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.Size);
                    if (value == void 0) {
                        var trans = itself.node.getComponent(cc_2.UITransform);
                        if (!trans) {
                            return void 0;
                        }
                        value = trans.contentSize.clone();
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.Size] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.Size] = trans.contentSize.clone();
                        }
                    }
                    return value;
                };
                /** 颜色 */
                StateSelect.prototype.getColor = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.Color);
                    if (value == void 0) {
                        var sprite_label = itself.node.getComponent(cc_2.Sprite) || itself.node.getComponent(cc_2.Label);
                        if (!sprite_label) {
                            return void 0;
                        }
                        value = sprite_label.color.clone();
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.Color] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.Color] = sprite_label.color.clone();
                        }
                    }
                    return value;
                };
                /** 透明度 */
                StateSelect.prototype.getOpacity = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.Opacity);
                    if (value == void 0) {
                        var opacity = itself.node.getComponent(cc_2.UIOpacity);
                        if (!opacity) {
                            return void 0;
                        }
                        value = opacity.opacity;
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.Opacity] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.Opacity] = value;
                        }
                    }
                    return value;
                };
                /** 灰度 */
                StateSelect.prototype.getGrayScale = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.GrayScale);
                    if (value == void 0) {
                        var sprite = itself.node.getComponent(cc_2.Sprite);
                        if (!sprite) {
                            return void 0;
                        }
                        value = sprite.grayscale;
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.GrayScale] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.GrayScale] = value;
                        }
                    }
                    return value;
                };
                /** 文本 */
                StateSelect.prototype.getLabel = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.Label);
                    if (value == void 0) {
                        var label = itself.node.getComponent(cc_2.Label);
                        if (!label) {
                            return void 0;
                        }
                        value = label.string;
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.Label] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.Label] = value;
                        }
                    }
                    return value;
                };
                /** 字体 */
                StateSelect.prototype.getFont = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.Font);
                    if (value == void 0) {
                        var label = itself.node.getComponent(cc_2.Label);
                        if (!label) {
                            return void 0;
                        }
                        value = label.font;
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.Font] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.Font] = value;
                        }
                    }
                    return value;
                };
                /** 文本描边 */
                StateSelect.prototype.getLabelOutline = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.LabelOutline);
                    if (value == void 0) {
                        var labelOutline = itself.node.getComponent(cc_2.LabelOutline);
                        if (!labelOutline) {
                            return void 0;
                        }
                        value = labelOutline.color.clone();
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.LabelOutline] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.LabelOutline] = value.clone();
                        }
                    }
                    return value;
                };
                /** 图片 */
                StateSelect.prototype.getSpriteFrame = function () {
                    var itself = this;
                    var value = itself.getPropValue(StateEnum_1.EnumPropName.SpriteFrame);
                    if (value == void 0) {
                        var sprite = itself.node.getComponent(cc_2.Sprite);
                        if (!sprite) {
                            return void 0;
                        }
                        value = sprite.spriteFrame;
                        var defaultData = itself.getDefaultData();
                        if (defaultData[StateEnum_1.EnumPropName.SpriteFrame] == void 0) {
                            defaultData[StateEnum_1.EnumPropName.SpriteFrame] = value;
                        }
                    }
                    return value;
                };
                /** 父节点改变，转换已经缓存的位置 */
                StateSelect.prototype.transPosition = function (oldParent) {
                    if (!env_1.EDITOR) {
                        return;
                    }
                    var itself = this;
                    var parent = itself.node.parent;
                    if (!parent || !oldParent) {
                        return;
                    }
                    var pageData = itself.getPageData();
                    var transCurr = parent.getComponent(cc_2.UITransform);
                    if (!transCurr) {
                        transCurr = parent.addComponent(cc_2.UITransform);
                        transCurr["__delete__"] = true;
                    }
                    var transOld = oldParent.getComponent(cc_2.UITransform);
                    if (!transOld) {
                        transOld = oldParent.addComponent(cc_2.UITransform);
                        transOld["__delete__"] = true;
                    }
                    for (var state in pageData) {
                        var propData = pageData[state];
                        var pos = propData[StateEnum_1.EnumPropName.Position];
                        if (pos) {
                            transCurr.convertToNodeSpaceAR(transOld.convertToWorldSpaceAR(pos), pos);
                        }
                    }
                    if (transCurr["__delete__"]) {
                        transCurr._onPreDestroy();
                    }
                    if (transOld["__delete__"]) {
                        transOld._onPreDestroy();
                    }
                };
                __decorate([
                    property
                ], StateSelect.prototype, "_ctrlsMap", void 0);
                __decorate([
                    property(StateEnum_1.EnumCtrlName)
                ], StateSelect.prototype, "_currCtrlId", void 0);
                __decorate([
                    property
                ], StateSelect.prototype, "_root", void 0);
                __decorate([
                    property({ type: StateEnum_1.EnumPropName })
                ], StateSelect.prototype, "_propKey", void 0);
                __decorate([
                    property
                ], StateSelect.prototype, "_propValue", void 0);
                __decorate([
                    property
                ], StateSelect.prototype, "_isDeleteCurr", void 0);
                __decorate([
                    property
                ], StateSelect.prototype, "_ctrlData", void 0);
                __decorate([
                    property({ tooltip: "是否重新获取ctrl" })
                ], StateSelect.prototype, "isReload", null);
                __decorate([
                    property({ type: StateEnum_1.EnumStateName, tooltip: "控制器当前状态" })
                ], StateSelect.prototype, "ctrlState", null);
                __decorate([
                    property({ type: cc_2.Node, tooltip: "控制器所在节点，仅提示用" })
                ], StateSelect.prototype, "root", null);
                __decorate([
                    property({ type: StateEnum_1.EnumCtrlName, displayName: "ctrlName", tooltip: "选择的控制器" })
                ], StateSelect.prototype, "currCtrlId", null);
                __decorate([
                    property({ type: StateEnum_1.EnumPropName, tooltip: "属性选择列表" })
                ], StateSelect.prototype, "propKey", null);
                __decorate([
                    property({ tooltip: "当前状态属性值" })
                ], StateSelect.prototype, "propValue", null);
                __decorate([
                    property({ tooltip: "是否删除当前属性" })
                ], StateSelect.prototype, "isDeleteCurr", null);
                __decorate([
                    property({ type: cc_2.CCString, readonly: true, tooltip: "已经改变的属性" })
                ], StateSelect.prototype, "changedProp", void 0);
                StateSelect = __decorate([
                    ccclass('StateSelect'),
                    executeInEditMode(true),
                    disallowMultiple(true)
                ], StateSelect);
                return StateSelect;
            }(cc_2.Component));
            exports_15("StateSelect", StateSelect);
        }
    };
});
/**
 * 开发中遇到的一些问题：
 * 1、节点没激活，不会执行：__preload()等生命周期函数
 * 2、一个对象里有“_”开头的key，不会被序列化
 * 3、@executeInEditMode(true)代码修改，回到界面组件会先被销毁然后重新添加
 * 4、属性里对象的赋值，是克隆对象里的值，并不是改变指向的地址
 * 5、关闭编辑后再打开，uuid会改变
 * 6、编辑器删除节点，parent改变的监听也会收到，注意处理
 * 7、使用setTimeout的地方都是为了延迟执行
 *
 *
 * 控制器已知问题：
 * 1、改变文本只能在propvalue那里设置。从自带的string那里改变没有监听方法,
 * 2、改变：透明度（UIOpacity）、变灰、描边颜色、字体 ===》同个问题。
 *
 * 3、改变四元数也有问题，只做了改变欧拉角。
 * 4、不能使用ctrl+z（撤销），否则一些数据会没掉,
 * 5、好像删除不可逆
 */
System.register("cocos/StateController", ["cc", "cc/env", "cocos/StateEnum", "cocos/StateSelect"], function (exports_16, context_16) {
    "use strict";
    var cc_3, env_2, StateEnum_2, StateSelect_1, ccclass, property, executeInEditMode, StateValue, StateController;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [
            function (cc_3_1) {
                cc_3 = cc_3_1;
            },
            function (env_2_1) {
                env_2 = env_2_1;
            },
            function (StateEnum_2_1) {
                StateEnum_2 = StateEnum_2_1;
            },
            function (StateSelect_1_1) {
                StateSelect_1 = StateSelect_1_1;
            }
        ],
        execute: function () {/**
             * 开发中遇到的一些问题：
             * 1、节点没激活，不会执行：__preload()等生命周期函数
             * 2、一个对象里有“_”开头的key，不会被序列化
             * 3、@executeInEditMode(true)代码修改，回到界面组件会先被销毁然后重新添加
             * 4、属性里对象的赋值，是克隆对象里的值，并不是改变指向的地址
             * 5、关闭编辑后再打开，uuid会改变
             * 6、编辑器删除节点，parent改变的监听也会收到，注意处理
             * 7、使用setTimeout的地方都是为了延迟执行
             *
             *
             * 控制器已知问题：
             * 1、改变文本只能在propvalue那里设置。从自带的string那里改变没有监听方法,
             * 2、改变：透明度（UIOpacity）、变灰、描边颜色、字体 ===》同个问题。
             *
             * 3、改变四元数也有问题，只做了改变欧拉角。
             * 4、不能使用ctrl+z（撤销），否则一些数据会没掉,
             * 5、好像删除不可逆
             */
            ccclass = cc_3._decorator.ccclass, property = cc_3._decorator.property, executeInEditMode = cc_3._decorator.executeInEditMode;
            cc_3.Enum(StateEnum_2.EnumStateName);
            StateValue = /** @class */ (function () {
                function StateValue(name, stateId) {
                    this.name = "";
                    this.stateId = 0;
                    var itself = this;
                    itself.name = name;
                    itself.stateId = stateId;
                }
                __decorate([
                    property(cc_3.CCString)
                ], StateValue.prototype, "name", void 0);
                __decorate([
                    property({ type: cc_3.CCInteger, readonly: true })
                ], StateValue.prototype, "stateId", void 0);
                StateValue = __decorate([
                    ccclass("stateValue")
                ], StateValue);
                return StateValue;
            }());
            exports_16("StateValue", StateValue);
            StateController = /** @class */ (function (_super) {
                __extends(StateController, _super);
                function StateController() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.stateIdAuto = 0;
                    /** 控制器唯一id，如果使用uuid每次打开编辑器就会变 */
                    _this._ctrlId = Date.now();
                    /** 选中的状态下标 */
                    _this._selectedIndex = 0;
                    /** 状态名字列表 */
                    _this._pageNames = [];
                    /** 上一次选中的下标 */
                    _this._previousIndex = -1;
                    /** 控制器名字 */
                    _this._ctrlName = "";
                    /** 是否初始 ,假设编辑器默认状态是2，代码里面正好第一次状态也是2，会导致selecteindex那里不刷新状态。 */
                    _this.isInit = true;
                    return _this;
                }
                StateController_2 = StateController;
                StateController.prototype.__preload = function () {
                    var itself = this;
                    if (!env_2.EDITOR) {
                        return;
                    }
                    if (!itself._pageNames.length) {
                        itself._pageNames = [new StateValue("0", itself.stateIdAuto++), new StateValue("1", itself.stateIdAuto++)];
                    }
                    var array = itself.states.map(function (val, i) {
                        return { name: val.name, value: i };
                    });
                    cc_3.CCClass.Attr.setClassAttr(itself, "selectedIndex", "enumList", array);
                    // console.log(CCClass.Attr.getClassAttrs(itself)[`selectedIndex${CCClass.Attr.DELIMETER}enumList`])
                    if (!itself._ctrlName) {
                        itself.ctrlName = "ctrl_".concat(Date.now().toString());
                    }
                    itself.updateState(StateEnum_2.EnumUpdataType.init);
                };
                StateController.prototype.onLoad = function () {
                    var itself = this;
                    if (!env_2.EDITOR) {
                        return;
                    }
                    setTimeout(function () {
                        itself.updateState(StateEnum_2.EnumUpdataType.state);
                    });
                };
                StateController.prototype.onDestroy = function () {
                    var itself = this;
                    if (env_2.EDITOR) {
                        itself.updateState(StateEnum_2.EnumUpdataType.delete);
                    }
                };
                Object.defineProperty(StateController.prototype, "ctrlName", {
                    get: function () {
                        return this._ctrlName;
                    },
                    set: function (value) {
                        var itself = this;
                        itself._ctrlName = value;
                        if (env_2.EDITOR) {
                            itself.updateState(StateEnum_2.EnumUpdataType.name);
                        }
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(StateController.prototype, "selectedIndex", {
                    /** 选择的状态下标 */
                    get: function () {
                        return this._selectedIndex;
                    },
                    set: function (value) {
                        var itself = this;
                        if (itself.isInit || itself._selectedIndex != value) {
                            itself.isInit = false;
                            if (value > itself._pageNames.length - 1) {
                                throw "index out of bounds:（越界） " + value;
                            }
                            itself.changing = true;
                            itself._previousIndex = itself._selectedIndex;
                            itself._selectedIndex = value;
                            itself.updateState(StateEnum_2.EnumUpdataType.state);
                            if (env_2.EDITOR) {
                                itself.updateState(StateEnum_2.EnumUpdataType.prop);
                            }
                            itself.changing = false;
                        }
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(StateController.prototype, "states", {
                    get: function () {
                        return this._pageNames;
                    },
                    set: function (value) {
                        if (!env_2.EDITOR) {
                            return;
                        }
                        var itself = this;
                        if (value.length < 2) {
                            console.error("状态必须大于两个");
                            return;
                        }
                        var oldLen = itself._pageNames.length;
                        var newLen = value.length;
                        var deleteIndex = -1;
                        if (oldLen > newLen) {
                            var _loop_1 = function (index) {
                                var oldS = itself._pageNames[index];
                                var newS = value[index];
                                if (!newS || oldS.stateId != newS.stateId) {
                                    //被删的index，更新数据
                                    deleteIndex = index;
                                    setTimeout(function () {
                                        if (itself.selectedIndex >= index) {
                                            itself.selectedIndex = itself.selectedIndex - 1;
                                        }
                                    });
                                    return "break";
                                }
                            };
                            //被删除状态
                            for (var index = 0; index < oldLen; index++) {
                                var state_1 = _loop_1(index);
                                if (state_1 === "break")
                                    break;
                            }
                        }
                        else if (newLen > oldLen) {
                            //最新的几个没有值
                            for (var index = itself._pageNames.length, len = value.length; index < len; index++) {
                                var val = value[index];
                                val.name = "" + itself.stateIdAuto;
                                val.stateId = itself.stateIdAuto++;
                            }
                        }
                        itself._pageNames = value;
                        var stateMap = {};
                        var array = value.map(function (val, i) {
                            if (val && stateMap[val.name]) {
                                console.error("重复的状态值", val, i);
                            }
                            stateMap[val.name] = true;
                            return { name: val.name, value: i };
                        });
                        itself.updateState(StateEnum_2.EnumUpdataType.selPage, deleteIndex);
                        cc_3.CCClass.Attr.setClassAttr(itself, "selectedIndex", "enumList", array);
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(StateController.prototype, "previsousIndex", {
                    /** 上一次的选中下标 */
                    get: function () {
                        return this._previousIndex;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(StateController.prototype, "selectedPage", {
                    /** 选择的状态名字 */
                    get: function () {
                        if (this._selectedIndex == -1)
                            return null;
                        else
                            return this._pageNames[this._selectedIndex].name;
                    },
                    set: function (val) {
                        var itself = this;
                        for (var index = 0, len = itself._pageNames.length; index < len; index++) {
                            if (itself._pageNames[index].name == val) {
                                itself.selectedIndex = index;
                                return;
                            }
                        }
                    },
                    enumerable: false,
                    configurable: true
                });
                /** 更新状态 */
                StateController.prototype.updateState = function (type, value) {
                    var itself = this;
                    var updateChild = function (parent) {
                        if (!parent || !parent.children.length) {
                            return;
                        }
                        var len = parent.children.length;
                        for (var index = 0; index < len; index++) {
                            var child = parent.children[index];
                            var notFind = child.getComponent(StateController_2);
                            if (!notFind) { //这里自己判断一些不需要遍历子节点的，比如列表
                                updateChild(child);
                            }
                            var select = child.getComponent(StateSelect_1.StateSelect);
                            if (!select) {
                                continue;
                            }
                            if (type == StateEnum_2.EnumUpdataType.state) {
                                select.updateState(itself);
                            }
                            else if (type == StateEnum_2.EnumUpdataType.name) {
                                select.updateCtrlName(itself.node);
                            }
                            else if (type == StateEnum_2.EnumUpdataType.selPage) {
                                select.updateCtrlPage(itself, value);
                            }
                            else if (type == StateEnum_2.EnumUpdataType.delete) {
                                select.updateDelete(itself);
                            }
                            else if (type == StateEnum_2.EnumUpdataType.init) {
                                select.updatePreLoad(itself);
                            }
                            else if (type == StateEnum_2.EnumUpdataType.prop) {
                                select.updateProp(itself);
                            }
                        }
                    };
                    updateChild(itself.node);
                };
                var StateController_2;
                __decorate([
                    property({ visible: false })
                ], StateController.prototype, "stateIdAuto", void 0);
                __decorate([
                    property({ visible: false })
                ], StateController.prototype, "_ctrlId", void 0);
                __decorate([
                    property(StateEnum_2.EnumStateName)
                ], StateController.prototype, "_selectedIndex", void 0);
                __decorate([
                    property(StateValue)
                ], StateController.prototype, "_pageNames", void 0);
                __decorate([
                    property(cc_3.CCString)
                ], StateController.prototype, "_ctrlName", void 0);
                __decorate([
                    property({ displayName: "name", tooltip: "控制器唯一名称" })
                ], StateController.prototype, "ctrlName", null);
                __decorate([
                    property({ type: StateEnum_2.EnumStateName, displayName: "selectedPage", tooltip: "当前选中的状态" })
                ], StateController.prototype, "selectedIndex", null);
                __decorate([
                    property({ type: StateValue, tooltip: "状态数量。数组内容为状态名称" })
                ], StateController.prototype, "states", null);
                StateController = StateController_2 = __decorate([
                    ccclass('StateController'),
                    executeInEditMode(true)
                ], StateController);
                return StateController;
            }(cc_3.Component));
            exports_16("StateController", StateController);
        }
    };
});
System.register("cocos/index", ["cocos/ResManager", "cocos/StateController", "cocos/StateEnum", "cocos/StateSelect", "cocos/UIManager", "cocos/UITool"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    function exportStar_3(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_17(exports);
    }
    return {
        setters: [
            function (ResManager_2_1) {
                exportStar_3(ResManager_2_1);
            },
            function (StateController_3_1) {
                exportStar_3(StateController_3_1);
            },
            function (StateEnum_3_1) {
                exportStar_3(StateEnum_3_1);
            },
            function (StateSelect_2_1) {
                exportStar_3(StateSelect_2_1);
            },
            function (UIManager_2_1) {
                exportStar_3(UIManager_2_1);
            },
            function (UITool_2_1) {
                exportStar_3(UITool_2_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("exports/cocos", ["cocos/index"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    function exportStar_4(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_18(exports);
    }
    return {
        setters: [
            function (cocos_1_1) {
                exportStar_4(cocos_1_1);
            }
        ],
        execute: function () {
        }
    };
});
// export * from '../fgui';
