import { useState, useEffect } from 'react'
import TableHeader from '../../components/TableHeader'
import { useDispatch, useSelector } from "umi";
import FilterForm from './components/FilterForm';
import SearchContainer from '../../components/SearchContainer';
import TableList from './components/TableList';
import DetailForm from './components/DetailForm';
import DrawerComponent from '../../components/Drawer';
import useCommon from '../../hook/useCommon';

const Staff = () => {
    const [closeStatus, setCloseStatus] = useState(false);
    const dispatch = useDispatch();
    const { staffList, staffTotal, staffDetail } = useSelector(state => state.staff)
    const { userInfo } = useSelector(state => state.user)
    const loading = useSelector(state => state.loading)
    const [page, setPage] = useCommon()
    // const data = useSelector(state => state)
    // console.log(data)
    // console.log(staffTotal)

    // console.log(page, 1111)

    useEffect(() => initStaffData(), [])

    const initStaffData = () => dispatch({
        type: "staff/_initStaffData",
        payload: { size: 3, page: page.current }
    })

    // 改变当前页码的函数
    const changeCurrentPage = (currentPage) => {
        // currentPage 获取到的最新页码
        setPage(currentPage);
        // initStaffData(page);
        initStaffData();    // 使用useRef来做当前page的更改，所以在此无需加page，只要进行数据请求就行
    }
    // console.log(closeStatus)

    return (
        <div className='main-content'>
            {/* 头部公共区域 */}
            <TableHeader
                page={page.current}
                size={3}
                changeCurrentPage={changeCurrentPage}
                total={staffTotal}
                interfaceDelMethod={"destroyStaff"}
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
            {/* 使用抽屉组件展示详情信息 */}
            <DrawerComponent
                _id={staffDetail?._id}
                title={staffDetail?.userName}
                interfaceName="destroyStaff"
                reloadList={() => setPage(1) && initStaffData()}
                render={() => <DetailForm />}
            />
        </div>
    )
}

export default Staff

