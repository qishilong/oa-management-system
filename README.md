## 调薪模块制作

### 数据获取

> **调薪模块涉及接口共计5个**
>
> - 调薪列表
> - 调薪详情
> - 删除调薪
> - 新增调薪
> - 修改调薪
>
> 接口参考地址：http://mock.duyiedu.com/project/128/interface/api/cat_364

---



### 接口API定义

**services文件夹下创建调薪请求文件，实现方法所需接口api定义 如下demo:**

```js
import ajax from '../http.js';

// - 获取薪资列表
export const getSalaryAdjustment = (params = {}) => {
  const reqParams = params.queryData ? params.queryData : {};
  delete params.queryData;
  return ajax.get('/salaryAdjustment', { ...params, ...reqParams })
};
```

---



### 模块内公共状态定义

**状态集合**

> - salaryList   调薪列表
> - salaryTotal  当前调薪总数
> - salaryDetail  调薪详细信息
> - ids 删除调薪的id集合



**状态管理api**

> - 获取调薪列表
> - 获取调薪详情
> - 删除调薪记录

---



### 创建调薪界面 & 初始化调薪列表数据

> 在初始化的时候，需发送调薪列表的请求，调用model中的 _initSalaryList 
>
> 获取调薪所需要的数据内容



调用状态管理中的初始化调薪列表方法并且修改 state 中的 salaryList 和 salaryTotal

```js
    *_initSalaryList({ payload }, { put, call }) {
      const { data } = yield call($http.getSalaryAdjustment,payload);
      yield put({
        type: 'saveSalary',
        payload: { salaryList: data.list, salaryTotal: data.total },
      });
    },
```



### 调薪模块基本结构

**模块内私有组件**

> - 引入头部公共组件（创建按钮，批量删除按钮 和 翻页组件）
> - 筛选表单组件
> - 调薪表格组件
> - 新增调薪表单
> - 调薪详情表单
> - 调薪表单验证组件

**公共组件使用**

> - 抽屉组件
> - 筛选模态框组件
> - 新增模态框组件
> - 公共头部处理组件（分页、新增当前分类内容）

---



### 调薪Tabel组件制作

**实现功能**

> - 调薪列表展示
> - 表格内对当前指定字段修改
> - 实现分页查询功能
> - 根据选中行进行多条记录得删除功能

**依赖组件**

> - 可编辑单元格组件
> - 可编辑单元行组件
> - columns列组件

**状态使用**

> - 调薪列表数据 salaryList
> - 调薪数据总数 salaryTotal

**状态api处理**

> - 获取调薪列表: `_initSalaryList`



```js
const SalaryTable = ({ salaryList, reloadPage }) => {
  return (
    <div className="table-container">
      <Table
        components={{ body: { row: EditableRow, cell: EditableCell } }
        dataSource={salaryList}
        columns={Columns()}
      />
    </div>
  );
};
```

---





### 调薪详情组件制作

**实现功能**

> - 展示指定调薪的详情
> - 部分字段的修改操作
> - 删除当前直接信息

**依赖组件**

> - 公共详情头部组件
> - 抽屉组件

**状态依赖**

> - 调薪详情

**状态api使用**

> - 获取调薪详情
> - 重置调薪列表



##### 创建组件

>  - 创建组件 SalaryDetail 组件，并且引入Drawer公共组件

1. 引入公共头部组件 DetailHeader
2. 通过 table 的调薪原因绑定事件获取调薪详情事件，进行数据请求
3. 创建详情表单，由于详情组件也可以对单个的key进行修改，选用form作为基础组件进行内容的渲染

```js
           <Form form={form} layout="vertical">
              <Form.Item>
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(45% - 4px)' }}
                  name="staffName"
                  label="员工"
                >
                  <span style={{paddingLeft:"10px"}}>{salaryDetail.staffName.userName}</span>
                </Form.Item>
                <Form.Item
                  style={{
                    display: 'inline-flex',
                    width: 'calc(55% - 4px)',
                    marginLeft: '8px',
                  }}
                  name="startTime"
                  label="开始时间"
                  initialValue={moment(salaryDetail?.startTime, 'YYYY-MM-DD')}
                >
                  <DatePicker
                    style={{ minWidth: '150px' }}
                    onBlur={updateLevelDetail}
                  />
                </Form.Item>
              </Form.Item>
            </Form>
```

4. 表单失去焦点对修改数据进行处理并发送请求

---



### 新增调薪组件制作

**实现功能**

> - 初始化表单项基本展示
> - 表单验证规则实现

**制作**

1. 创建表单列表项数据清单,定义不同的列表项渲染字段及类型：

```js
export const salaryAdjustmentData = [
  [
    { rule: 'staffNameRule', itemName: 'staffNameVal', initVal: '请输入员工姓名', labelTxt: '员工', 
     renderType: 'popover', url: 'getStaffList', type: 'userName' },
    { dateRule: 'startTimeRule', itemName: 'startTime', initVal: '请选择开始时间', 
     labelTxt: '开始时间', renderType: 'date', },
  ],
]
```

2. 对不同的字段进行验证规则定制

```js
export const salaryRule = {
  staffNameRule: [
    { required: true, message: '员工姓名不能为空' },
    { max: 4, message: '员工姓名长度不正确' },
    { min: 2, message: '员工姓名长度不正确' },
  ],
  startTimeRule: [
    { required: true, message: '开始时间不能为空' },
  ]
}
```

3. 表单验证通过之后发送创建的数据请求

---



### 删除调薪逻辑 & 分页展示制作

实现功能：

> - 分页展示
> - 批量删除

**组件内部状态值获取**

> - 当前分页内容改变处理
> - 当前列表页数总长度
> - 删除操作请求方法传递

```
<TableHandle
    showAddDataDialog={() => setDialogStatus(true)}
    changeCurrentPage={currentPage => (page.current = currentPage) && _initSalaryList()}
    total={salaryTotal}
    page={page.current} size={size}
    interfaceMethod={'deleteSalary'}
/>
```

---



### 调薪搜索组件制作

**实现功能**

> - 可根据员工名称进行筛选（复用绩效考核筛选组件）
> - 筛选结果在 Tabel 中展示

```js
    <Form form={form} layout="vertical">
      <Form.Item label="员工" name="staffName">
        <Input readOnly placeholder="请输入搜索的员工" addonAfter={
          <>
            <DropPopover
              placeholderVal="请输入员工"
              url="getStaffList"
              renderType="userName"
              getSelectItem={(item) => searchVal(item)}
            />
          </>
        } />
      </Form.Item>
    </Form>
```



