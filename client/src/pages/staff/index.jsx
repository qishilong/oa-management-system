import { useState, useEffect } from 'react'
import TableHeader from '../../components/TableHeader'
import { useDispatch, useSelector } from "umi";
import FilterForm from './components/FilterForm';
import SearchContainer from '../../components/SearchContainer';
import TableList from './components/TableList';

const Staff = () => {

    const [page, setPage] = useState(1);
    const [closeStatus, setCloseStatus] = useState(false);

    const dispatch = useDispatch();
    const { staffList, staffTotal } = useSelector(state => state.staff)
    const { userInfo } = useSelector(state => state.user)
    const loading = useSelector(state => state.loading)
    // console.log(loading)
    // const data = useSelector(state => state)
    // console.log(data)
    // console.log(staffTotal)

    useEffect(() => initStaffData(page), [])

    const initStaffData = (currentPage = page) => dispatch({
        type: "staff/_initStaffData",
        payload: { size: 10, page: currentPage }
    })

    // 改变当前页码的函数
    const changeCurrentPage = (currentPage) => {
        // currentPage 获取到的最新页码
        setPage(currentPage);
        initStaffData(currentPage);
    }
    // console.log(closeStatus)

    return (
        <div className='main-content'>
            {/* 头部公共区域 */}
            <TableHeader
                page={page}
                size={10}
                changeCurrentPage={changeCurrentPage}
                total={staffTotal}
                interfaceDelMethod={"deleteStaffs"}
            />
            {/* 左侧搜索区域 */}
            <SearchContainer
                closeStatus={closeStatus}
                setCloseStatus={setCloseStatus}
                render={() => <FilterForm />}
            />
            {/* 右侧表单展示 */}
            <TableList
                closeStatus={closeStatus}
                userInfo={userInfo}
                staffList={staffList}
                loading={loading}
                reloadPage={initStaffData}
            />
        </div>
    )
}

export default Staff

