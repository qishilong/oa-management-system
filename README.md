## 绩效模块制作

### 数据获取

> **绩效模块涉及接口共计5个**
>
> - 绩效列表
> - 绩效详情
> - 删除绩效
> - 新增绩效
> - 修改绩效
>
> 接口参考地址：http://mock.duyiedu.com/project/128/interface/api/cat_357

---



### 接口API定义

**services文件夹下创建绩效请求文件，实现方法所需接口api定义 如下demo:**

```js
import ajax from '../http.js';

// - 查询绩效考核
export const getAssessmentList = (params = {}) => ajax.post('/getAssessmentList', params);
```

---



### 模块内公共状态定义

**状态集合**

> - assessmentList   绩效列表
> - assessmentTotal  当前绩效总数
> - assessmentDetail  绩效详细信息
> - ids 删除绩效的id集合



**状态管理api**

> - 获取绩效列表
> - 获取绩效详情
> - 删除绩效

---



### 创建绩效界面 & 初始化绩效列表数据

> 在初始化的时候，需发送绩效列表的请求，调用model中的 _initAssessmentList 
>
> 获取绩效所需要的数据内容



调用状态管理中的初始化绩效列表方法并且修改 state 中的 assessmentList 和 assessmentTotal

```js
 *_initAssessmentList ({ payload }, { put, call }) {
      const { data, assessmentTotal } = yield call(
        $http.getAssessmentList,
        payload,
      );
      yield put({
        type: 'saveAssessment',
        payload: { assessmentList: data, assessmentTotal },
      });
    },
```



### 绩效模块基本结构

**模块内私有组件**

> - 引入头部公共组件（创建按钮，批量删除按钮 和 翻页组件）
> - 筛选表单组件
> - 绩效表格组件
> - 新增绩效表单
> - 绩效详情表单
> - 绩效表单验证组件

**公共组件使用**

> - 抽屉组件
> - 筛选模态框组件
> - 新增模态框组件
> - 公共头部处理组件（分页、新增当前分类内容）
> - 员工Popover组件
> - 

---



### 绩效Tabel组件制作

**实现功能**

> - 绩效列表展示
> - 表格内对当前指定字段修改
> - 实现分页查询功能
> - 根据选中行进行多条记录得删除功能

**依赖组件**

> - 可编辑单元格组件
> - 可编辑单元行组件
> - columns列组件

**状态使用**

> - 绩效列表数据 assessmentList
> - 绩效数据总数 assessmentTotal

**状态api处理**

> - 获取职级列表: `_initAssessmentList`





```js
const AssessmentTable = ({ assessmentList, reloadPage }) => {
  return (
    <div className="table-container">
      <Table
        components={{ body: { row: EditableRow, cell: EditableCell } }
        dataSource={assessmentList}
        columns={Columns()}
      />
    </div>
  );
};
```

---





### 绩效详情组件制作

**实现功能**

> - 展示指定绩效的详情
> - 部分字段得修改操作
> - 删除当前直接信息



**依赖组件**

> - 公共详情头部组件
> - 抽屉组件

**状态依赖**

> - 绩效详情

**状态api使用**

> - 获取绩效详情
> - 重置绩效列表



##### 创建组件

>  - 创建组件 assessmentDetail 组件，并且引入Drawer公共组件

1. 引入公共头部组件 DetailHeader
2. 通过 table 的员工名称绑定事件获取绩效详情事件，进行数据请求
3. 创建详情表单，由于详情组件也可以对单个的key进行修改，选用form作为基础组件进行内容的渲染

```js
         <Form form={form}
            form={form}
            layout="vertical"
            initialValues={
              {
                ...assessmentDetail,
                date: moment(assessmentDetail.date),
                currentLevelVal: assessmentDetail.currentLevel.levelName
              }
            }
          >
            {
              [...assessmentFormatData, ...readData].map((item, index) => {
                return (
                  <Row key={index} justify={'space-between'}>
                    {
                      item.map((formItem, innerIndex) => {
                        return (
                          <Col span={11} key={innerIndex}>
                            <Form.Item
                              style={formItem.style}
                              label={formItem.labelTxt}
                              name={formItem.itemName}
                              required
                              rules={assessmentRule[formItem.rule]}
                            >
                              {
                                formItem.renderType && groupData[formItem.renderType](formItem)
                              }
                            </Form.Item>
                          </Col>
                        )
                      })
                    }
                  </Row>
                )
              })
            }
          </Form>
```

4. 表单失去焦点对修改数据进行处理并发送请求

---



### 新增绩效组件制作

**实现功能**

> - 初始化表单项基本展示
> - 表单验证规则实现

**制作**

1. 创建表单列表项数据清单,定义不同的列表项渲染字段及类型：

```js
export const assessmentFormatData = [
  [
    { rule: 'staffNameRule', itemName: 'staffNameVal', initVal: '请输入员工姓名', labelTxt: '员工', renderType: 'popover', url: 'getStaffList', type: 'userName' },

    { rule: 'dateRule', itemName: 'date', initVal: '请选择考核日期', labelTxt: '考核日期', renderType: 'date', },
  ]
]
```

2. 对不同的字段进行验证规则定制

```js
export const assessmentRule = {
  staffNameRule: [
    { required: true, message: '员工姓名不能为空' },
    { max: 4, message: '员工姓名长度不正确' },
    { min: 2, message: '员工姓名长度不正确' },
  ],
  dateRule: [
    { required: true, message: '考核日期不能为空' },
  ]
}

```

3. 表单验证通过之后发送创建的数据请求

---



### 删除绩效逻辑 & 分页展示制作

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
    changeCurrentPage={currentPage => (page.current = currentPage) && _initAssessmentList()}
    total={assessmentTotal}
    page={page.current} size={10}
    interfaceMethod={'deleteAssessment'}
/>
```

---



### 绩效搜索组件制作

**实现功能**

> - 可根据员工名称进行筛选
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
