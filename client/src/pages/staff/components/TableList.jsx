import React from 'react'
import { Table } from "antd";
import Columns from "./Columns"
import { EditableCell, EditableRow } from '../../../components/Editable';

const TableList = ({ userInfo, staffList, loading }) => {


    // 修改之后的保存事件
    const handleSave = (...e) => {
        console.log(e)
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
                columns={Columns({ userInfo, handleSave })}
            />
        </div>
    )
}

export default TableList
