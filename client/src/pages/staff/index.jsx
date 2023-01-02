import { useState, useEffect } from 'react'
import TableHeader from '../../components/TableHeader'
import { useDispatch, useSelector } from "umi";
import FilterForm from './components/FilterForm';
import SearchContainer from '../../components/SearchContainer';
import TableList from './components/TableList';
import DetailForm from './components/DetailForm';
import DrawerComponent from '../../components/Drawer';
import useCommon from '../../hook/useCommon';
import AddForm from './components/AddForm';
import Dialog from '../../components/Dialog';

const Staff = () => {
    const [closeStatus, setCloseStatus] = useState(false);
    const dispatch = useDispatch();
    const { staffList, staffTotal, staffDetail } = useSelector(state => state.staff)
    const { userInfo } = useSelector(state => state.user)
    const loading = useSelector(state => state.loading)
    const [page, setPage] = useCommon()
    const [dialogStatus, setDialogStatus] = useState(false)

    useEffect(() => initStaffData(), [])

    const initStaffData = (queryData) => dispatch({
        type: "staff/_initStaffData",
        payload: { size: 3, page: page.current, ...queryData }
    })

    // 改变当前页码的函数
    const changeCurrentPage = (currentPage) => {
        // currentPage 获取到的最新页码
        setPage(currentPage);
        // initStaffData(page);
        initStaffData();    // 使用useRef来做当前page的更改，所以在此无需加page，只要进行数据请求就行
    }
    // console.log(closeStatus)

    // 根据列表条件进行渲染展示
    const searchResult = (queryData) => initStaffData(queryData);

    return (
        <div className='main-content'>
            {/* 头部公共区域 */}
            <TableHeader
                page={page.current}
                size={3}
                changeCurrentPage={changeCurrentPage}
                total={staffTotal}
                interfaceDelMethod={"destroyStaff"}
                openAddDialog={() => setDialogStatus(prev => prev = true)}
            />
            {/* 左侧搜索区域 */}
            <SearchContainer
                render={() => <FilterForm
                    reload={(data) => setPage(1) && searchResult(data)}
                />}
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
                render={() => <DetailForm
                    staffDetail={staffDetail}
                    _initStaffData={initStaffData}
                />}
                type={"staff"}
            />
            {/* 新增员工组件 */}
            <Dialog
                title="新增员工"
                dialogStatus={dialogStatus}
                render={() => <AddForm
                    setDialogStatus={setDialogStatus}
                    reloadList={() => setPage(1) && initStaffData()}
                />}
                setDialogStatus={setDialogStatus}
                width={800}
            />
        </div>
    )
}

export default Staff

