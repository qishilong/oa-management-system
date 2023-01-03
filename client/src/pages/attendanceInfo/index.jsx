import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "umi";

import Dialog from "../../components/Dialog";
import DrawerComponent from "../../components/Drawer";
import SearchContainer from "../../components/SearchContainer";
import TableHeader from "../../components/TableHeader";
import useCommon from "../../hook/useCommon";

import FilterForm from "./components/FilterForm";
import AttendanceTable from "./components/AttendanceTable";
import CreateAttendance from "./components/CreateAttendance";
import AttendanceDetail from "./components/AttendanceDetail";


const AttendanceInfo = () => {
    const [dialogStatus, setDialogStatus] = useState(false)

    const [page, setPage] = useCommon()
    const dispatch = useDispatch();
    const { attendanceList, attendanceDetail, total } = useSelector(state => state.attendanceInfo)
    // console.log(total, attendanceList, attendanceDetail)

    useEffect(() => {
        _initAttendanceList()
    }, [])

    // 初始化绩效考核列表
    const _initAttendanceList = (data = {}) => {
        // console.log(1)
        dispatch({
            type: "attendanceInfo/_initAttendanceList",
            payload: {
                page: page.current,
                size: 10,
                queryData: data
            }
        })
    }

    return <div className="main-content">
        <TableHeader
            page={page.current}
            size={10}
            total={total}
            changeCurrentPage={(currentPage) => setPage(currentPage) && _initAttendanceList()}
            interfaceDelMethod={"deleteAttendance"}
            openAddDialog={() => setDialogStatus(prev => prev = true)}
        />
        <SearchContainer
            render={() => <FilterForm reloadPage={(data) => setPage(1) && _initAttendanceList(data)} />}
        />
        <AttendanceTable
            attendanceList={attendanceList}
            reloadPage={() => _initAttendanceList()}
        />
        <Dialog
            title="新增绩效考核"
            dialogStatus={dialogStatus}
            render={() => <CreateAttendance
                setDialogStatus={setDialogStatus}
                reloadPage={() => setPage(1) && _initAttendanceList()}
            />}
            setDialogStatus={setDialogStatus}
            width={800}
        />
        <DrawerComponent
            title={attendanceDetail?.staffName?.userName}
            interfaceName="deleteAttendance"
            _id={attendanceDetail?._id}
            render={() => <AttendanceDetail
                _initAttendanceList={_initAttendanceList}
            />}
            reloadList={() => setPage(1) && _initAttendanceList()}
            // type={"attendance"}
            type={"staff"}
        />
    </div>;
}

export default AttendanceInfo;
