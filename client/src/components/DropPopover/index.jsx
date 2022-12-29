import { useState, useEffect } from 'react'
import { Popover, Input, List, Pagination } from "antd"
import "./index.less"
import useCommon from '../../hook/useCommon';
import $http from "api"
const { Search } = Input;

/**
 * getSelectItem function
 */
const DropPopover = ({ placeholderVal, interfaceName, searchType, getSelectItem }) => {

    const [total, setTotal] = useState(0);
    const [page, setPage] = useCommon(0);
    const [list, setList] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        _initList();
    }, [])

    // 初始化列表数据
    const _initList = async (queryData = {}) => {
        const { data } = await $http[interfaceName]({
            page: page.current,
            size: 5,
            queryData
        })
        setTotal(prev => prev = data.total || data.staffTotal);
        setList(prev => prev = data.list || data.staffList);
    }
    // 搜索函数
    const onSearch = (val) => {
        const searchData = !val ? {} : { [searchType]: val };
        setPage(1);
        _initList(searchData)
    }

    // 改变页数函数
    const onChangePage = (currentPage) => {
        setPage(currentPage);
        _initList();
    }

    // 列表选定操作
    const selectItem = (item) => {
        setVisible(prev => prev = false);
        // console.log(item);
        getSelectItem(item)
    }

    return (
        <>
            <Popover
                placement='bottomRight'
                title={<Search
                    placeholder={placeholderVal}
                    onSearch={onSearch}
                ></Search>}
                trigger="click"
                open={visible}
                onOpenChange={(status) => setVisible(prev => prev = status)}
                content={
                    <List
                        dataSource={list}
                        renderItem={(item) => <List.Item
                            style={{ cursor: 'pointer' }}
                            onClick={() => selectItem(item)}
                        >
                            {item[searchType]}
                        </List.Item>}
                        footer={
                            <Pagination
                                onChange={onChangePage}
                                current={page.current}
                                pageSize={5}
                                total={total}
                            />}
                    ></List>
                }
            >
                <span className='add-icon'>+</span>
            </Popover>
        </>
    )
}

export default DropPopover
