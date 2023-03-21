local t ={
	["1"] = {id="1",int=12345678965,int1={1},int3={{{itemid=101,num=10},{itemid=102,num=20}},{{itemid=201,num=10},{itemid=202,num=20}}},str='“3"',str1={1.2,22}},
	["2"] = {id="2",int=-2,int1={2},int2={{key=1,value1=4}},str="测试1"},
	["3"] = {id="3",int=33,int3={{{itemid=101,num=10},{itemid=102,num=20}},{{itemid=201,num=10},{itemid=202,num=20}}},str="测'试'’1‘"},
	["4"] = {id="4",int=44,int1={4},int2={{key=1,value1=3},{key=2,value1=3}},str="测试1"},
	["-1"] = {id="-1",score=1001,siteTime=84,name="哈哈"}
}
return t