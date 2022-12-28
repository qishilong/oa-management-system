import React from 'react'
import { Button, Pagination, message, Modal } from "antd";
import iconMap from '../iconMap';
import "./index.less"
import { useSelector, useDispatch } from "umi";
import classNames from "classNames"
import $http from "api";

const TableHeader = ({
    page,
    size,
    total,
    changeCurrentPage,
    interfaceDelMethod,
    openAddDialog
}) => {
    const { collapse, ids } = useSelector(state => state.common)
    const dispatch = useDispatch();

    // console.log(ids)
    // console.log(collapse)

    // 删除选定的列表项
    const handleDelete = () => {
        if (!ids.length) return message.error("请选择指定删除的列表项");
        Modal.confirm({
            title: "温馨提示",
            content: "确定删除选择的数据吗？",
            onOk: _deleteConfirm
        })
    }

    // 确定删除
    const _deleteConfirm = async () => {
        const { code, msg } = await $http[interfaceDelMethod]({ ids });
        if (code) return;
        message.success(msg);
        dispatch({ type: "common/saveSelectIds", payload: { ids: [] } })
        changeCurrentPage(1)
    }

    return (
        <div className={classNames("table-header-container", { "big-style": collapse })}>
            <div>
                <Button
                    size='small'
                    shape='round'
                    icon={iconMap.add}
                    className="mr-10"
                    onClick={openAddDialog}
                >
                    创建
                </Button>
                <Button
                    size='small'
                    shape='round'
                    icon={iconMap.del}
                    danger={true}
                    onClick={handleDelete}
                >
                    批量删除
                </Button>
            </div>
            <div className="pagination-container">
                <Pagination
                    simple={true}
                    defaultCurrent={page}
                    current={page}
                    pageSize={size}
                    total={total}
                    onChange={(page) => changeCurrentPage(page)}
                />
                <span>共计{total}条记录</span>
            </div>
        </div >
    )
}

export default TableHeader
