import React from 'react'
import { Table, message } from "antd"
import { useDispatch, useSelector } from "umi";
import Columns from "./Columns"
import { EditableCell, EditableRow } from '../../../components/Editable';
import $http from "api"

const SalaryTable = ({ salaryList, reloadPage }) => {
    const { loading } = useSelector(state => state)
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user)

    // 修改
    const handleSave = async (value) => {
        const { code, msg } = await $http.updateSalary(value);
        if (code) return message.error(msg);
        message.success(msg);
        reloadPage()
    }

    // 获取详情
    const getSalaryDetail = (_id) => {
        dispatch({
            type: "salary/_initSalaryDetail",
            payload: { _id }
        })
    }

    // 选中行的操作
    const selectRow = (ids) => {
        dispatch({
            type: "common/saveSelectIds",
            payload: { ids: ids }
        })
    }

    return (
        <Table
            components={{ body: { row: EditableRow, cell: EditableCell } }}
            rowKey={record => record._id}
            bordered={true}
            dataSource={salaryList}
            columns={Columns(handleSave, getSalaryDetail, userInfo)}
            pagination={false}
            rowSelection={{ onChange: selectRow }}
            loading={loading.effects["salary/_initSalaryList"]}
        />
    )
}

export default SalaryTable
