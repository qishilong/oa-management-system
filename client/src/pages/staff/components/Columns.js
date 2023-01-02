import { Tag, Image } from "antd";
import { formatYear, dateFormat, formatBirth } from "utils/dateFormat";
import imageError from "common/images/load_error.png"
import { mapData } from "utils/mapData";
import iconMap from "../../../components/iconMap";
import { staffRules } from "utils/rules/staffRules"

const Columns = ({ handleSave, userInfo, openReviewRecord, openDetailDialog }) => {

    // 正常可以渲染的表格内容
    const normalList = [
        {
            title: "姓名",
            dataIndex: "userName",
            editable: true,
            render: (useName, { _id }) => {
                return (
                    <div className="staff-wrapper">
                        <span className="user-name">{useName}</span>
                        <span
                            className="c-r"
                            onClick={(e) => {
                                e.stopPropagation();
                                openDetailDialog(_id)
                            }}
                        >{iconMap.detail}</span>
                    </div>
                )
            }
        },
        {
            title: "联系电话",
            dataIndex: "mobile",
            editable: true,
        },
        {
            title: "职级描述",
            dataIndex: "level",
            render: (data) => data?.levelDescription || "暂无职级描述"
        },
        {
            title: "性别",
            dataIndex: "gender",
            editable: true,
            render: (type) => <Tag>{mapData["gender"][type]}</Tag>
        },
        {
            title: "部门",
            dataIndex: "department",
            render: (data) => data?.departmentLeader?.userName || '---',
        },
        {
            title: "部门负责人",
            dataIndex: "department",
            render: (data) => data?.departmentLeader?.userName || '---',
        },

    ];

    // 只有管理员可以渲染的表格内容
    const authList = [
        {
            title: "入职时间",
            dataIndex: "onboardingTime",
            editable: true,
            render: (date) => dateFormat(date, "YYYY-MM-DD")
        },
        {
            title: "年龄",
            dataIndex: "idNumber",
            editable: true,
            render: (idNumber) => formatYear(idNumber, "age")
        },
        {
            title: "头像",
            dataIndex: "avatar",
            render: (image) => <Image src={image || "error"} fallback={imageError} />
        },
        {
            title: "籍贯",
            dataIndex: "hometown",
            editable: true,
            render: (hometown) => hometown || "---",
        },
        {
            title: "学历",
            dataIndex: "education",
            editable: true,
            render: (type) => <Tag>{mapData["education"][type]}</Tag>
        },
        {
            title: "婚姻状况",
            dataIndex: "marriage",
            editable: true,
            render: (type) => <Tag>{mapData["marriage"][type]}</Tag>
        },
        {
            title: "生日",
            dataIndex: "idNumber",
            render: (id) => formatBirth(id)
        },
        {
            title: "银行卡",
            dataIndex: "bankNumber",
            editable: true,
        },
        {
            title: "身份证号",
            dataIndex: "idNumber",
            editable: true,
        },
        {
            title: "毕业院校",
            dataIndex: "graduatedSchool",
            editable: true,
        },
        {
            title: "绩效考核",
            dataIndex: "record",
            render: (record, data) => {
                return (
                    <Tag
                        onClick={() => openReviewRecord(
                            {
                                title: "考核记录",
                                interfaceName: "getAssessmentList",
                                requestData: {
                                    queryData: {
                                        staffName: data._id
                                    }
                                },
                                type: "assessment"
                            }
                        )}
                        className="c-p"
                    >
                        查看
                    </Tag>
                )
            }
        },
        {
            title: "奖惩记录",
            dataIndex: "record",
            render: (record, data) => {
                return (
                    <Tag
                        onClick={() => openReviewRecord(
                            {
                                title: "奖惩记录",
                                interfaceName: "getRewardAndPunishment",
                                requestData: {
                                    staffName: data._id
                                },
                                type: "reward"
                            }
                        )}
                        className="c-p"
                    >
                        查看
                    </Tag>
                )
            }
        },
        {
            title: "调薪记录",
            dataIndex: "record",
            render: (record, data) => {
                // console.log(record, data)
                return (
                    <Tag
                        onClick={() => openReviewRecord({
                            title: "调薪记录",
                            interfaceName: "getSalaryAdjustment",
                            requestData: {
                                staffName: data._id
                            },
                            type: "salary"
                        })}
                    >
                        查看
                    </Tag>
                )
            }
        },
    ]

    const renderColumnsList = userInfo.identity === 1 ? [...normalList, ...authList] : normalList


    const renderColumnsListData = renderColumnsList.map((item) => {
        if (!item.editable) {
            return item // 如果不能修改，直接返回当前的渲染单元格
        }
        // 当前的单元格诶可编辑的单元格
        return {
            ...item,
            onCell: (record) => {
                // console.log(record)

                // 创建一个规定编辑表单类型的属性type
                let type = "";
                switch (item.dataIndex) {
                    case "onboardingTime":
                        type = "dateNode";
                        break;
                    case "gender":
                    case "education":
                    case "marriage":
                        type = "selectNode";
                        break;
                    default:
                        type = "inputNode";
                        break;
                }

                return {
                    type,
                    record,
                    dataIndex: item.dataIndex,
                    handleSave: handleSave,
                    title: item.title,
                    editable: item.editable,
                    rules: staffRules[item.dataIndex]
                }

            }
        }
    })
    return renderColumnsListData
};

export default Columns;
