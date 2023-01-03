## 员工详情组件制作

### 员工详情组件制作

**实现功能**

> - 展示选定员工详细信息
> - 实现员工的部分字段修改功能
> - 可删除当前指定员工
> - 字段输入检测
> - 图片上传功能实现

**使用到的三方+自己组件**

> - 抽屉组件`deawer`
> - 图片上传组件
> - 下拉搜索组件
> - 表单验证组件
> - 表单渲染组件

**状态使用**

> - 员工详情信息
> - 修改员工api调用
> - 初始化员工列表api调用
> - 图片上传token获取

**接口数据相关**

> - 部门列表结合
> - 职级列表集合
> - 删除图片
> - 上传图片
> - 员工修改
> - 检测员工账户名手机号码是否存在

---



### 创建公共组件抽屉-drawer组件

**实现功能**

> - 根据插槽不同，实现不同的表单节点渲染 ，并进行展示
> - 可进行当前模块指定内容删除功能
> - 在drawer组件内部，引入不同组件的渲染函数，实现多模块复用

**内部组件**

> - 头部公共内容展示组件
> - 该组件实现不同模块的头部信息展示，及删除当前组件功能
> - 所需参数：删除当前分类的api请求方法、弹窗的展示状态

```js
//- drawer组件
const DrawerComponent = ({ isShowDetailDialog, render }) => {
  return (
    <Drawer
      width={850}
      title="Basic Drawer"
      placement="right"
      visible={isShowDetailDialog}
      destroyOnClose={true}
    >
      {render()}
    </Drawer>
  )
}
export default DrawerComponent
```

**参数**

> 弹窗显示状态属性
>
> 表单节点



```js
const DrawerComponent = ({ isShowDetailDialog, render }) => {
  return (
    <Drawer
      width={850}
      title="Basic Drawer"
      placement="right"
      visible={isShowDetailDialog}
      destroyOnClose={true}
    >
      {render()}
    </Drawer>
  )
}
export default DrawerComponent

```

---

### 图片上传组件

**实现功能**

> - 缩略图展示
> - 图片预览
> - 图片上传远端仓库（单文件上传）
> - 向父组件发送上传成功的响应地址
> - 同一组件进行文件上传时，删除之前已经上传图片，接口参考方法：http://mock.duyiedu.com/project/128/interface/api/426

**参数**

> 默认URL，已经存在ur时，进行缩略图展示，否则进行默认图片展示
>
> uploadToken  文件上传token值，案例中使用前端直传的方式进行文件上传，所以需要提前进行token值得获取，本案例中使用到七牛得对象存储
>
> 七牛对象存储参考文档：https://www.qiniu.com/

**七牛文件上传token获取方法**

> - 请求接口参考文档：http://mock.duyiedu.com/project/128/interface/api/423
> - 由于token在多模块内部进行使用，可通过全局model进行token状态保存

