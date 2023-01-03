## 项目打包构建

### 配置analyze

> 包模块结构分析工具，可以看到项目各模块的大小，按需优化。通过 `ANALYZE=1 umi build` 或 `ANALYZE=1 umi dev` 开启

![image-20211107204038741](https://adminimg.hyfarsight.com/image-20211107204038741.png)

**配置**

- 添加script启动命令

    ```js
      "scripts": {
        "analyze": "cross-env ANALYZE=1 umi build"
      },
    ```

- 安装 cross-env

    ```js
     npm install -g cross-env
    ```

- 通过命令 `npm run analyze ｜｜ yarn analyze` 即可运行，默认serve：http://127.0.0.1:8888

 **界面展示**

<img src="https://upload-images.jianshu.io/upload_images/18934134-367315494f7de918.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp" alt="img" style="zoom:50%;" />



**优化处理操作**

> - echart和echart渲染组件zrender体积较大
> - moment重复打包和无用语言多余打包
> - antd组件的打包分散重复



**实现方法**

> - splitChunks
>
>     - splitChunks下的chunks、minSize、minChunks会在cacheGroups里的配置继承，不过cacheGroups里的配置，如minChunks:1参数的话会覆盖splitChunks下的minChunks: 2配置，优先级高于splitChunks
>
> - chunks
>
>     - all: 不管文件是动态还是非动态载入，统一将文件分离。当页面首次载入会引入所有的包
>     - async： 将异步加载的文件分离，首次一般不引入，到需要异步引入的组件才会引入。
>     - initial：将异步和非异步的文件分离，如果一个文件被异步引入也被非异步引入，那它会被打包两次（注意和all区别），用于分离页面首次需要加载的包
>
> - priority
>
>     - 设置包的打包优先级，基本是在两个包同时包含一个插件会用到，priority大的会打包到这个里面
>
> - moment的优化处理
>
>     ```js
>         //过滤掉momnet的那些不使用的国际化文件
>         config.plugin("replace").use(require("webpack").ContextReplacementPlugin).tap(() => {
>             return [/moment[/\\]locale$/, /zh-cn/];
>         });
>     ```



### 优化方案处理

```js
 chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'async',
          minSize: 30000, //文件最小打包体积，单位byte，默认30000，若单个文件不满足会合并其他文件组成一个
          minChunks: 2, //最小使用到次数，超过2次执行
          automaticNameDelimiter: '.', //连接符
          cacheGroups: {
            vendors: {
              // 基本框架
              name: 'vendors',
              test: /^.*node_modules[\\/](?!react|react-dom|antd).*$/,
              chunks: 'all',
              priority: 10,
            },
            // echartsVenodr: {
            //     // 异步加载echarts包
            //     name: 'echartsVenodr',
            //     test: /(echarts|zrender)/,
            //     chunks: 'async',
            //     priority: 10, // 高于async-commons优先级
            // },
            'async-commons': {
              // 其余异步加载包
              chunks: 'async',
              minChunks: 2,
              name: 'async-commons',
              priority: 9,
            },
            commons: {
              // 其余同步加载包
              chunks: 'all',
              minChunks: 2,
              name: 'commons',
              priority: 8,
            },
          },
        },
      },
    });
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /zh-cn/];
      });
  },
```



### 路由模式选择

**history**

> - 类型：`String | [String, Object]`
> - 默认值：`browser`



### 指定输出路径

###  outputPath

- 类型：`String`
- 默认值：`./dist`

指定输出路径。

> 不允许设置 `src` 、 `public` 、 `pages` 、 `mock` 、 `config` 等约定目录







