import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "umi"

import TableHeader from "../../components/TableHeader";
import useCommon from "../../hook/useCommon";
import Dialog from "../../components/Dialog";
import SearchContainer from "../../components/SearchContainer";
import DrawerComponent from "../../components/Drawer"

import FilterForm from "./components/FilterForm";
import CreateLevel from "./components/CreateLevel";
import LevelDetail from "./components/LevelDetail";
import LevelTable from "./components/LevelTable";

function Level() {
    const [page, setPage] = useCommon() // useRef 可以获取dom对象，获取缓存的内容
    const dispatch = useDispatch()
    const { total, levelDetail, levelList } = useSelector(state => state.level)
    const [dialogStatus, setDialogStatus] = useState(false)
    // console.log(total, levelDetail, levelList)

    useEffect(() => {
        _initLevelList()
    }, [])

    // 初始化职级列表
    const _initLevelList = (data = {}) => {
        dispatch({
            type: "level/_initLevelList",
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
            changeCurrentPage={(currentPage) => setPage(currentPage) && _initLevelList()}
            interfaceDelMethod={"deleteLevel"}
            openAddDialog={() => setDialogStatus(prev => prev = true)}
        />
        <SearchContainer
            render={() => <FilterForm
                reloadPage={(data) => setPage(1) && _initLevelList(data)}
            />}
        />
        <LevelTable
            levelList={levelList}
            reloadPage={() => _initLevelList()}
        />
        <Dialog
            title="新增职级"
            dialogStatus={dialogStatus}
            render={() => <CreateLevel
                setDialogStatus={setDialogStatus}
                reloadPage={() => setPage(1) && _initLevelList()}
            />}
            setDialogStatus={setDialogStatus}
            width={800}
        />
        <DrawerComponent
            title={levelDetail?.levelName}
            interfaceName="deleteLevel"
            _id={levelDetail?._id}
            render={() => <LevelDetail
                _initLevelList={_initLevelList}
            />}
            reloadList={() => setPage(1) && _initLevelList()}
            // type={"level"}
            type={"staff"}  // 因为删除职级接口描述的有问题，实际上和删除员工使用的是同一类型接口，所以在这规范成删除员工的接口类型
        />
    </div>;
}

export default Level;
