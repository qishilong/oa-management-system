import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "umi";

import Dialog from "../../components/Dialog";
import DrawerComponent from "../../components/Drawer";
import SearchContainer from "../../components/SearchContainer";
import TableHeader from "../../components/TableHeader";
import useCommon from "../../hook/useCommon";

import SalaryDetail from "./components/SalaryDetail";
import FilterForm from "./components/FilterForm";
import CreateSalary from "./components/CreateSalary";
import SalaryTable from "./components/SalaryTable";

function Salary() {
    const [dialogStatus, setDialogStatus] = useState(false)

    const [page, setPage] = useCommon()
    const dispatch = useDispatch();
    const { salaryList, salaryDetail, total } = useSelector(state => state.salary)
    // console.log(total, salaryList, salaryDetail)

    useEffect(() => {
        _initSalaryList()
    }, [])

    // 初始化绩效考核列表
    const _initSalaryList = (data = {}) => {
        // console.log(1)
        dispatch({
            type: "salary/_initSalaryList",
            payload: {
                page: page.current,
                size: 5,
                ...data
            }
        })
    }

    return <div className="main-content">
        <TableHeader
            page={page.current}
            size={5}
            total={total}
            changeCurrentPage={(currentPage) => setPage(currentPage) && _initSalaryList()}
            interfaceDelMethod={"deleteSalary"}
            openAddDialog={() => setDialogStatus(prev => prev = true)}
        />
        <SearchContainer
            render={() => <FilterForm reloadPage={(data) => setPage(1) && _initSalaryList(data)} />}
        />
        <SalaryTable
            salaryList={salaryList}
            reloadPage={() => _initSalaryList()}
        />
        <Dialog
            title="新增绩效考核"
            dialogStatus={dialogStatus}
            render={() => <CreateSalary
                setDialogStatus={setDialogStatus}
                reloadPage={() => setPage(1) && _initSalaryList()}
            />}
            setDialogStatus={setDialogStatus}
            width={800}
        />
        <DrawerComponent
            title={salaryDetail?.staffName?.userName}
            interfaceName="deleteSalary"
            _id={salaryDetail?._id}
            render={() => <SalaryDetail
                _initSalaryList={_initSalaryList}
            />}
            reloadList={() => setPage(1) && _initSalaryList()}
            // type={"salary"}
            type={"staff"}
        />
    </div>;
}

export default Salary;
