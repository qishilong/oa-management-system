import React from 'react'
import { useDispatch, useSelector } from "umi";
import { Table, message } from "antd";
import Columns from "./Columns";
import { EditableCell, EditableRow } from '../../../components/Editable';
import $http from "api"

const LevelTable = ({ reloadPage, levelList }) => {
    const { loading } = useSelector(state => state);
    const { userInfo } = useSelector(state => state.user)
    const dispatch = useDispatch();
    // console.log(levelList, reloadPage)


    // 获取详情
    const getLevelDetail = (_id) => {
        // console.log(_id, 111)
        dispatch({ type: "level/_initLevelDetail", payload: { _id } })
    }

    // 选中多条信息
    const selectRow = (ids) => {
        // console.log(ids)
        dispatch({ type: "common/saveSelectIds", payload: { ids } })
    }


    // 修改职级
    const handleSave = async (updateObj) => {
        const { code, msg } = await $http.updateLevelDetail(updateObj);
        if (code) return message.error(msg);
        message.success(msg);
        reloadPage()
    }

    return (
        <Table
            components={
                {
                    body: {
                        row: EditableRow,
                        cell: EditableCell,
                    }
                }
            }
            loading={loading.effects["level/_initLevelList"]}
            bordered={true}
            rowKey={record => record._id}
            pagination={false}
            dataSource={levelList}
            rowSelection={{ onChange: selectRow }}
            columns={Columns(handleSave, getLevelDetail, userInfo)}
        />
    )
}

export default LevelTable
