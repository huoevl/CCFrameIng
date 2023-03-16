/**
* -测试表
*/
export class TestVO {
	/** 1 */
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
	/** 测试5 */
	readonly str1: Readonly<number[]>;
	/** 积分id */
	readonly score: number;
	/** 打坐几小时 */
	readonly siteTime: number;
	/** 角色名 */
	readonly name: string;
	/** 角色名12 */
	readonly name12: string;
}