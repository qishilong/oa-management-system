import { useState } from 'react'
import { Table } from "antd";
import Columns from "./Columns"
import { EditableCell, EditableRow } from '../../../components/Editable';
import Dialog from '../../../components/Dialog';
import RenderType from './RecordTable';

const TableList = ({ userInfo, staffList, loading }) => {
    const [currentRecord, setCurrentRecord] = useState(null);
    const [dialogStatus, setDialogStatus] = useState(false);

    // 修改之后的保存事件
    const handleSave = (...e) => {
        console.log(e)
    }

    // 打开员工指定表格
    const openReviewRecord = (record) => {
        // console.log(record)
        setCurrentRecord(record);
        setDialogStatus(prev => prev = true);
    }

    return (
        <div>
            <Table
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
                rowKey={record => record._id}
                pagination={false}
                loading={loading.effects["staff/_initStaffData"]}
                columns={Columns({ userInfo, handleSave, openReviewRecord })}
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
