import iconMap from "../../../components/iconMap";
import { dateFormat } from "../../../utils/dateFormat";
import { attendanceRules } from "../../../utils/rules/attendanceRules";
import { Tag } from "antd"
import { mapData } from "../../../utils/mapData"

const Columns = (handleSave, getAttendanceDetail, userInfo) => {
    let columns = [
        {
            title: "考勤员工",
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
                                getAttendanceDetail(_id);
                            }}
                        >
                            {iconMap.detail}
                        </span>
                    </div>
                )
            }
        },
        {
            title: "考勤类型",
            dataIndex: "attendanceType",
            editable: userInfo.identity === 1,
            render: (record) => <Tag>{mapData.attendanceType[record]}</Tag>
        },
        {
            title: "考勤时间",
            dataIndex: "createTime",
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
                    case "attendanceType":
                        type = "selectNode";
                        break
                    case "createTime":
                        type = "dateNode";
                        break;
                    default:
                        type = "inputNode";
                        break
                }
                // console.log(type)
                return {
                    record,
                    type,
                    editable: item.editable,
                    dataIndex: item.dataIndex,
                    align: "center",
                    title: item.title,
                    handleSave,
                    // width: "20%",
                    rules: attendanceRules[item.dataIndex]
                }
            }
        }
    })
    return columns;
}
export default Columns