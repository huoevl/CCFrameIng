import { Component, director, Mask, Node, NodePool, Size, UITransform, Widget, widgetManager, _decorator, __private } from 'cc';
import { ScrollPane } from './ScrollContent';
const { ccclass, property, executeInEditMode } = _decorator;
interface ItemInfo {
    width: number;
    height: number;
    obj?: Node;
    updateFlag: number;
    selected?: boolean;
}
/** 布局类型 */
export enum ListLayoutType {
    /** 单列竖排 */
    SingleColumn,
    /** 单行横排 */
    SingleRow,
    /** 横向流动 */
    FlowHorizontal,
    /** 竖向流动 */
    FlowVertical,
    /** 分页 */
    Pagination
}
/** 选择模式 */
export enum ListSelectionMode {
    /** 单选、必须有toggle才生效 */
    Single,
    /** 多选，按住shift */
    Multiple,
    /** 多选，单击 */
    Multiple_SingleClick,
    /** 无 */
    None
}
/** 水平对齐 */
export enum AlignType {
    Left,
    Center,
    Right
}
/** 垂直对齐 */
export enum VertAlignType {
    Top,
    Middle,
    Bottom
}



@ccclass('ListComponent')
@executeInEditMode(true)
export class ListComponent extends Component {
    /** 渲染函数 */
    public itemRenderer: (index: number, item: Node) => void;
    /** 渲染项 */
    public itemProvider: (index: number) => string;

    /** 点击项目时，自动滚动到它全部可见 */
    public scrollItemToViewOnClick: boolean = true;
    /** 折叠隐藏的项目 */
    public foldInvisibleItems: boolean = false;

    /** 布局方式 */
    private _layout: ListLayoutType;
    //行列数
    private _lineCount: number = 0;
    private _columnCount: number = 0;
    //行列间隔
    private _lineGap: number = 0;
    private _columnGap: number = 0;
    /** 默认列表项 */
    private _defaultItem: string;
    private _autoResizeItem: boolean;//自动调整列表项大小
    private _selectionMode: ListSelectionMode;
    private _align: AlignType;
    private _verticalAlign: VertAlignType;
    // private _selectionController?: Controller;

    private _lastSelectedIndex: number = 0;
    // private _pool: GObjectPool;
    private _pool: NodePool;

    //Virtual List support虚拟列表支持
    private _virtual?: boolean;
    private _loop?: boolean;
    private _numItems: number = 0;
    private _realNumItems: number = 0;
    private _firstIndex: number = 0; //the top left index 顶部或者左边的索引
    private _curLineItemCount: number = 0; //item count in one line
    /** 只用在页面模式，表示垂直方向的项目数 */
    private _curLineItemCount2: number = 0; //只用在页面模式，表示垂直方向的项目数
    private _itemSize?: Size;
    private _virtualListChanged: number = 0; //1-content changed, 2-size changed
    private _virtualItems?: Array<ItemInfo>;
    private _eventLocked?: boolean;
    private itemInfoVer: number = 0; //用来标志item是否在本次处理中已经被重用了

    //一些测试

    //一些新增
    public _scrollPane?: ScrollPane;
    protected _trackBounds: boolean;
    protected _boundsChanged: boolean;

    @property({ type: Node, readonly: true, tooltip: "遮罩容器节点" })
    mask: Node;
    @property({ type: Node, readonly: true, tooltip: "滚动容器节点" })
    content: Node;

    // public setBoundsChangedFlag(): void {
    //     if (!this._scrollPane && !this._trackBounds)
    //         return;

    //     if (!this._boundsChanged) {
    //         this._boundsChanged = true;

    //         this.callLater(this.refresh);
    //     }
    // }
    // private refresh(dt?: number): void {
    //     if (!isNaN(dt)) {
    //         // let _t = <GComponent>(this.node["$gobj"]);
    //         // _t.refresh();
    //         this.refresh()
    //         return;
    //     }

    //     if (this._boundsChanged) {
    //         var len: number = this.node.children.length;
    //         if (len > 0) {
    //             for (var i: number = 0; i < len; i++) {
    //                 var child = this.node.children[i];
    //                 child.ensureSizeCorrect();
    //             }
    //         }

    //         this.updateBounds();
    //     }
    // }

    public callLater(callback: Function, delay?: number): void {
        if (!director.getScheduler().isScheduled(callback, this))
            this.scheduleOnce(callback, delay);
    }

    public getOrAddComponentSafe<T extends Component>(node: Node, comp: __private._types_globals__Constructor<T>) {
        let _comp = node.getComponent(comp);
        if (!_comp) {
            _comp = node.addComponent(comp);
        }
        return _comp
    }

    public onEnable() {
        let itself = this;
        itself._trackBounds = true;
        itself._pool = new NodePool();
        itself._layout = ListLayoutType.SingleColumn;
        itself._autoResizeItem = true;
        itself._lastSelectedIndex = -1;
        itself._selectionMode = ListSelectionMode.Single;

        itself.initMask();

        itself._align = AlignType.Left;
        itself._verticalAlign = VertAlignType.Top;
    }
    private initMask() {
        let itself = this;
        if (!itself.content) {
            itself.content = new Node("content");
        }
        if (!itself.mask) {
            itself.mask = new Node("View");
        }
        itself.getOrAddComponentSafe(itself.mask, UITransform).setAnchorPoint(0, 1);
        itself.getOrAddComponentSafe(itself.content, UITransform).setAnchorPoint(0, 1);
        itself.mask.parent = itself.node;
        itself.content.parent = itself.mask;
        console.error("哈哈哈")
        itself._scrollPane = itself.getOrAddComponentSafe(itself.content, ScrollPane);
        itself.getOrAddComponentSafe(itself.mask, Mask);
        let widget = itself.getOrAddComponentSafe(itself.mask, Widget);
        widget.target = itself.node;
        widget.alignFlags = 0;
        widget.alignFlags = widgetManager.AlignFlags.TOP | widgetManager.AlignFlags.BOT | widgetManager.AlignFlags.LEFT | widgetManager.AlignFlags.RIGHT;
        widget.top = widget.bottom = widget.left = widget.right = 0;
        widget["_lockFlags"] = 45;
    }

    // public onDestroy(): void {
    //     this.unschedule(this._refreshVirtualList);
    //     this._pool.clear();
    //     super.onDestroy();
    // }

    // public get layout(): ListLayoutType {
    //     return this._layout;
    // }

    // public set layout(value: ListLayoutType) {
    //     if (this._layout != value) {
    //         this._layout = value;
    //         this.setBoundsChangedFlag();
    //         if (this._virtual)
    //             this.setVirtualListChangedFlag(true);
    //     }
    // }

    // private setVirtualListChangedFlag(layoutChanged: boolean): void {
    //     if (layoutChanged)
    //         this._virtualListChanged = 2;
    //     else if (this._virtualListChanged == 0)
    //         this._virtualListChanged = 1;

    //     this.callLater(this._refreshVirtualList);
    // }
    // private _refreshVirtualList(dt?: number): void {
    //     if (!isNaN(dt)) {
    //         // let _t = <GList>(this.node["$gobj"]);
    //         // _t._refreshVirtualList();
    //         this._refreshVirtualList()
    //         return;
    //     }

    //     var layoutChanged: boolean = this._virtualListChanged == 2;
    //     this._virtualListChanged = 0;
    //     this._eventLocked = true;

    //     if (layoutChanged) {
    //         if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.SingleRow)
    //             this._curLineItemCount = 1;
    //         else if (this._layout == ListLayoutType.FlowHorizontal) {
    //             if (this._columnCount > 0)
    //                 this._curLineItemCount = this._columnCount;
    //             else {
    //                 this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.width + this._columnGap));
    //                 if (this._curLineItemCount <= 0)
    //                     this._curLineItemCount = 1;
    //             }
    //         }
    //         else if (this._layout == ListLayoutType.FlowVertical) {
    //             if (this._lineCount > 0)
    //                 this._curLineItemCount = this._lineCount;
    //             else {
    //                 this._curLineItemCount = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.height + this._lineGap));
    //                 if (this._curLineItemCount <= 0)
    //                     this._curLineItemCount = 1;
    //             }
    //         }
    //         else //pagination
    //         {
    //             if (this._columnCount > 0)
    //                 this._curLineItemCount = this._columnCount;
    //             else {
    //                 this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.width + this._columnGap));
    //                 if (this._curLineItemCount <= 0)
    //                     this._curLineItemCount = 1;
    //             }

    //             if (this._lineCount > 0)
    //                 this._curLineItemCount2 = this._lineCount;
    //             else {
    //                 this._curLineItemCount2 = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.height + this._lineGap));
    //                 if (this._curLineItemCount2 <= 0)
    //                     this._curLineItemCount2 = 1;
    //             }
    //         }
    //     }

    //     var ch: number = 0, cw: number = 0;
    //     if (this._realNumItems > 0) {
    //         var i: number;
    //         var len: number = Math.ceil(this._realNumItems / this._curLineItemCount) * this._curLineItemCount;
    //         var len2: number = Math.min(this._curLineItemCount, this._realNumItems);
    //         if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
    //             for (i = 0; i < len; i += this._curLineItemCount)
    //                 ch += this._virtualItems[i].height + this._lineGap;
    //             if (ch > 0)
    //                 ch -= this._lineGap;

    //             if (this._autoResizeItem)
    //                 cw = this._scrollPane.viewWidth;
    //             else {
    //                 for (i = 0; i < len2; i++)
    //                     cw += this._virtualItems[i].width + this._columnGap;
    //                 if (cw > 0)
    //                     cw -= this._columnGap;
    //             }
    //         }
    //         else if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowVertical) {
    //             for (i = 0; i < len; i += this._curLineItemCount)
    //                 cw += this._virtualItems[i].width + this._columnGap;
    //             if (cw > 0)
    //                 cw -= this._columnGap;

    //             if (this._autoResizeItem)
    //                 ch = this._scrollPane.viewHeight;
    //             else {
    //                 for (i = 0; i < len2; i++)
    //                     ch += this._virtualItems[i].height + this._lineGap;
    //                 if (ch > 0)
    //                     ch -= this._lineGap;
    //             }
    //         }
    //         else {
    //             var pageCount: number = Math.ceil(len / (this._curLineItemCount * this._curLineItemCount2));
    //             cw = pageCount * this.viewWidth;
    //             ch = this.viewHeight;
    //         }
    //     }

    //     this.handleAlign(cw, ch);
    //     this._scrollPane.setContentSize(cw, ch);

    //     this._eventLocked = false;

    //     this.handleScroll(true);
    // }

}


