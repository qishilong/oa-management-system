import { useState } from "react";
import { Button, Modal } from "antd";
import iconMap from "components/iconMap"
import classnames from "classnames"
import { useSelector, useDispatch } from "umi"
import Dialog from "../../components/Dialog"
import Tree from "./components/Tree";
import FormComponent from "./components/FormComponent";

function Department() {
    const [modalTitle, setModalTitle] = useState("创建部门");
    const [modalType, setModalType] = useState("update");
    const dispatch = useDispatch();
    const { collapse } = useSelector(state => state.common)
    const { showModalDialog, departmentId } = useSelector(state => state.department)
    const { userInfo } = useSelector(state => state.user)

    // 打开新增部门弹窗
    const openDialog = () => {
        dispatch({
            type: "department/saveDepartmentDetail",
            payload: { departmentDetail: null }
        })
        setDialogStatus(prev => prev = true);
        setModalTitle(prev => prev = "创建部门")
        setModalType(prev => prev = "add")
    }

    // 删除指定部门
    const deleteDepartment = () => {
        dispatch({
            type: "department/_deleteDepartment",
            payload: departmentId
        })
        setDialogStatus(false);
    }

    // 根据不同的条件渲染不同的弹窗头部
    const modalTitleComponent = (
        <div className="department-modal-title">
            <span className="ft-b">{modalTitle}</span>
            {userInfo.identity === 1 && modalType === "update" &&
                <span className="delete-icon" onClick={() => Modal.confirm({
                    title: "提示",
                    content: `确认要删除 ${modalTitle} 部门吗？`,
                    icon: iconMap.tip,
                    onOk: () => deleteDepartment(),
                    onCancel: () => { },
                    maskClosable: true
                })}>{iconMap.del}</span>}
        </div >
    )

    // 点击树状图获取部门详情
    const getDepartmentDetail = (_id, name) => {
        setModalTitle(prev => prev = name);
        setModalType(prev => prev = "update");
        dispatch({
            type: "department/_getDepartmentDetail",
            payload: { _id }
        })
    }

    // 管理弹出的状态
    const setDialogStatus = (status) => {
        dispatch({
            type: "department/savaShowModalDialog",
            payload: { showModalDialog: status }
        })
    }

    return <div className="department-container">
        {/* 头部内容 */}
        <Button
            className={classnames("create-department-btn", { small: collapse })}
            icon={iconMap.add}
            shape="round"
            size="small"
            onClick={openDialog}
        >
            创建
        </Button>
        <Tree getDepartmentDetail={getDepartmentDetail} />
        {/* 新增部门和部门详情对话框 */}
        <Dialog
            title={modalTitleComponent}
            dialogStatus={showModalDialog}
            className="department-detail-modal"
            setDialogStatus={setDialogStatus}
            width={800}
            render={() =>
                <FormComponent
                    setDialogStatus={setDialogStatus}
                    modalType={modalType}
                />
            }
        />
    </div>;
}

export default Department;
