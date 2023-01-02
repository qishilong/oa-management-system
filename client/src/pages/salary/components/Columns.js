import iconMap from "../../../components/iconMap";
import { dateFormat } from "../../../utils/dateFormat";
import { salaryRules } from "../../../utils/rules";
import { Tag } from "antd"
import { mapData } from "../../../utils/mapData"

const Columns = (handleSave, getAssessmentDetail, userInfo) => {
    let columns = [
        {
            title: "调薪原因",
            dataIndex: "reason",
            editable: userInfo.identity === 1,
            render: (record, { _id }) => {
                return (
                    <div className="staff-wrapper">
                        <span className="user-name">{record ? record : "---"}</span>
                        <span
                            className="detail-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                getAssessmentDetail(_id);
                            }}
                        >
                            {iconMap.detail}
                        </span>
                    </div>
                )
            }
        },
        {
            title: "调整后薪资",
            dataIndex: "newSalary",
            editable: userInfo.identity === 1,
            render: (record) => record ? record : "---"
        },
        {
            title: "员工",
            dataIndex: "userName",
            editable: userInfo.identity === 1,
            render: (record) => record?.userName ? record?.userName : "---"
        },
        {
            title: "部门",
            dataIndex: "userName",
            editable: userInfo.identity === 1,
            render: (record) => <Tag>{record?.department?.departmentName ? record?.department?.departmentName : "---"}</Tag>
        },
        {
            title: "类型",
            dataIndex: "salaryType",
            editable: userInfo.identity === 1,
            render: (record) => record ? <Tag>{mapData.salaryType[record]}</Tag> : <Tag>{"---"}</Tag>
        },
        {
            title: "开始时间",
            dataIndex: "startTime",
            editable: userInfo.identity === 1,
            render: (record) => record ? dateFormat(record, "YYYY-MM-DD") : "---"
        }
    ]

    columns = columns.map((item) => {
        if (!item.editable) return item;
        return {
            ...item,
            // align: 'center',
            onCell: (record) => {
                let type = "";
                switch (item.dataIndex) {
                    case "startTime":
                        type = "dateNode";
                        break
                    case "salaryType":
                        type = "selectNode"
                    default:
                        type = "inputNode";
                        break
                }
                return {
                    record,
                    type,
                    editable: item.editable,
                    dataIndex: item.dataIndex,
                    align: "center",
                    title: item.title,
                    handleSave,
                    width: "20%",
                    rules: salaryRules[item.dataIndex]
                }
            }
        }
    })
    return columns;
}
export default Columns