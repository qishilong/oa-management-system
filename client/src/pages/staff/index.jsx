import { useState, useEffect } from 'react'
import TableHeader from '../../components/TableHeader'
import { useDispatch, useSelector } from "umi";

const Staff = () => {

    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const { staffTotal } = useSelector(state => state.staff)
    // const data = useSelector(state => state)
    // console.log(data)
    // console.log(staffTotal)

    useEffect(() => initStaffData(page), [])

    const initStaffData = (currentPage) => dispatch({ type: "staff/_initStaffData", payload: { size: 10, page: currentPage } })

    // 改变当前页码的函数
    const changeCurrentPage = (currentPage) => {
        // currentPage 获取到的最新页码
        setPage(currentPage);
        initStaffData(currentPage);
    }

    return (
        <div className='main-container'>
            <TableHeader
                page={page}
                size={10}
                changeCurrentPage={changeCurrentPage}
                total={staffTotal}
                interfaceDelMethod={"deleteStaffs"}
            />
        </div>
    )
}

export default Staff

