## 员工详情组件制作

### 表单静态数据定义

```js
import { mapData } from '../utils/mapData';

export default [
  [
    {
      renderType: 'input',
      itemName: 'userName',
      initVal: '请输入员工姓名',
      labelTxt: '姓名',
    },
    {
      renderType: 'input',
      itemName: 'accountName',
      initVal: '请输入员工账户名',
      labelTxt: '账户名',
    },
  ],
  [
    {
      renderType: 'input',
      itemName: 'password',
      initVal: '请填写密码',
      labelTxt: '初始密码',
    },
    {
      renderType: 'input',
      itemName: 'mobile',
      initVal: '请输入联系电话',
      labelTxt: '联系电话',
    },
  ],
  [
    {
      renderType: 'input',
      itemName: 'salary',
      initVal: '请输入薪资',
      labelTxt: '薪资',
    },
    {
      renderType: 'input',
      itemName: 'hometown',
      initVal: '请填写籍贯',
      labelTxt: '籍贯',
    },
  ],
  [
    {
      rule: 'datedRule',
      renderType: 'date',
      itemName: 'onboardingTime',
      initVal: '入职时间',
      labelTxt: '入职时间',
    },
    {
      rule: 'genderRule',
      renderType: 'select',
      itemName: 'gender',
      initVal: '请选择性别',
      labelTxt: '性别',
      optionData: mapData.gender,
    },
  ],
  [
    {
      renderType: 'input',
      itemName: 'idNumber',
      initVal: '请填写身份证号',
      labelTxt: '身份证号',
    },
    {
      renderType: 'input',
      itemName: 'bankNumber',
      initVal: '请输入银行卡号',
      labelTxt: '银行卡号',
    },
  ],
  [
    {
      renderType: 'popover',
      itemName: 'departmentName',
      initVal: '请选择部门',
      labelTxt: '部门',
      optionName: 'departmentName',
      url: 'getDepartmentList',
    },
    {
      renderType: 'popover',
      itemName: 'levelName',
      initVal: '请选择职级',
      labelTxt: '职级',
      optionName: 'levelName',
      url: 'getLevelList',
    },
  ],
  [
    { itemName: 'department', renderType: 'input', style: { display: 'none' } },
    { itemName: 'level', renderType: 'input', style: { display: 'none' } },
  ],
  [
    {
      renderType: 'select',
      itemName: 'education',
      initVal: '请选择员工学历',
      labelTxt: '员工学历',
      optionData: mapData.education,
      optionName: 'val',
    },
    {
      itemName: 'marriage',
      initVal: '请选择婚姻状况',
      renderType: 'select',
      labelTxt: '婚姻状况',
      optionData: mapData.marriage,
      optionName: 'val',
    },
  ],
  [
    {
      rule: 'graduatedRule',
      itemName: 'graduatedSchool',
      initVal: '请输入毕业院校',
      labelTxt: '毕业院校',
      renderType: 'input',
      type: 'input',
    },
    {
      rule: 'avatarRule',
      labelTxt: '员工照片',
      type: 'upload',
      renderType: 'upload',
      itemName: 'avatar',
    },
  ],
];

```



### 下拉搜索组件制作

**实现功能**

> - 展示不同数据列表内容
> - 可进行内容搜索
> - 点击选中之后进行内容传递获取

**状态依赖**

> - 搜索框默认展示文字信息
> - 请求查询字符串类型
> - 获取列表接口地址
> - 点击触发收集信息函数

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

