import React from 'react'
import { Drawer, Modal, message } from "antd"
import { useDispatch, useSelector } from 'umi';
import iconMap from '../iconMap';
import $http from "api"
import "./index.less"

const DrawerComponent = ({ title, interfaceName, _id, render, reloadList, type }) => {

    const { isShowDetailDialog } = useSelector(state => state.common)
    const { userInfo } = useSelector(state => state.user)
    const dispatch = useDispatch();

    // 打开删除的对话框
    const openModalDialog = () => {
        Modal.confirm({
            title: "温馨提示",
            content: "确定删除当前用户信息吗？",
            onOk: _deleteItem
        })
    }

    // 删除指定的列表项（详情展示的这一项数据）
    const _deleteItem = async () => {
        const { code, msg } = await $http[interfaceName](type === "staff" ? { ids: [_id] } : { _id })
        if (code) return;
        message.success(msg);
        closeModalDialog();
        reloadList()
    }

    // 关闭弹窗
    const closeModalDialog = () => dispatch({ type: "common/changeIsShowDetailDialog", payload: { isShowDetailDialog: false } })

    // 左边头部内容
    const titleNode = (
        <>
            <span>{iconMap.copy}</span>
            <span>{title}</span>
        </>
    )


    const extra = (
        <div className='icon-wrapper'>
            {userInfo.identity === 1 && <span className="icon" onClick={openModalDialog}>{iconMap.del}</span>}
            <span className="line"></span>
            <span className="icon" onClick={closeModalDialog}>{iconMap.close}</span>
        </div>
    )


    return (
        <Drawer
            title={titleNode}
            placement="right"
            width={800}
            open={isShowDetailDialog}
            extra={extra}
            closable={false}
            destroyOnClose={true}
        >
            {render()}
        </Drawer>
    )
}

export default DrawerComponent
