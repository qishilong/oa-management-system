import React from 'react'
import { Button, Pagination } from "antd";
import iconMap from '../iconMap';
import "./index.less"
import { useSelector } from "umi";
import classNames from "classNames"

const TableHeader = ({ page, size, total, changeCurrentPage, interfaceDelMethod }) => {

    const { collapse } = useSelector(state => state.common)

    return (
        <div className={classNames("table-header-container", { "big-style": collapse })}>
            <div>
                <Button size='small' shape='round' icon={iconMap.add} className="mr-10">创建</Button>
                <Button size='small' shape='round' icon={iconMap.del} danger={true}>批量删除</Button>
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
