import { useState } from 'react'
import { Modal, Table } from "antd";
import { useSelector } from 'umi';
const { Column } = Table

const AddChildModal = ({
    showChildModal,
    setShowChildModal,
    pushOrUpdateList,
    existsList = []
}) => {
    const [childrenList, setChildrenList] = useState([])
    const departmentList = useSelector(state =>
        state.department.departmentList.filter(
            item => !item.parentLists.length &&
                departmentDetail?._id !== item._id &&
                !existsList.map(item => item._id).
                    includes(item._id)
        ))
    const { departmentDetail } = useSelector(state => state.department)

    // console.log(departmentList)

    // 清空+关闭弹窗操作
    const clearSelect = () => setShowChildModal(prev => prev = false)

    // 新增子部门操作
    const addChildList = () => {
        if (departmentDetail) {
            pushOrUpdateList({ list: childrenList, type: "update" })
        } else {
            pushOrUpdateList({ list: childrenList.concat(existsList), type: "add" })
        }
        setShowChildModal(prev => prev = false)
    }

    return (
        <Modal
            title="增加子部门"
            open={showChildModal}
            destroyOnClose={true}
            onCancel={clearSelect}
            onOk={addChildList}
        >
            <Table
                dataSource={departmentList}
                rowSelection={{
                    onChange: (ids, record) => setChildrenList(prev => prev = record)
                }}
                pagination={false}
                rowKey={(record) => record._id}
                expandIconColumnIndex={-1}
            >
                <Column title="部门名称" dataIndex="departmentName" />
            </Table>
        </Modal>
    )
}

export default AddChildModal
