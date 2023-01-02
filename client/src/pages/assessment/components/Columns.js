import iconMap from "../../../components/iconMap";
import { dateFormat } from "../../../utils/dateFormat";
import { assessmentRules } from "../../../utils/rules";

const Columns = (handleSave, getAssessmentDetail, userInfo) => {
    let columns = [
        {
            title: "员工",
            dataIndex: "staffName",
            editable: userInfo.identity === 1,
            render: (record, { _id }) => {
                return (
                    <div className="staff-wrapper">
                        <span className="user-name">{record?.userName ? record?.userName : "---"}</span>
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
            title: "部门",
            dataIndex: "department",
            editable: userInfo.identity === 1,
            render: (record) => record?.departmentName ? record?.departmentName : "---"
        },
        {
            title: "初始职级",
            dataIndex: "initLevel",
            editable: userInfo.identity === 1,
            render: (record) => record?.departmentName ? record?.departmentName : "---"
        },
        {
            title: "调整职级",
            dataIndex: "currentLevel",
            editable: userInfo.identity === 1,
            render: (record) => record?.levelName ? record?.levelName : "---"
        },
        {
            title: "入职时间",
            dataIndex: "staffName",
            editable: userInfo.identity === 1,
            render: (record) => record?.onboardingTime ? dateFormat(record?.onboardingTime, "YYYY-MM-DD") : "---"
        },
        {
            title: "对应分数",
            dataIndex: "standardScore",
            editable: userInfo.identity === 1,
            render: (record) => record ? record : "---"
        },
        {
            title: "考核得分",
            dataIndex: "assessmentScore",
            editable: userInfo.identity === 1,
            render: (record) => record ? record : "---"
        },
        {
            title: "考核等级",
            dataIndex: "result",
            editable: userInfo.identity === 1,
            render: (record) => record ? record : "---"
        },
        {
            title: "考核时间",
            dataIndex: "date",
            editable: userInfo.identity === 1,
            render: (record) => record ? dateFormat(record, "YYYY-MM-DD") : "---"
        },
    ]

    columns = columns.map((item) => {
        if (!item.editable) return item;
        return {
            ...item,
            onCell: (record) => {
                let type = "";
                switch (item.dataIndex) {
                    case "date":
                        type = "dateNode";
                        break
                    default:
                        type = "inputNode";
                        break
                }
                return {
                    record,
                    type,
                    editable: item.editable,
                    dataIndex: item.dataIndex,
                    title: item.title,
                    handleSave,
                    rules: assessmentRules[item.dataIndex]
                }
            }
        }
    })
    return columns;
}
export default Columns