import { useState } from 'react'
import { Table, Button, Modal } from "antd"
import iconMap from "../../../components/iconMap"
import AddChildModal from './AddChildModal'

const { Column } = Table

const ChildDepartment = ({ childrenList, pushOrUpdateList, departmentDetail }) => {
    const [delList, setDelList] = useState([]);
    const [showDeleteModal, setDeleteModal] = useState(false)
    const [showChildModal, setShowChildModal] = useState(false)

    // 增加子部门事件
    const getDepartmentList = () => {
        setShowChildModal(prev => prev = true)
    }

    // 删除子部门事件
    const deleteDepartment = () => {
        // console.log(departmentDetail, delList, 111)
        setDeleteModal(prev => prev = false)
        if (departmentDetail) {
            pushOrUpdateList({ list: delList, type: "del" })
        } else {
            const ids = delList.map((item) => item._id)
            const tempArr = childrenList.filter(item => !ids.includes(item._id))
            pushOrUpdateList({ type: "add", list: tempArr })
        }
        // console.log("deleteDepartment")
    }

    return (
        <>
            <Table
                dataSource={childrenList}
                rowSelection={{
                    onChange: (ids, record) => setDelList(prev => prev = record)
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
                    onClick={() => setDeleteModal(prev => prev = true)}
                    disabled={!delList.length}
                >
                    解除子部门关联
                </Button>
            </div>
            {/* 新增子部门弹窗 */}
            <AddChildModal
                showChildModal={showChildModal}
                setShowChildModal={setShowChildModal}
                pushOrUpdateList={pushOrUpdateList}
                existsList={childrenList}
            />
            {/* 接触子部门弹窗 */}
            <Modal
                title="提示"
                open={showDeleteModal}
                onOk={deleteDepartment}
                onCancel={() => setDeleteModal(prev => prev = false)}
            >
                确定要删除选定的部门吗？
            </Modal>
        </>
    )
}

export default ChildDepartment
