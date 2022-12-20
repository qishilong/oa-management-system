import { useState } from 'react'
import { Table, message } from "antd";
import Columns from "./Columns"
import { EditableCell, EditableRow } from '../../../components/Editable';
import Dialog from '../../../components/Dialog';
import RenderType from './RecordTable';
import classnames from "classnames"
import { useDispatch } from 'umi';
import $http from "api";

const TableList = ({ userInfo, staffList, loading, closeStatus, reloadPage }) => {
    const [currentRecord, setCurrentRecord] = useState(null);
    const [dialogStatus, setDialogStatus] = useState(false);

    const dispatch = useDispatch();

    // 修改之后的保存事件
    const handleSave = async (obj) => {
        if (obj.type === "mobile") {
            const checkData = { mobile: obj.updateVal }
            const { data, mag } = await $http.checkIsExists({ checkData });
            if (data) return message.error(mag)
        }
        // 修改表单操作
        const { code, msg } = await $http.updateStaff(obj);
        if (code) return message.error(msg);
        message.success(msg);
        reloadPage()
    }

    // 打开员工指定表格
    const openReviewRecord = (record) => {
        // console.log(record)
        setCurrentRecord(record);
        setDialogStatus(prev => prev = true);
    }

    // 打开员工详情界面
    const openDetailDialog = (_id) => dispatch({ type: "staff/_getStaffDetail", payload: { _id } })

    return (
        <div>
            <Table
                className={classnames({ closeSearch: closeStatus })}
                components={
                    {
                        body: {
                            row: EditableRow,
                            cell: EditableCell
                        }
                    }
                }
                bordered={true}
                scroll={{ x: true }}
                dataSource={staffList}
                rowKey={record => {
                    // console.log(record._id, 1111)
                    // console.log(record, 22222)
                    return record._id
                }}
                pagination={false}
                loading={loading.effects["staff/_initStaffData"]}
                columns={Columns({ userInfo, handleSave, openReviewRecord, openDetailDialog })}
            />
            <Dialog
                title={currentRecord?.title}
                dialogStatus={dialogStatus}
                setDialogStatus={setDialogStatus}
                render={() => <RenderType {...currentRecord} />}
            />
        </div>
    )
}

export default TableList
