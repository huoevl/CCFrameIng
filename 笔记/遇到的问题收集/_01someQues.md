<center>工作中遇到的一些技术问题</center>

1. .bat命令的pause不起作用：[解决方案：前面加call](http://t.zoukankan.com/yayin-p-13691239.html)
   > mvn指令本身就是一个bat命令，在exit退出的时候，整个脚本进程将退出，同理其他一样。<br>
   > 比如：npx ts-node xxx.ts改为 call npx ts-node xxx.ts
2. 