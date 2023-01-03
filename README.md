## 部门信息模块制作(三)

### 部门详情制作

**实现功能**

> - 当前指定部门基本信息展示（名称、备注，部门负责人展示）
> - 子部门（存在）表格展示
> - 部门员工展示
> - 实现部分字段修改功能

**内部定义组件**

> - 子部门表格组件
> - 员工表格组件
> - 新增子部门表格组件

**公共状态使用**

> 模态框展示状态

---

### 子部门表格组件制作

**实现功能**

> - 为当前部门新增子部门
> - 删除当前部门子部门
> - 当前部门子部门展示

**内部定义组件**

> 添加部门模态框组件



---

### 部门添加组件制作

**实现功能**

> 选择当前暂无父级的部门进行新增部门实现

**数据获取**

> 根据部门集合，获取当前未指定的父级的部门列表

**参数使用**

> - departmentDetail.children
> - 选中列表项后进行当前字段回传参数

<img src="https://adminimg.hyfarsight.com/image-20211107195344509.png" alt="image-20211107195344509" style="zoom:80%;" />



### 部门员工表格column

```js
    {
      title: '姓名',
      dataIndex: 'userName',
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: (record) => <span>{mapData.gender[record]}</span>,
      align: 'center',
    },
    {
      title: '年龄',
      dataIndex: 'idNumber',
      align: 'center',
      render: (record) => <span>{formatYear(record, 'age')}</span>,
    },
    {
      title: '籍贯',
      dataIndex: 'hometown',
      align: 'center',
      render: (record) => <span>{record ? record : '---'}</span>,
    },
    {
      title: '联系电话',
      dataIndex: 'mobile',
      align: 'center',
    },
    {
      title: '学历',
      dataIndex: 'education',
      align: 'center',
      render: (record) => <span>{mapData.education[record]}</span>,
    },
    {
      title: '工作年限',
      dataIndex: 'onboardingTime',
      align: 'center',
      render: (record) => (
        <span>
          {!formatYear(record) ? '今年入职' : formatYear(record) + '年'}
        </span>
      ),
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      align: 'center',
      render: (src) => <img height="50" src={src} alt="" />,
    },
    {
      title: '毕业院校',
      dataIndex: 'graduatedSchool',
      align: 'center',
    },
```

