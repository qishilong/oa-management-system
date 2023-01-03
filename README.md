## 奖惩记录模块制作

### 数据获取

> **调薪模块涉及接口共计5个**
>
> - 奖惩记录列表
> - 奖惩记录详情
> - 删除奖惩记录
> - 新增奖惩记录
> - 修改奖惩记录
>
> 接口参考地址：http://mock.duyiedu.com/project/128/interface/api/cat_371

---



### 接口API定义

**services文件夹下创建奖惩记录请求文件，实现方法所需接口api定义 如下demo:**

```js
import ajax from '../http.js';

// - 查询奖惩记录
export const getReward = (params = {}) => ajax.get('/rewardAndPunishment', params)
```

---



### 模块内公共状态定义

**状态集合**

> - rewardList   奖惩记录列表
> - total  当前奖惩记录总数
> - rewardDetail  奖惩记录详细信息
> - ids 删除奖惩记录的id集合



**状态管理api**

> - 获取奖惩记录列表
> - 获取奖惩记录详情
> - 删除奖惩记录

---



### 创建奖惩界面 & 初始化奖惩列表数据

> 在初始化的时候，需发送奖惩记录列表的请求，调用model中的 _initReward 
>
> 获取奖惩所需要的数据内容



调用状态管理中的初始化奖惩列表方法并且修改 state 中的 rewardList 和 total

```js
    *_initReward ({ payload }, { put, call }) {
      const { data } = yield call($http.getReward, payload);
      yield put({
        type: 'saveList',
        payload: { rewardList: data.list, total: data.total },
      });
    },
```



### 奖惩记录模块基本结构

**模块内私有组件**

> - 引入头部公共组件（创建按钮，批量删除按钮 和 翻页组件）
> - 筛选表单组件
> - 奖惩记录表格组件
> - 新增奖惩记录表单
> - 奖惩记录详情表单
> - 奖惩记录表单验证组件

**公共组件使用**

> - 抽屉组件
> - 筛选模态框组件
> - 新增模态框组件
> - 公共头部处理组件（分页、新增当前分类内容）

---



### 奖惩记录Tabel组件制作

**实现功能**

> - 奖惩记录列表展示
> - 表格内对当前指定字段修改
> - 实现分页查询功能
> - 根据选中行进行多条记录得删除功能

**依赖组件**

> - 可编辑单元格组件
> - 可编辑单元行组件
> - columns列组件

**状态使用**

> - 奖惩记录列表数据 rewardList
> - 奖惩记录数据总数 total

**状态api处理**

> - 获取奖惩记录列表: `_initReward`



```js
const MainTable = ({ rewardList, reloadPage }) => {
  return (
    <div className="table-container">
      <Table
        components={{ body: { row: EditableRow, cell: EditableCell } }
        dataSource={rewardList}
        columns={Columns()}
      />
    </div>
  );
};
```

---





### 奖惩记录详情组件制作

**实现功能**

> - 展示指定奖惩记录的详情
> - 部分字段的修改操作
> - 删除当前直接信息

**依赖组件**

> - 公共详情头部组件
> - 抽屉组件
> - 上传文件组件

**状态依赖**

> - 奖惩记录详情

**状态api使用**

> - 获取奖惩记录详情
> - 重置奖惩记录列表



##### 创建组件

>  - 创建组件 rewardDetail 组件，并且引入Drawer公共组件

1. 引入公共头部组件 DetailHeader
2. 通过 table 的员工名称绑定事件获取调薪详情事件，进行数据请求
3. 创建详情表单，由于详情组件也可以对单个的key进行修改，选用form作为基础组件进行内容的渲染

```js
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              ...rewardDetail,
              staffName: rewardDetail.staffName.userName,
              date: moment(rewardDetail.date)
            }}
          >
            {
              rewardData.map((item, index) => {
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
                                rules={rewardRule[formItem.rule]}
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



### 新增奖惩记录组件制作

**实现功能**

> - 初始化表单项基本展示
> - 表单验证规则实现

**制作**

1. 创建表单列表项数据清单,定义不同的列表项渲染字段及类型：

```js
export const rewardData = [
  [
    {
      rule: 'reasonRule', itemName: 'reason', initVal: '请选择奖惩原因', labelTxt: '奖惩原因', renderType: 'input'
    },
    { rule: 'typeRule', renderType: 'select', itemName: 'type', initVal: '请选择奖惩类型', labelTxt: '奖惩类型', 
     optionName: 'rewardType', optionData: MatchList },
  ],

]
```

2. 对不同的字段进行验证规则定制

```js
export const rewardRule = {
 reasonRule: [
    { required: true, message: '奖惩原因不能为空' },
    { min: 2, message: '奖惩原因长度不正确' },
    { max: 20, message: '奖惩原因长度不正确' },
  ],
  recordDescRule: [
    { required: true, message: '奖惩描述不能为空' },
    { min: 2, message: '奖惩描述长度不正确' },
    { max: 20, message: '奖惩描述长度不正确' }
  ]
}

```

3. 表单验证通过之后发送创建的数据请求

---



### 删除奖惩记录逻辑 & 分页展示制作

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
    changeCurrentPage={currentPage => (page.current = currentPage) && _initReward()}
    total={total}
    page={page.current} size={size}
    interfaceMethod={'deleteReward'}
/>
```

---



### 奖惩记录搜索组件制作

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



