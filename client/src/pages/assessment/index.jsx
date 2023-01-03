import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "umi";

import Dialog from "../../components/Dialog";
import DrawerComponent from "../../components/Drawer";
import SearchContainer from "../../components/SearchContainer";
import TableHeader from "../../components/TableHeader";
import useCommon from "../../hook/useCommon";

import AssessmentDetail from "./components/AssessmentDetail";
import FilterForm from "./components/FilterForm";
import CreateAssessment from "./components/CreateAssessment";
import AssessmentTable from "./components/AssessmentTable";

function Assessment() {
    const [dialogStatus, setDialogStatus] = useState(false)

    const [page, setPage] = useCommon()
    const dispatch = useDispatch();
    const { assessmentList, assessmentDetail, total } = useSelector(state => state.assessment)
    // console.log(total, assessmentList, assessmentDetail)

    useEffect(() => {
        _initAssessmentList()
    }, [])

    // 初始化绩效考核列表
    const _initAssessmentList = (data = {}) => {
        dispatch({
            type: "assessment/_initAssessmentList",
            payload: {
                page: page.current,
                size: 5,
                queryData: data
            }
        })
    }

    return <div className="main-content">
        <TableHeader
            page={page.current}
            size={5}
            total={total}
            changeCurrentPage={(currentPage) => setPage(currentPage) && _initAssessmentList()}
            interfaceDelMethod={"deleteAssessment"}
            openAddDialog={() => setDialogStatus(prev => prev = true)}
        />
        <SearchContainer
            render={() => <FilterForm reloadPage={(data) => setPage(1) && _initAssessmentList(data)} />}
        />
        <AssessmentTable
            assessmentList={assessmentList}
            reloadPage={() => _initAssessmentList()}
        />
        <Dialog
            title="新增绩效考核"
            dialogStatus={dialogStatus}
            render={() => <CreateAssessment
                setDialogStatus={setDialogStatus}
                reloadPage={() => setPage(1) && _initAssessmentList()}
            />}
            setDialogStatus={setDialogStatus}
            width={800}
        />
        <DrawerComponent
            title={assessmentDetail?.staffName?.userName}
            interfaceName="deleteAssessment"
            _id={assessmentDetail?._id}
            render={() => <AssessmentDetail
                _initAssessment={_initAssessmentList}
            />}
            reloadList={() => setPage(1) && _initAssessmentList()}
            // type={"assessment"}
            type={"staff"}
        />
    </div>;
}

export default Assessment;
