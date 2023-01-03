import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "umi";

import Dialog from "../../components/Dialog";
import DrawerComponent from "../../components/Drawer";
import SearchContainer from "../../components/SearchContainer";
import TableHeader from "../../components/TableHeader";
import useCommon from "../../hook/useCommon";

import RewardAndPunishmentDetail from "./components/RewardAndPunishmentDetail";
import FilterForm from "./components/FilterForm";
import CreateRewardAndPunishment from "./components/CreateRewardAndPunishment";
import RewardAndPunishmentTable from "./components/RewardAndPunishmentTable";

const RewardAndPunishment = () => {
    const [dialogStatus, setDialogStatus] = useState(false)

    const [page, setPage] = useCommon()
    const dispatch = useDispatch();
    const { rewardAndPunishmentList, rewardAndPunishmentDetail, total } = useSelector(state => state.rewardAndPunishment)
    // console.log(total, rewardAndPunishmentList, rewardAndPunishmentDetail)

    useEffect(() => {
        _initRewardAndPunishmentList()
    }, [])

    // 初始化绩效考核列表
    const _initRewardAndPunishmentList = (data = {}) => {
        // console.log(1)
        dispatch({
            type: "rewardAndPunishment/_initRewardAndPunishmentList",
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
            changeCurrentPage={(currentPage) => setPage(currentPage) && _initRewardAndPunishmentList()}
            interfaceDelMethod={"deleteRewardAndPunishment"}
            openAddDialog={() => setDialogStatus(prev => prev = true)}
        />
        <SearchContainer
            render={() => <FilterForm reloadPage={(data) => setPage(1) && _initRewardAndPunishmentList(data)} />}
        />
        <RewardAndPunishmentTable
            rewardAndPunishmentList={rewardAndPunishmentList}
            reloadPage={() => _initRewardAndPunishmentList()}
        />
        <Dialog
            title="新增绩效考核"
            dialogStatus={dialogStatus}
            render={() => <CreateRewardAndPunishment
                setDialogStatus={setDialogStatus}
                reloadPage={() => setPage(1) && _initRewardAndPunishmentList()}
            />}
            setDialogStatus={setDialogStatus}
            width={800}
        />
        <DrawerComponent
            title={rewardAndPunishmentDetail?.staffName?.userName}
            interfaceName="deleteRewardAndPunishment"
            _id={rewardAndPunishmentDetail?._id}
            render={() => <RewardAndPunishmentDetail
                _initRewardAndPunishmentList={_initRewardAndPunishmentList}
            />}
            reloadList={() => setPage(1) && _initRewardAndPunishmentList()}
            // type={"rewardAndPunishment"}
            type={"staff"}
        />
    </div>;
}

export default RewardAndPunishment;
