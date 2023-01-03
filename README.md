## 职级模块制作

### 数据获取

> **职级模块涉及接口共计5个**
>
> - 职级列表
> - 职级详情
> - 删除职级
> - 新增职级
> - 修改职级
>
> 接口参考地址：http://mock.duyiedu.com/project/128/interface/api/cat_350

---



### 接口API定义

**services文件夹下创建职级请求文件，实现方法所需接口api定义 如下demo:**

```js
import ajax from '../http.js';

// - 查询职级列表
export const getLevelList = (params = {}) => ajax.post('/getLevel', params);
```

---



### 模块内公共状态定义

**状态集合**

> - levelList   职级列表
> - levelTotal  当前职级总数
> - levelDetail  职级详细信息
> - ids 删除职级的id集合



**状态管理api**

> - 获取职级列表
> - 获取职级详情
> - 删除职级

---



### 创建职级界面 & 初始化职级列表数据

> 在初始化的时候，需发送职级列表的请求，调用model中的 _initLevelList 
>
> 获取职级所需要的数据内容

1. 调用状态管理中的初始化职级列表方法并且修改 state 中的 levelList 和 levelTotal

    ```js
     *_initLevelList ({ payload }, { put, call }) {
          const { data } = yield call($http.getLevelList, payload);
          yield put({
            type: 'saveLevel',
            payload: { levelList: data.list, levelTotal: data.total },
          });
     }
    ```



### 职级模块基本结构

**模块内私有组件**

> - 引入头部公共组件（创建按钮，批量删除按钮 和 翻页组件）
> - 筛选表单组件
> - 职级表格组件
> - 新增职级表单
> - 职级详情表单
> - 职级表单验证组件

**公共组件使用**

> - 抽屉组件
> - 筛选模态框组件
> - 新增模态框组件
> - 公共头部处理组件（分页、新增当前分类内容）

---



### 职级Tabel组件制作

**实现功能**

> - 职级列表展示
> - 表格内对当前指定字段修改
> - 实现分页查询功能
> - 根据选中行进行多条记录得删除功能

**依赖组件**

> - 可编辑单元格组件
>
> - 可编辑单元行组件
>
> - columns列组件

**状态使用**

> - 职级列表数据
>
> - 职级数据总数

**状态api处理**

> - 获取职级列表: `_initLevelList`





```js
const LevelTable = ({ levelList, reloadPage }) => {
  return (
    <div className="table-container">
      <Table
        components={{ body: { row: EditableRow, cell: EditableCell } }
        dataSource={levelList}
        columns={Columns()}
      />
    </div>
  );
};
```

---





### 职级详情组件制作

**实现功能**

> - 展示指定职级的详情
> - 部分字段得修改操作
> - 删除当前直接信息



**依赖组件**

> - 公共详情头部组件
> - 抽屉组件

**状态依赖**

> - 职级详情

**状态api使用**

> - 获取职级详情
>
> - 重置职级列表



##### 创建组件

>  - 创建组件levelDetail组件，并且引入Drawer公共组件

1. 引入公共头部组件 DetailHeader
2. 通过 table 的职级名称绑定事件获取职级详情事件，进行数据请求
3. 创建详情表单，由于详情组件也可以对单个的key进行修改，选用form作为基础组件进行内容的渲染

```js
         <Form
            form={form}
            layout="vertical"
            initialValues={levelDetail}
          >
            {
              levelFormatData.map((item, index) => {
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
                                rules={levelRule[formItem.rule]}>
                              <Input placeholder={formItem.initVal} onBlur={(() => checkForm(formItem))} />
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



### 新增职级组件制作

**实现功能**

> - 初始化表单项基本展示
> - 表单验证规则实现

**制作**

1. 创建表单列表项数据清单,定义不同的列表项渲染字段及类型：

```js
export const levelFormatData = [
  [
    { rule: 'levelNameRule', itemName: 'levelName', initVal: '请输入职级名称', labelTxt: '职级名称' ,style:{}},

    { rule: 'levelDescriptionRule', itemName: 'levelDescription', initVal: '请输入职级描述', labelTxt: '职级描述' ,style:{}},
  ]
]
```

2. 对不同的字段进行验证规则定制

```js
export const levelRule = {
  levelNameRule: [
    { required: true, message: '职级名称不能为空' },
    { max: 20, message: '职级名称长度不正确' },
    { min: 2, message: '职级名称长度不正确' },
  ],
}

```

3. 表单验证通过之后发送创建的数据请求

---



### 删除职级逻辑 & 分页展示制作

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
    changeCurrentPage={currentPage => (page.current = currentPage) && _initLevelList()}
    total={levelTotal}
    page={page.current} size={size}
    interfaceMethod={'deleteLevel'}
/>
```

---



### 职级搜索组件制作

**实现功能**

> - 可根据职级名称和职级描述进行筛选
>
> - 筛选结果在 Tabel 中展示

```js
   <Form form={form} layout="vertical">
      <Form.Item label="名称" name="levelName">
        <Input allowClear onPressEnter={() => searchVal('levelName')} />
      </Form.Item>
      <Form.Item label="描述" name="levelDescription">
        <Input allowClear onPressEnter={() => searchVal('levelDescription')} />
      </Form.Item>
    </Form>
```











