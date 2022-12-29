import { useState } from 'react'
import { Table, Button, Modal } from "antd"
import iconMap from "../../../components/iconMap"
import AddChildModal from './AddChildModal'

const { Column } = Table

const ChildDepartment = ({ childrenList, pushOrUpdateList }) => {
    const [deleteIds, setDeleteIds] = useState([]);
    const [showDeleteModal, setDeleteModal] = useState(false)
    const [showChildModal, setShowChildModal] = useState(false)

    // 增加子部门事件
    const getDepartmentList = () => {
        setShowChildModal(prev => prev = true)
    }

    // 删除子部门事件
    const deleteDepartment = () => {
        console.log("deleteDepartment")
    }

    return (
        <>
            <Table
                dataSource={childrenList}
                rowSelection={{
                    onChange: (ids) => setDeleteIds(prev => prev = ids)
                }}
                pagination={false}
                rowKey={record => record._id}
                expandIconColumnIndex={-1}
            >
                <Column title="名称" dataIndex="departmentName" />
            </Table>
            {/* 操作按钮 */}
            <div className="operation">
                <Button
                    type='primary'
                    style={{ marginRight: "10px" }}
                    icon={iconMap.api}
                    onClick={getDepartmentList}
                >
                    增加子部门
                </Button>
                <Button
                    icon={iconMap.del}
                    onClick={() => setShowChildModal(prev => prev = true)}
                    disabled={!deleteIds.length}
                >
                    解除子部门关联
                </Button>
            </div>
            {/* 新增子部门弹窗 */}
            <AddChildModal
                showChildModal={showChildModal}
                setShowChildModal={setShowChildModal}
                pushOrUpdateList={pushOrUpdateList}
            />
            {/* 接触子部门弹窗 */}
            <Modal
                title="提示"
                open={showDeleteModal}
                onOk={() => deleteDepartment}
                onCancel={() => setDeleteModal(prev => prev = false)}
            >
                确定要删除选定的部门吗？
            </Modal>
        </>
    )
}

export default ChildDepartment
