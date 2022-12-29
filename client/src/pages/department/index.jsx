import { useState } from "react";
import { Button } from "antd";
import iconMap from "components/iconMap"
import classnames from "classnames"
import { useSelector, useDispatch } from "umi"
import Dialog from "../../components/Dialog"
import Tree from "./components/Tree";
import FormComponent from "./components/FormComponent";

function Department() {
    const [modalTitle, setModalTitle] = useState("创建部门");
    const [modalType, setModalType] = useState("update");
    const [dialogStatus, setDialogStatus] = useState(false);
    const dispatch = useDispatch();
    const { collapse } = useSelector(state => state.common)

    // 打开新增部门弹窗
    const openDialog = () => {
        setDialogStatus(prev => prev = true);
        setModalTitle(prev => prev = "创建部门")
        setModalType(prev => prev = "add")
    }

    // 根据不同的条件渲染不同的弹窗头部
    const modalTitleComponent = (
        <div className="department-modal-title">
            <span className="ft-b">{modalTitle}</span>
            {modalType === "update" && <span className="delete-icon">{iconMap.del}</span>}
        </div>
    )

    // 点击树状图获取部门详情
    const getDepartmentDetail = (_id, name) => {
        setDialogStatus(prev => prev = true);
        setModalTitle(prev => prev = name);
        setModalType(prev => prev = "update");
        dispatch({
            type: "department/_getDepartmentDetail",
            payload: { _id }
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
            dialogStatus={dialogStatus}
            render={() =>
                <FormComponent
                    setDialogStatus={setDialogStatus}
                    modalType={modalType}
                />
            }
            setDialogStatus={setDialogStatus}
            width={800}
            className="department-detail-modal"
        />
    </div>;
}

export default Department;
