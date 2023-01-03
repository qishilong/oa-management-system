## 员工列表模块制作（一）



### 模块功能实现

> 1. 员工列表展示
> 2. 修改员工部分字段
> 3. 员工详情展示
> 4. 指定员工的相关表格展示（绩效、考核、奖惩）
> 5. 收集员工信息，并实现新增员工
> 6. 根据指定字段进行员工查询

---

### 接口数据处理

**该模块涉及基本接口请求共计5个**

- 员工列表
- 员工详情
- 员工删除
- 新增员工
- 修改员工信息

> 接口参考文档地址：[http://mock.duyiedu.com/project/128/interface/api/cat_336](http://mock.duyiedu.com/project/128/interface/api/cat_336)

**其他接口请求**

- 文件上传token获取   http://mock.duyiedu.com/project/128/interface/api/423
- 当前员工绩效考核记录获取  http://mock.duyiedu.com/project/128/interface/api/420
- 当前员工奖惩记录获取   http://mock.duyiedu.com/project/128/interface/api/405
- 当前员工调薪记录获取   http://mock.duyiedu.com/project/128/interface/api/396

---

### 接口API定义

**services文件夹下创建员工请求文件，实现方法所需接口api定义 如下demo:**

```css
import ajax from '../http.js';

// - 获取员工列表
export const getStaffList = (params = {}) => ajax.post('/getStaff', params);

```

*可通过postman进行接口调试操作*

---

### 模块内公共状态定义

**状态集合**

> - staffList   员工列表
> - staffTotal  当前员工总数
> - staffDetail  员工详细信息

**状态管理处理方法**

> - 获取员工列表
> - 获取员工详情

```js
 *_initStaffList ({ payload }, { put, call }) {
      const { data } = yield call($http.getStaffList, payload);
      yield put({
        type: 'saveStaff',
        payload: data,
      });
    }
```

---



### 基本结构制作

#### 公共组件制作

1. **公共处理header组件制作**

    <u>实现功能</u>

    - 展示当前列表项数据长度
    - 全局新增弹窗打开
    - 改变当前展示页内容
    - 当前显示列表页数
    - 删除当前选定列表项内容

    <u>需要使用状态</u>

    - 全局选定的ids

#### 页面使用组件制作

- 表格组件
- 员工详情组件
- 头部新增及分页组件
- 侧边栏搜索组件

> 实现个组件文件定义
