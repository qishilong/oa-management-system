import iconMap from "../../../components/iconMap";
import { dateFormat } from "../../../utils/dateFormat";
import { rewardAndPunishmentRules } from "../../../utils/rules";
import { Tag, Image } from "antd"
import { mapData } from "../../../utils/mapData"
import loadErrorImage from "../../../common/images/load_error.png"

const Columns = (handleSave, getRewardAndPunishmentDetail, userInfo) => {
    let columns = [
        {
            title: "员工",
            dataIndex: "staffName",
            // editable: userInfo.identity === 1,
            render: (record, { _id }) => {
                return (
                    <div className="staff-wrapper">
                        <span className="user-name">{record?.userName ? record?.userName : "---"}</span>
                        <span
                            className="detail-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                getRewardAndPunishmentDetail(_id);
                            }}
                        >
                            {iconMap.detail}
                        </span>
                    </div>
                )
            }
        },
        {
            title: "类型",
            dataIndex: "type",
            // editable: userInfo.identity === 1,
            render: (record) => <Tag color={record > 2 ? "#f50" : "#108ee9"}>{mapData.rewardType[record - 1]}</Tag>
        },
        {
            title: "原因",
            dataIndex: "reason",
            editable: userInfo.identity === 1,
            render: (record) => record ? record : "---"
        },
        {
            title: "详细信息",
            dataIndex: "recordDesc",
            editable: userInfo.identity === 1,
            render: (record) => record ? record : "---"
        },
        {
            title: "记录时间",
            dataIndex: "date",
            editable: userInfo.identity === 1,
            render: (record) => record ? dateFormat(record, "YYYY-MM-DD") : "---"
        },
        {
            title: "附件",
            dataIndex: "file",
            // editable: userInfo.identity === 1,
            render: (record) => <Image src={record ? record : "error"} width={50} fallback={loadErrorImage} />
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
                    align: "center",
                    title: item.title,
                    handleSave,
                    width: "20%",
                    rules: rewardAndPunishmentRules[item.dataIndex]
                }
            }
        }
    })
    return columns;
}
export default Columns