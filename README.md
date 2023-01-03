

## 本地搭建服务器环境

### 本地mongo数据库创建

#### 下载mongo

**下载地址** https://www.mongodb.com/try/download/community

<u>建议下载4.0.27版本</u>

**安装**

![image-20211101154624450](https://tva1.sinaimg.cn/large/008i3skNly1gwdrkq3lczj30cz09ut97.jpg)

.**安装完成后打开命令行运行  mongod  然后回车。**

![image-20211101154722726](https://tva1.sinaimg.cn/large/008i3skNly1gwdrku9x8lj30lg0attar.jpg)

**如果显示的是“mongod不是内部或外部命令”**

![img](https://tva1.sinaimg.cn/large/008i3skNly1gwdrky1fobj30cp024glg.jpg)

> 那么我们需要去配置环境变量，默认安装目录是`C:\Program Files\MongoDB\Server\4.0\bin`

<img src="https://tva1.sinaimg.cn/large/008i3skNly1gwdrl18gfwj30v30d70tr.jpg" alt="img" style="zoom: 80%;" />

![img](https://tva1.sinaimg.cn/large/008i3skNly1gwdrl4n160j30f10fu3z7.jpg)

**把刚才复制的路径粘贴进去确认即可！**



#### 使用mongo可视化工具

> 由于数据量比较大，方便查询，我们可以使用mongo可视化工具，studio3t <br/>
> 链接: https://pan.baidu.com/s/1p0w9eV_tQQfa8SSF6QroPw 提取码: kejh 
--来自百度网盘超级会员v6的分享

**连接本地数据**

<img src="https://adminimg.hyfarsight.com/image-20211101155450438.png" alt="image-20211101155450438" style="zoom:67%;" />



**数据库创建**

![image-20211101160145200](https://tva1.sinaimg.cn/large/008i3skNly1gwdrla65xhj310b0e342y.jpg)

**导入基础数据文件**

> 将本地保存的csv或json文件进行导入操作

![image-20211101161539645](https://tva1.sinaimg.cn/large/008i3skNly1gwdrld3q4rj30yj0f0q7f.jpg)



### 接口文档

- 接口文档地址：[http://mock.duyiedu.com/project/128/interface/api/285](http://mock.duyiedu.com/project/128/interface/api/285)

- 接口文档说明：

  - 分为两种形式接口，权限接口及非权限接口，权限接口前端在使用时需要在请求头添加`authorization:<token>`,非权限接口使用时不需要添加authorization

  - 权限接口在未传递或传递错误的authorization时，后端返回401状态码，前端直接跳转登录界面即可

    <img src="https://adminimg.hyfarsight.com/image-20211101135352643.png" alt="image-20211101135352643" style="zoom:80%;margin-left:0;" />

  - 接口返回内容中根据当前登录用户不同返回不同内容，管理员返回全部数据信息，普通用户返回当前登录员工指定信息内容



- 接口访问基础路径   协议://域名/api   **例：**  http:localhost:3000/api/login

- 本地创建monggodb数据库



### 数据请求测试

#### 使用代码+ui界面的形式进行接口测试

> 使用代码的形式进行接口的测试，需要保证以下几个基本条件

1. 本地服务的开启,保证后端服务工程为开启状态

2. 前端文件内进行本地服务跨域代理处理,umiirc.js文件配置请求代理

   ```js
     proxy: {
       '/api': {
         target: 'http://127.0.0.1:7001',
         changeOrigin: true,
       },
     }
   ```

3. 前端进行api接口调用

4. 需要进行接口的封装操作

   **封装fetch方法，支持post、get、put、delete方法调用**

#### 使用postman接口测试

**下载postman** [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

**使用postman进行接口测试**

![image-20211101162938797](https://tva1.sinaimg.cn/large/008i3skNly1gwdrlj4hy0j30oy0e70tv.jpg)
