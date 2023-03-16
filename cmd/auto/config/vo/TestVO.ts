/**
* -测试表
*/
export class TestVO {
	/**  */
	readonly id: string;
	/** 测试 */
	readonly int: number;
	/** 测试1 */
	readonly int1: Readonly<number[]>;
	/** 测试2 */
	readonly int2: Readonly<Readonly<number[]>[]>;
	/** 测试3 */
	readonly int3: Readonly<Readonly<Readonly<number[]>[]>[]>;
	/** 测试4 */
	readonly str: string;
}