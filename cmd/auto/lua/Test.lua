local t ={
	[1] = {id=1,int=1.1,int1={1},int3={{{item=101,num=10},{item=102,num=20}},{{item=201,num=10},{item=202,num=20}}},str='“3"',str1={{'"哈哈"','"22"'}}},
	[2] = {id=2,int=-2,int1={2},int2={{key=1,value1=4}},str="测试1"},
	[3] = {id=3,int=33,int3={{{item=101,num=10},{item=102,num=20}},{{item=201,num=10},{item=202,num=20}}},str="测'试'’1‘"},
	[4] = {id=4,int=44,int1={4},int2={{key=1,value1=3},{key=2,value1=3}},str="测试1"},
	[-1] = {id=-1,int1={0},int2={{key=1,value1=21},{key=2},{key=4}},int3={{{item=101,num=10},{item=102,num=20}},{{item=201,num=10},{item=202,num=20}}},str="哈地方[\n]a\b\t卧槽\"a\"《\'[style]'》\"<stryle>",str1={{"1"},{"2"},{'"哈哈\n呵呵a"',' "b"'},{""}},str2={{"1"}}}
}
return t