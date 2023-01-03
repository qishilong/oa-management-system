

## 出勤统计模块

> 在创建柱状图组件时，需要进行用户身份判断，当用户身份为普通员工时，后端只返回表格组件数据，前端需要通过判读用户身份或者是后端返回值进行柱状图组件的动态渲染处理

---

### 创建基础UI模版

```js
const attendance = () => {
  const dispatch = useDispatch();
  const { chartList, tableList } = useSelector(state => state.attendance);
  const { userInfo } = useSelector(state => state.common);

  useEffect(() => {
    dispatch({ type: 'attendance/intiAttendanceList' })
  }, [])

  return (
    <div className="attendance-container">
      <>
        {
          userInfo.identity === 1 && chartList[0]?.renderData &&
          <div className="chart-list-container">
            {
              chartList.map((item, index) => <ViolationChart {...item} key={index} />)
            }
          </div>
        }
        <div className="table-list-container" style={{ width: userInfo.identity === 1 ? '49.8%' : '100%' }}>
          {
            tableList.map((item, index) => <ViolationTable {...item} key={index} />)
          }
        </div>
      </>
    </div>
  )
}

```

### 定义柱状图、table组件

> 当登录用户为普通用户时，只显示table组件，当用户为管理员时，显示表格及柱状图组建

**table组建**

```js
    <div className="block-container">
      <div className="title">{title}</div>
      <Table
        dataSource={renderData}
        columns={columns}
        rowKey={columns => columns._id}
        pagination={false}
      />
    </div>
```

**柱状图组建**

```js
const ViolationTable = ({ title, renderData }) => {

  const columns = [
    {
      title: '姓名',
      dataIndex: 'staffName',
      render: x => x.userName
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      render: x => {
        return <div>{formatDate(x, 'YYYY-MM-DD HH:mm:ss')}</div>
      }
    },
    {
      title: '考勤类型',
      dataIndex: 'attendanceType',
      render: x => <Tag color="red">{x === 4 ? '迟到' : '早退'}</Tag>
    },
    {
      title: '部门',
      dataIndex: 'staffName',
      render: x => <Tag >{x.department ? x.department.departmentName : '暂无部门信息'}</Tag>
    }
  ];

  return (
    <div className="block-container">
      <div className="title">{title}</div>
      <Table
        dataSource={renderData}
        columns={columns}
        rowKey={columns => columns._id}
        pagination={false}
      />
    </div>
  )
}
```

### 数据请求处理

1. **model中进行初始化获取数据操作**

    ```js
    export default {
      namespace: "attendance",
      state: {
        chartList: [],
        tableList: [],
      },
      reducers: {
        formatData (state, { payload }) {
          const { data } = payload;
          const formatData = {
            chartList: [
              { title: '迟到员工数量', renderData: data.lateBI },
              { title: '早退员工数量', renderData: data.earlyBI },
            ],
            tableList: [
              { title: '迟到详情', renderData: data.earlyTable, },
              { title: '早退详情', renderData: data.lateTableList },
            ]
          }
          return {
            ...state, ...formatData
          }
        }
      },
      effects: {
        *intiAttendanceList ({ }, { put, call }) {
          const { data } = yield call($http.getAttendanceTable);
          yield put({ type: 'formatData', payload: { data } })
        },
      }
    }
    ```

2. **组件内部进行数据获取**

    ```js
      const { chartList, tableList } = useSelector(state => state.attendance);
    ```
