import { useEffect, useState } from 'react'
import columnsData from "./columnsData"
import $http from "api"
import { Table } from "antd"

const RenderType = ({ type, interfaceName, requestData }) => {
    const [source, setSource] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => _initData(), [])

    // 表哥初始化数据发送请求
    const _initData = async (page = 1) => {
        // console.log(interfaceName)
        const res = await $http[interfaceName]({ ...requestData, page })
        // console.log(res)
        setSource(prev => prev = res.data | res.data.list);
        setTotal(prev => prev = res.total | res.data.total)
    }


    // 分页点击事件
    const pageChange = (page) => _initData(page)

    return (
        <Table
            dataSource={source}
            columns={columnsData[type]}
            rowKey={columns => columns._id}
            pagination={{ defaultPageSize: 5, onChange: pageChange, total: total }}
        />
    )
}

export default RenderType
