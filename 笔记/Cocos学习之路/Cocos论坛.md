#### Cocos论坛的收藏

1. 问题：缺少 x86_64 选项 （回复：占比少，不支持了）  
    > x86 64相关帖子  
    > https://forum.cocos.com/t/google-play-64/82727  
    > https://forum.cocos.com/t/2-1-3-mumu/84087  
    > https://forum.cocos.com/t/creator-x86-64/82317/26  
    > https://forum.cocos.com/t/android-google-play-x64/83461  
2. 编译项目生成过多json文件（好像没解决）：
    > https://forum.cocos.org/t/json/36471/23  
3. [动态图集排列算法不合理, 浪费大量空间](https://forum.cocos.org/t/topic/135586)  
    > [【乐府】突破动态合图-你真的把动态合图用对了吗？](https://forum.cocos.org/t/topic/98157)  
4. [PSD转预设工具，帮你提高游戏开发效率](https://forum.cocos.org/t/psd/78660)  
    > [参考baum2的作者做了个cocos creator版的psd转UI的插件](https://forum.cocos.org/t/baum2-cocos-creator-psd-ui/78031)  
5. [分享apk批量打包脚本](https://forum.cocos.org/t/topic/138593)  
6. [一种入侵式的日志大法](http://lamyoung.com/javascript/2020/12/30/log/)   
    > 自动log函数执行次序的
7. [给项目瘦身, CocosCreator项目资源清理工具-AssetCleaner教程](https://forum.cocos.org/t/cocoscreator-assetcleaner/83747/1)  
8. [【干货分享】Creator开发应用App – 这里有你不知道的秘密](https://forum.cocos.org/t/topic/114696)  
    >  [cx-cocos项目地址：含完整框架和demo工程](https://github.com/blanking003/cx-cocos)  
9. DrawCall优化：（界面、列表）
    > 思路1：动态修改node的渲染顺序，将同图集和label渲染分开，就能达到优化drawcall的效果。这种思路是参考fairyGUI  
    > 思路2[性能优化1-列表渲染优化](https://forum.cocos.org/t/topic/133526)：  
    >> 最简单的做法：替换引擎中渲染流相关代码，将深度优先遍历改为层级优先遍历即可。
但这样会影响游戏中所有节点的渲染。所以我们需要一个稍稍复杂一点的方案：标记出特殊的列表节点，修改引擎中的相关代码，支持层级优先遍历。
在进行层级遍历时，需要分类每个层级的节点，才能在遍历完之后，进而遍历子节点。这里有两个方案：  
    a) 一开始就记住所有的节点（包括子节点），根据层级分类，渲染时直接读取即可。  
    b) 在渲染时才进行遍历。  
    各有优缺点，方案1由于缓存在渲染时会更快速，但在列表项进行了增加/删除时，需要同步更新列表，相反地，方案2慢一些但不需要维护列表。  

    > 文章1：[UI批量渲染优化](https://forum.cocos.org/t/ui/80026)（ 不支持原生，原生请看：   
    [1:【分享】利用PostRender实现分层合批渲染（附 Demo 和引擎源码解读）](https://forum.cocos.org/t/postrender-demo/95201)   
    [2：creator没有实现原本2d-x有的globalZOrder功能导致的问题](https://forum.cocos.org/t/creator-2d-x-globalzorder/93512) ）    
    文章2：[畅销 SLG《乱世王者》深度优化方案](https://mp.weixin.qq.com/s/4l12h5R7R23XlnstQuo9LA)  
    文章3：[Cocos Creator ScrollView 性能优化](https://mp.weixin.qq.com/s/XjjwbmCzTQZd6snN82Q8jA) 

10. 跨域： 
    > 浏览器桌面快捷方式-->右键-->属性-->目标，加上：**--args --disable-web-security  --user-data-dir=D:\chromeTemp**  （D:\chromeTemp这里可随便一个文件夹）
