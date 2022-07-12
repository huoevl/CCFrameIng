/**
 * 开发中遇到的一些问题：
 * 1、节点没激活，不会执行：__preload()等生命周期函数
 * 2、一个对象里有“_”开头的key，不会被序列化
 * 3、代码修改，回到界面组件会先被销毁然后重新添加
 * 4、属性里对象的赋值，是克隆对象里的值，并不是改变指向的地址
 * 5、关闭编辑后再打开，uuid会改变
 * 6、编辑器删除节点，parent改变的监听也会收到，注意处理
 * 7、使用setTimeout的地方都是为了延迟执行
 * 
 * 
 * 控制器已知问题：
 * 1、改变文本只能在propvalue那里设置。从自带的string那里改变没有监听方法,
 * 2、改变UIOpacity组件的透明度同个问题。
 * 
 * 3、改变四元数也有问题，只做了改变欧拉角。
 * 4、不能使用ctrl+z（撤销），否则一些数据会没掉,
 * 5、好像删除不可逆
 */



import { CCClass, CCInteger, CCString, Component, Enum, Node, _decorator } from 'cc';
import { EDITOR } from 'cc/env';
import { EnumStateName, EnumUpdataType } from './StateEnum';
import { StateSelect } from './StateSelect';
const { ccclass, property, executeInEditMode } = _decorator;

Enum(EnumStateName)

@ccclass("stateValue")
export class StateValue {
    @property(CCString)
    name: string = "";
    @property({ type: CCInteger, readonly: true })
    stateId: number = 0;
    constructor(name: string, stateId: number) {
        let itself = this;
        itself.name = name;
        itself.stateId = stateId;
    }
}
@ccclass('StateCtrl')
@executeInEditMode(true)
export class StateCtrl extends Component {
    @property({ visible: false })
    private stateIdAuto = 0;
    /** 控制器唯一id，如果使用uuid每次打开编辑器就会变 */
    @property({ visible: false })
    _ctrlId = Date.now();
    /** 选中的状态下标 */
    @property(EnumStateName)
    private _selectedIndex: EnumStateName = 0;
    /** 状态名字列表 */
    @property(StateValue)
    private _pageNames: StateValue[] = [];
    /** 上一次选中的下标 */
    private _previousIndex: number = -1;
    /** 控制器名字 */
    @property(CCString)
    private _ctrlName: string = "";
    /** 是否正在改变 */
    changing?: boolean;


    __preload() {
        let itself = this;
        if (!EDITOR) {
            return;
        }
        if (!itself._pageNames.length) {
            itself._pageNames = [new StateValue("0", itself.stateIdAuto++), new StateValue("1", itself.stateIdAuto++)]
        }
        let array = itself.states.map((val, i) => {
            return { name: val.name, value: i };
        })
        CCClass.Attr.setClassAttr(itself, "selectedIndex", "enumList", array);
        // console.log(CCClass.Attr.getClassAttrs(itself)[`selectedIndex${CCClass.Attr.DELIMETER}enumList`])
        if (!itself._ctrlName) {
            itself.ctrlName = `ctrl_${Date.now().toString()}`;
        }
        itself.updateState(EnumUpdataType.init);
    }
    onLoad() {
        let itself = this;
        if (!EDITOR) {
            return;
        }
        setTimeout(() => {
            itself.updateState(EnumUpdataType.state)
        });
    }
    onDestroy() {
        let itself = this;
        itself.updateState(EnumUpdataType.delete)
    }

    @property({ displayName: "name", tooltip: "控制器唯一名称" })
    get ctrlName() {
        return this._ctrlName;
    }
    set ctrlName(value: string) {
        let itself = this;
        itself._ctrlName = value;
        if (EDITOR) {
            itself.updateState(EnumUpdataType.name);
        }
    }

    /** 选择的状态下标 */
    @property({ type: EnumStateName, displayName: "selectedPage", tooltip: "当前选中的状态" })
    public get selectedIndex() {
        return this._selectedIndex;
    }
    public set selectedIndex(value: EnumStateName) {
        let itself = this;
        if (itself._selectedIndex != value) {
            if (value > itself._pageNames.length - 1) {
                throw "index out of bounds:（越界） " + value;
            }
            itself.changing = true;
            itself._previousIndex = itself._selectedIndex;
            itself._selectedIndex = value;
            itself.updateState(EnumUpdataType.state);
            if (EDITOR) {
                itself.updateState(EnumUpdataType.prop);
            }
            itself.changing = false;
        }
    }

    @property({ type: StateValue, tooltip: "状态数量。数组内容为状态名称" })
    get states() {
        return this._pageNames;
    }
    private set states(value: StateValue[]) {
        if (!EDITOR) {
            return;
        }
        let itself = this;
        if (value.length < 2) {
            console.error("状态必须大于两个")
            return;
        }

        let oldLen = itself._pageNames.length;
        let newLen = value.length;
        let deleteIndex = -1;
        if (oldLen > newLen) {
            //被删除状态
            for (let index = 0; index < oldLen; index++) {
                let oldS = itself._pageNames[index];
                let newS = value[index];
                if (!newS || oldS.stateId != newS.stateId) {
                    //被删的index，更新数据
                    deleteIndex = index;
                    setTimeout(() => {
                        if (itself.selectedIndex >= index) {
                            itself.selectedIndex = itself.selectedIndex - 1;
                        }
                    })
                    break;
                }
            }
        } else if (newLen > oldLen) {
            //最新的几个没有值
            for (let index = itself._pageNames.length, len = value.length; index < len; index++) {
                let val = value[index];
                val.name = "" + itself.stateIdAuto;
                val.stateId = itself.stateIdAuto++;
            }
        }
        itself._pageNames = value;
        let stateMap: { [key: string]: boolean } = {};
        let array = value.map((val, i) => {
            if (val && stateMap[val.name]) {
                console.error("重复的状态值", val, i);
            }
            stateMap[val.name] = true;
            return { name: val.name, value: i };
        })
        itself.updateState(EnumUpdataType.selPage, deleteIndex)
        CCClass.Attr.setClassAttr(itself, "selectedIndex", "enumList", array);
    }


    /** 上一次的选中下标 */
    public get previsousIndex(): number {
        return this._previousIndex;
    }
    /** 选择的状态名字 */
    public get selectedPage(): string {
        if (this._selectedIndex == -1)
            return null;
        else
            return this._pageNames[this._selectedIndex].name;
    }
    public set selectedPage(val: string) {
        let itself = this;
        for (let index = 0, len = itself._pageNames.length; index < len; index++) {
            if (itself._pageNames[index].name == val) {
                itself.selectedIndex = index;
                return;
            }
        }
    }
    /** 更新状态 */
    private updateState(type: EnumUpdataType, value?: any) {
        let itself = this;
        let updateChild = function (parent: Node) {
            if (!parent || !parent.children.length) {
                return;
            }
            let len = parent.children.length;
            for (let index = 0; index < len; index++) {
                let child = parent.children[index];
                updateChild(child);
                let select = child.getComponent(StateSelect);
                if (!select) {
                    continue;
                }
                if (type == EnumUpdataType.state) {
                    select.updateState(itself);
                } else if (type == EnumUpdataType.name) {
                    select.updateCtrlName(itself.node);
                } else if (type == EnumUpdataType.selPage) {
                    select.updateCtrlPage(itself, value);
                } else if (type == EnumUpdataType.delete) {
                    select.updateDelete(itself);
                } else if (type == EnumUpdataType.init) {
                    select.updatePreLoad(itself);
                } else if (type == EnumUpdataType.prop) {
                    select.updateProp(itself);
                }
            }
        }
        updateChild(itself.node);
    }
}

