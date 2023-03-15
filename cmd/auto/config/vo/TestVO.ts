/**
* -测试表
*/
export class TestVO {
	/**  */
	readonly id: number;
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
	/** 测试5 */
	readonly str1: Readonly<Readonly<string[]>[]>;
	/** 测试6 */
	readonly str2: Readonly<Readonly<string[]>[]>;
	/** 测试7 */
	readonly str3: Readonly<Readonly<Readonly<string[]>[]>[]>;
	/** 测试8 */
	readonly loc: string;
	/** 测试9 */
	readonly loc1: Readonly<string[]>;
	/** 测试10 */
	readonly loc2: Readonly<Readonly<string[]>[]>;
	/** 测试11 */
	readonly loc3: Readonly<Readonly<Readonly<string[]>[]>[]>;
}