### 工作上可以优化的地方
> 2022.5.20    
1. UI写代码定义类型的时候，不要用any
2. 自动代码格式化
3. 一些表格有除了有id列还可以有Key列，不用手动添加
4. 同上：颜色是否可以配表，读取====> ``` XXXConst.Id_Style.style_xxx ```
5. 封装按钮：直接在类里面  ``` tap_btn_xxx( ){  }```
   <br>同理可以封装其他： ``` click_list_xxx(){} ``` 点击列表项
6. 一些写法 <br> 
    ```typescript
   openView(xxx, param1,param2,param3)  ======>
   interface IData_xxx{
       param1:number,
       param2:string,
       param3:number,
   } <br>
   openView(xxx, {param1,param2,param3}as IData_xxx)
   ```
> 2023.3.1   
1. 换个转表工具，用excel，做好类型定义，不允许随意配置，多语言
2. 
