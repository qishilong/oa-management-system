## 员工分析模块制作(一)



### 定义页面UI模板

1. **创建数量组件**

    ![image-20211119234445851](https://tva1.sinaimg.cn/large/008i3skNly1gwkw37gfoij32bg0kawfu.jpg)

2. **创建饼状图组件**

    ![image-20211119234517059](https://tva1.sinaimg.cn/large/008i3skNly1gwkw40xbnnj32560iwgn4.jpg)

    <img src="https://tva1.sinaimg.cn/large/008i3skNly1gwkw4gn6mfj31340hawf4.jpg" alt="image-20211119234544523" style="zoom:50%;" />

    <img src="/Users/hangang/Library/Application Support/typora-user-images/image-20211119234614333.png" alt="image-20211119234614333" style="zoom:50%;" />

3. **创建柱状图组件**

    ![image-20211119234647442](https://tva1.sinaimg.cn/large/008i3skNly1gwkw59wq4oj328s0ioacq.jpg)

    <img src="https://tva1.sinaimg.cn/large/008i3skNly1gwkw5qysorj31260i4wf1.jpg" alt="image-20211119234704219" style="zoom:50%;" />

4. **定义表格组件**

    <img src="https://tva1.sinaimg.cn/large/008i3skNly1gwkw6gbb4fj313u0is400.jpg" alt="image-20211119234751822" style="zoom:50%;" />





---



### 基本结构组件制作

- 员工数量组件

- 员工图表组件

    > 在制作组件时，需要查看后端返回结构，根据返回内容结构进行组件设计 ，员工分析接口需要角色认证，普通用户无法进行接口访问

    **接口地址：**  http://mock.duyiedu.com/project/128/interface/api/291

---



### 图表组件使用

- **echarts-for-react参考地址**：https://git.hust.cc/echarts-for-react/
- **echarts参考地址：**https://echarts.apache.org/zh/option.html#title

> 使用echarts-for-react插件可以在React中调用echarts接口直接渲染出Echarts图表，只要传入相关的参数和数据即可。



#### 组件的参数简介

- **`option`** (required, object)

这个是核心，是必须的，包含echarts图表的配置项和数据，如标题title、图例legend、提示框tooltip、x轴xAxis、y轴yAxis、series等，详见 http://echarts.baidu.com/option.html#title.

- **`notMerge`** (optional, object)

可选，是否不跟之前设置的 option 进行合并，默认为 false，即合并。

- **`lazyUpdate`** (optional, object)

可选，在设置完 option 后是否不立即更新图表，默认为 false，即立即更新。

- **`style`** (optional, object)

包含echarts图表的div的样式，默认是{height: '300px'}.

- **`className`** (optional, string)

包含echarts图表的div的类名. 可以根据需要自行配置类名，不同类配置不同的css。

- **`theme`** (optional, string)

应用的主题。可以是一个主题的配置对象，也可以是使用已经通过 [echarts.registerTheme](https://echarts.baidu.com/api.html#echarts.registerTheme) 注册的主题名称。

通过registerTheme注册主题：

```js
// import echarts
import echarts from 'echarts';
...
// register theme object
echarts.registerTheme('my_theme', {
  backgroundColor: '#f4cccc'
});
...
// render the echarts use option `theme`
<ReactEcharts
  option={this.getOption()}
  style={{height: '300px', width: '100%'}}
  className='echarts-for-echarts'
  theme='my_theme' />
```

- **`onChartReady`** (optional, function)

当图表准备好时，将图表作为参数传给回调函数

- **`loadingOption`** (optional, object)
- **`showLoading`** (optional, bool, default: false)

是否加载动画效果

- **`onEvents`** (optional, array(string=>function) )

**饼状图**

```js
  title: { text: title, left: 'left' },   //图表的标题
    tooltip: { trigger: 'item' },   // 鼠标滑过的处理
    legend: showSideBar && { orient: 'vertical', left: 'left', top: 'center' },  //样式处理
    series: [   // 一组数值以及他们映射成的图
      {
        name: title,
        type: 'pie',
        radius: isEmpty ? ['50%','70%']: '50%',  是否为空的圆心
        center: ['55%', '55%'],   
        data: 【renderList】,    // 需要渲染的数据
        roseType: isArea && 'area',    
        itemStyle: {
          emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' },
          normal: {
            label: { show: true, formatter: '{b}  ({d}%)' },
            labelLine: { show: true }
          }
        }
      }
    ]
```

**柱状图**

```js
  const option = {
    title: { text: title, },
    tooltip: { trigger: 'axis' },
    xAxis: [
      {
        type: 'category',
        data: renderData.xData,
        axisLabel: {
          interval: 0,
          formatter: function (value) {
            return br ? value.split("").join("\n") : value;
          },
        },
      }
    ],
    yAxis: [
      { type: 'value' }
    ],
    series: [
      {
        name: '人数', type: 'bar', data: renderData.yData, label: {
          show: true,
          precision: 1,
          position: 'top',
          valueAnimation: true,
        }
      }
    ]
  };
```





