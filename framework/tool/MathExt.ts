namespace CCF.MathExt {
    /** 两点获取角度 */
    export function getAngle(x0: number, y0: number, x1: number, y1: number) {
        let radian = getRadian(x0, y0, x1, y1);
        return radianToAngle(radian);
    }
    /** 两点获取弧度 */
    export function getRadian(x0: number, y0: number, x1: number, y1: number) {
        let radian = Math.atan2((y1 - y0), (x1 - x0));
        if (radian < 0) {
            radian += Math.PI * 2;
        }
        return radian;
    }
    /** 两点获取距离 */
    export function getDistance(x0: number, y0: number, x1: number, y1: number) {
        let result = (x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1);
        return Math.sqrt(result);
    }
    /**
     * 通过线段、角度、计算分解的xy
     * 坐标系中，y向下或向上为正，计算所得都一样
     * @param line 边
     * @param angle 角度
     * @param isRadian 是否弧度
     */
    export function getXYByLine(line: number, angle: number, isRadian?: boolean) {
        let radian = isRadian ? angle : angleToRadian(angle);
        let x = line * Math.cos(radian);
        let y = line * Math.sin(radian);
        return { x: x, y: y };
    }
    /** 角度转弧度 */
    export function angleToRadian(angle: number) {
        return angle * Math.PI / 180;
    }
    /** 弧度转角度 */
    export function radianToAngle(radian: number) {
        return radian * 180 / Math.PI;
    }

}