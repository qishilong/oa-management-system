import iconMap from "../../../components/iconMap"
import { levelRules } from "../../../utils/rules"

const Columns = (handleSave, getLevelDetail, userInfo) => {
    let columns = [
        {
            title: "职级名称",
            dataIndex: "levelName",
            editable: userInfo.identity === 1,
            // render函数参数分别为当前行的值，当前行数据，行索引
            render: (record, { _id }) => {
                // console.log(record)
                return (
                    <div className="staff-wrapper">
                        <span className="user-name">{record}</span>
                        <span
                            className="detail-icon"
                            // style={{ cursor: "pointer" }}
                            onClick={(e) => {
                                e.stopPropagation();
                                getLevelDetail(_id)
                            }}
                        >
                            {iconMap.detail}
                        </span>
                    </div>
                )
            }
        },
        {
            title: "职级描述",
            dataIndex: "levelDescription",
            editable: userInfo.identity === 1,
        },
        {
            title: "考核要求",
            dataIndex: "assessmentRequire",
            editable: userInfo.identity === 1,
            render: (record) => {
                // console.log(record);
                return record ? record : "暂无考核要求"
            }
        },
        {
            title: "面试要求",
            dataIndex: "interviewRequire",
            editable: userInfo.identity === 1,
            sorter: (a, b) => a.interviewRequire - b.interviewRequire,
            render: (record) => record ? record : "暂无面试要求"
        },
        {
            title: "分红全配基数",
            dataIndex: "baseNumber",
            editable: userInfo.identity === 1,
            sorter: (a, b) => a.baseNumber - b.baseNumber,
            render: (record) => record ? record : "暂无分红全配基数"
        },
        {
            title: "对应职级考核标准分数",
            dataIndex: "levelScore",
            editable: userInfo.identity === 1,
            sorter: (a, b) => a.levelScore - b.levelScore,
            render: (record) => record ? record : "暂无职级考核标准分数"
        }
    ]

    columns = columns.map((item) => {
        if (!item.editable) return item;
        return {
            ...item,
            onCell: (record) => {
                return {
                    record,
                    editable: item.editable,
                    dataIndex: item.dataIndex,
                    align: 'center',
                    title: item.title,
                    handleSave,
                    type: "inputNode",
                    rules: levelRules[item.dataIndex]
                }
            }
        }
    })

    // console.log(columns, 111)
    return columns;
}

export default Columns