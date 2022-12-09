import { Tag } from "antd";
import { formatYear, dateFormat } from "utils/dateFormat";

const Columns = ({ handleSave, userInfo }) => {
    /**
     * accountName: "letvpn"
        avatar: "https://reactoa.hyfarsight.com/FrBl9IMFBoOS3a6tvN9DnjMSs_cK"
        bankNumber: "123456789123456789"
        education: 1
        graduatedSchool: "天津大学"
        hometown: "北京市朝阳区"
        idNumber: "211302198305112819"
        identity: 0
        marriage: 0
        onboardingTime: "2021-11-12T09:43:26.939Z"
        salary: "4000"
     */

    /**
     * accountName: "xiaoming1",
        avatar: "https://reactoa.hyfarsight.com/Fo2GA0iN6CAQPLLMARb9dHCDr7V-",
        bankNumber: "123456789123456789",
        department: null,
        education: 1,
        gender: 0,
        graduatedSchool: "天津大学",
        hometown: "北京市朝阳区",
        idNumber: "211302198305112819",
        identity: 0,
        level: null,
        marriage: 0,
        mobile: "13552752519",
        onboardingTime: "2021-10-03T07:48:00.868Z",
        salary: "4000",
        userName: "小明",
        __v: 0,
        _id: "617661370a362d7d382a21b7",
     */

    const normalList = [
        {
            title: "姓名",
            dataIndex: "userName",
            width: "200px",
            editable: true,
        },
        {
            title: "联系电话",
            dataIndex: "mobile",
            width: "200px",
            editable: true,
        },
        {
            title: "职级描述",
            dataIndex: "level",
            width: "200px",
            render: (data) => data?.levelDescription || "暂无职级描述"
        },
        {
            title: "性别",
            dataIndex: "gender",
            width: "200px",
            editable: true,
            render: (gender) => <Tag>{gender === 0 ? "女" : "男"}</Tag>
        },
        {
            title: "部门",
            dataIndex: "department",
            width: "200px",
            render: (data) => data?.departmentLeader?.userName || '---',
        },
        {
            title: "部门负责人",
            dataIndex: "department",
            width: "200px",
            render: (data) => data?.departmentLeader?.userName || '---',
        },
        {
            title: "年龄",
            dataIndex: "idNumber",
            width: "200px",
            editable: true,
            render: (idNumber) => formatYear(idNumber, "age")
        },
    ];

    const authList = [
        {
            title: "入职时间",
            dataIndex: "onboardingTime",
            width: "200px",
            editable: true,
            render: (date) => dateFormat(date, "YYYY-MM-DD")
        },
    ]

    const renderColumnsList = userInfo.identity === 0 ? normalList : [...normalList, ...authList]


    const renderColumnsListData = renderColumnsList.map((item) => {
        if (!item.editable) {
            return item // 如果不能修改，直接返回当前的渲染单元格
        }
        return {
            ...item,
            onCell: (record) => ({
                // console.log(record)
                record,
                dataIndex: item.dataIndex,
                handleSave: handleSave,
                title: item.title,
                editable: item.editable
            })
        }
    })
    return renderColumnsListData
};

export default Columns;
