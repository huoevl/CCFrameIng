### 工作上可以优化的地方
> 2022.5.20    
1. UI写代码定义类型的时候，不要用any
2. 自动代码格式化
3. 一些表格有除了有id列还可以有Key列，不用手动添加
4. 同上：颜色是否可以配表，读取====> ``` XXXConst.Id_Style.style_xxx ```
5. 封装按钮：直接在类里面  ``` tap_btn_xxx( ){  }```
   <br>同理可以封装其他： ``` click_list_xxx(){} ``` 点击列表项
6. 一些写法    
    ```typescript
   openView(xxx, param1,param2,param3)  ===改为===>
   interface IData_xxx{
       param1:number,
       param2:string,
       param3:number,
   }     
   openView(xxx, {param1,param2,param3}as IData_xxx)
   ```
> 2023.3.1   
1. 换个转表工具，用excel，做好类型定义，不允许随意配置，多语言
> 2023.5
1. 策划修改需求同步美术但是不同步客户端
2. 美术出图漏图
> 2023.8
1. 美术命名：不要用（-），用（_）
2. 美术示意图，找不到图片。
3. 同类型的图片切图及命名问题
4. 内存泄漏问题，或许可以从源头上解决
5. uiutil太杂
6. 打包太慢
7. 资源更新麻烦，需写个脚本
8. 
