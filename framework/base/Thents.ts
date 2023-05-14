namespace CCF {
    /** 执行类型 */
    const enum ExecType {
        /** 函数 顺序执行 */
        add = 1,
        /** 数组 并行 */
        each = 2,
        /** 数组 并行 限制一次几个*/
        eachLimit = 3,
        /** 数组串行 */
        eachSeries = 4,
        /** 函数数组 并行 */
        parallel = 5,
        /** 函数数组 并行 限制一次几个 */
        parallelLimit = 6,
        /** 函数数组 串行 */
        parallelSeries = 7,
    }
    /** 执行列表接口 */
    interface IExecList {
        /** 执行类型 */
        type: ExecType;
        /** 执行数据 非数组只有一个函数*/
        list: any[];
        /** 迭代器 */
        iterator?: Function;
        /** 限制数量 0为不限制*/
        limit?: number;
    }
    export class Thents {
        /** 是否停止 */
        private isStop: boolean;
        /** 执行顺序数据 */
        private execList: IExecList[];
        /** 是否正在执行 */
        private isExec: boolean;
        /** 链式核心continuation 函数 */
        private cont: Function;
        /** 函数结尾 */
        private fin: Function;

        /** 异步流程控制库 cb里的参数不能是函数，否则不能停止*/
        constructor() {
            let self = this;
            self.isStop = false;
            self.isExec = false;
            self.execList = [];
            self.cont = self.continuation;
            self.fin = null;
        }

        /** cb回调 当它执行说明进行下一链 any数组也仅执行一次*/
        private continuation(reson?: any, value?: any) {
            let self = this;
            if (reson != undefined && (Object.prototype.toString.call(reson) !== "[object Function]")) {
                self.onOver(reson);
                return;
            }
            self.forList();
        }
        //===================public外部类=================================
        /** 函数 顺序执行 */
        add(fn?: (cb: Function) => any) {
            let self = this;
            self.addToList(ExecType.add, [fn]);
            return self;
        }
        /** 将 array 中的值应用于 iterator 函数（同步或异步），并行执行 */
        each(arr?: any[], iterator?: (cb: Function, value?: any, index?: number, array?: any[]) => any) {
            let self = this;
            self.addToList(ExecType.each, arr, iterator);
            return self;
        }
        /** 将 array 中的值应用于 iterator 函数（同步或异步），并行执行，最大并行数量为 limit */
        eachLimit(arr?: any[], iterator?: (cb: Function, value?: any, index?: number, array?: any[]) => any, limit?: number) {
            let self = this;
            self.addToList(ExecType.eachLimit, arr, iterator, limit);
            return self;
        }
        /** 将 array 中的值应用于 iterator 函数（同步或异步），串行执行 */
        eachSeries(arr?: any[], iterator?: (cb: Function, value?: any, index?: number, array?: any[]) => any) {
            let self = this;
            self.addToList(ExecType.eachSeries, arr, iterator);
            return self;
        }
        /** 函数数组（同步或异步），并行执行 */
        parallel(tasks?: ((cb: Function) => any)[]) {
            let self = this;
            self.addToList(ExecType.parallel, tasks);
            return self;
        }
        /** 函数数组（同步或异步），并行执行，最大并行数量为 limit 不传或者0为不限制 */
        parallelLimit(tasks?: ((cb: Function) => any)[], limit?: number) {
            let self = this;
            self.addToList(ExecType.parallelLimit, tasks, null, limit);
            return self;
        }
        /** 函数数组（同步或异步），串行执行 */
        parallelSeries(tasks?: ((cb: Function) => any)[]) {
            let self = this;
            self.addToList(ExecType.parallelSeries, tasks);
            return self;
        }
        /** 无论上一链是否存在 error，均进入 fn 执行 */
        finally(fn?: (cb?: Function, err?: any) => any) {
            let self = this;
            self.fin = fn;
            return self;
        }
        /** 用于捕捉 error */
        private onError(err: any) {
            console.error("Quque catch error : ", err);
            throw err;
        }
        /** 数组error */
        private onErrorArr(obj: any, method: any) {
            let self = this;
            let err = new Error('The argument ' + (obj && obj.toString()) + ' in "' + method + '" is not Array!')
            if (self.fin) {
                self.FinExec(err);
            } else {
                throw err;
            }
        }
        /** 用户自定义cb reson */
        private onOver(reson: any) {
            console.error("结束: ", reson);
        }
        private addToList(type: ExecType, list: any[], iterator?: Function, limit?: number) {
            let self = this;
            let map = {} as IExecList;
            map.type = type;
            map.list = list;
            map.iterator = iterator;
            map.limit = limit;
            self.execList.push(map);
        }
        //===================逻辑开始=================================
        /** 开始执行顺序流 */
        start() {
            let self = this;
            if (self.isExec) {
                self.onError("已经在执行中...");
                return;
            }
            self.isExec = true;
            self.isStop = false;
            self.forList();
        }
        /** 停止执行 */
        stop(fn?: Function, reson?: any) {
            let self = this;
            if (fn) {
                self.carry(null, fn);
            }
            self.isStop = true;
            self.isExec = false;
            self.cont(reson);
        }
        /** 遍历执行 */
        private forList() {
            let self = this;
            if (self.isStop) {
                return;//停止
            }
            if (!self.execList.length) {//结束
                if (self.fin) {
                    self.FinExec();
                }
                return;
            }
            let map = self.execList.shift();
            switch (map.type) {
                case ExecType.add: {
                    let fn = map.list[0];
                    self.carry(null, fn, self.cont.bind(self));
                } break;
                case ExecType.each: {
                    self.defer(null, function () {
                        self.carry(null, self.parallelExec.bind(self), self.arrToFunction(map.list, map.iterator));
                    })
                } break;
                case ExecType.eachLimit: {
                    self.defer(null, function () {
                        self.carry(null, self.parallelLimitExec.bind(self), self.arrToFunction(map.list, map.iterator), map.limit);
                    })
                } break;
                case ExecType.eachSeries: {
                    self.defer(null, function () {
                        self.carry(null, self.parallelSeriesExec.bind(self), self.arrToFunction(map.list, map.iterator));
                    })
                } break;
                case ExecType.parallel: {
                    self.defer(null, function () {
                        self.carry(null, self.parallelExec.bind(self), map.list);
                    })
                } break;
                case ExecType.parallelLimit: {
                    self.defer(null, function () {
                        self.carry(null, self.parallelLimitExec.bind(self), map.list, map.limit);
                    })
                } break;
                case ExecType.parallelSeries: {
                    self.defer(null, function () {
                        self.carry(null, self.parallelSeriesExec.bind(self), map.list);
                    })
                } break;
                default: {
                    self.onError("非法错误");
                    return;
                } break;
            }
        }
        //===================执行类=================================
        private arrToFunction(arr: any[], iterator: Function) {
            let fnArr = [];
            let fn = function (value: any, index: number, array: any[]) {
                return function (cb: Function) {
                    iterator(cb, value, index, array);
                }
            }
            for (let i = 0; i < arr.length; i++) {
                fnArr.push(fn(arr[i], i, arr));
            }
            return fnArr;
        }
        private parallelExec(tasks: Function[]) {
            let self = this;
            if (Object.prototype.toString.call(tasks) !== "[object Array]") {
                return self.onErrorArr(tasks, 'parallel');
            }
            let len = tasks.length;
            if (len <= 0) {
                return self.cont();
            }
            for (let i = 0, length = len; i < length; i++) {
                self.carry(null, tasks[i], getNext(i));
            }
            function getNext(index: number) {
                function next(err: any, value: any) {
                    if (len <= 0) return;
                    if (err) {
                        len = 0;
                        self.cont(err);
                    } else {
                        return !--len && self.cont();
                    }
                }
                return next;
            }
        }
        private parallelLimitExec(tasks: Function[], limit: number) {
            let self = this;
            if (!limit) {
                self.parallelExec(tasks);
                return;
            }
            if (Object.prototype.toString.call(tasks) !== "[object Array]") {
                return self.onErrorArr(tasks, 'parallelLimit');
            }
            let len = tasks.length;
            if (len <= 0) {
                return self.cont();
            }
            if (len < limit) {
                limit = len;
            }
            let tempIndex = limit - 1;
            for (let i = 0; i < limit; i++) {
                self.defer(null, tasks[i], getNext(i));
            }
            function getNext(index: number) {
                function next(err: any, value: any) {
                    if (len <= 0) return;
                    if (err) {
                        len = 0;
                        self.cont(err);
                    } else {
                        ++tempIndex;
                        let fn = tasks[tempIndex];
                        fn && self.defer(null, fn, getNext(tempIndex));
                        return !--len && self.cont();
                    }
                }
                return next;
            }
        }
        private parallelSeriesExec(tasks: Function[]) {
            let self = this;
            if (Object.prototype.toString.call(tasks) !== "[object Array]") {
                return self.onErrorArr(tasks, 'parallelSeries');;
            }
            let len = tasks.length;
            if (len <= 0) {
                return self.cont();
            }
            let tempIndex = 0;
            self.carry(null, tasks[tempIndex], getNext(tempIndex));
            function getNext(index: number) {
                function next(err: any, value: any) {
                    if (len <= 0) return;
                    if (err) {
                        len = 0;
                        self.cont(err);
                    } else {
                        ++tempIndex;
                        let fn = tasks[tempIndex];
                        fn && self.carry(null, fn, getNext(tempIndex));
                        return !--len && self.cont();
                    }
                }
                return next;
            }
        }
        FinExec(err?: any) {
            let self = this;
            self.fin(function (error?: any) {
                if (error) {
                    self.cont(error);
                } else {
                    return self.cont();
                }
            }, err);
        }
        //===================工具类=================================
        /** 同步执行函数 */
        private carry(errorHandler: Function, fn: Function, ...param: any[]) {
            let self = this;
            if (self.isStop) {
                return;
            }
            try {
                fn.apply(null, self.slice(arguments, 2));
            } catch (err) {
                if (self.fin) {
                    self.FinExec(err);
                    return;
                }
                if (errorHandler) {
                    errorHandler(err);
                } else {
                    self.onError(err);
                }
            }
        }
        /** 异步执行函数 同时捕捉异常 */
        private defer(errorHandler: Function, fn: Function, ...param: any[]) {
            let self = this;
            if (self.isStop) {
                return;
            }
            var args = arguments;
            self.nextTick(function () {
                self.carry.apply(self, args)
            });
        }
        /** 异步执行函数 */
        private nextTick(fn: () => void, ...param: any[]) {
            let self = this;
            let arr = self.slice(arguments, 1);
            setTimeout(fn, 0, arr);
        }
        /**  
         * 将 `arguments` 转成数组，效率比 `[].slice.call` 高很多
         * https://github.com/teambition/then.js/blob/master/then.js
         */
        private slice(args: any[] | IArguments, start: number) {
            start = start || 0
            if (start >= args.length) return []
            var len = args.length
            var ret = Array(len - start)
            while (len-- > start) ret[len - start] = args[len]
            return ret
        }
    }
}
