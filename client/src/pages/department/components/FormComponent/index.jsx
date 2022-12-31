import { useState } from 'react'
import { Form, Input, Button, Row, Descriptions } from "antd"
import DropPopover from '../../../../components/DropPopover'
import ChildDepartment from '../ChildDepartment'
import { useDispatch, useSelector } from 'umi'
import { departmentRules } from '../../../../utils/rules'
import StaffTable from '../StaffTable'
import "./index.less"

const FormComponent = ({ setDialogStatus, modalType }) => {
    const dispatch = useDispatch();
    const [childrenList, setChildrenList] = useState([])

    const [form] = Form.useForm()
    const { departmentDetail } = useSelector(state => state.department);
    // console.log(form.getFieldInstance(((...props) => console.log(...props))))

    // 新增表单提交
    const _onFinish = (data) => {
        const children = form.getFieldValue("children");
        const departmentLeader = form.getFieldValue("departmentLeader")
        delete data.departmentLeaderName;
        dispatch({
            type: "department/_addDepartment",
            payload: {
                departmentLeader,
                children,
                ...data
            }
        })
        setDialogStatus(prev => prev = false)
        // console.log(data)
    }

    // 新增子部门或修改部门
    const pushOrUpdateList = ({ list, type }) => {
        const childrenIds = list.map((item) => item._id)
        if (type === "update" || type === "del") {
            const isDelete = type === "del";
            updateDepartment({ type: "children", updateVal: childrenIds, isDelete })
        } else {
            console.log(list);
            setChildrenList(prev => prev = list);
            form.setFieldsValue({ children: childrenIds })
        }
        setChildrenList(prev => prev = list)
        form.setFieldsValue({ children: childrenIds })
    }

    // 修改部门信息
    const updateDepartment = ({ type, updateVal, isDelete = false }) => {
        if (!updateVal) {
            updateVal = form.getFieldValue(type);
            // 判断新旧值是否相等
            if (updateVal === departmentDetail[type]) return
        }
        dispatch({
            type: "department/_updateDepartmentDetail",
            payload: {
                _id: departmentDetail._id,
                type,
                updateVal,
                isDelete
            }
        })
    }
    // console.log(departmentDetail)

    return (
        <Form
            form={form}
            onFinish={_onFinish}
            initialValues={{
                departmentName: departmentDetail?.departmentName,
                remark: departmentDetail?.remark,
                departmentLeaderName: departmentDetail?.departmentLeader?.userName
            }}
        >
            <Descriptions column={1} bordered={true} labelStyle={{ width: "150px" }}>
                <Descriptions.Item label="部门名称">
                    <Form.Item
                        name="departmentName"
                        rules={departmentRules.departmentName}
                    >
                        <Input onBlur={
                            () => {
                                // todo
                                modalType === "update" &&
                                    updateDepartment({ type: "departmentName" })
                            }
                        } />
                    </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="备注">
                    <Form.Item name="remark">
                        <Input
                            onBlur={() => {
                                // todo
                                modalType === "update" &&
                                    updateDepartment({ type: "remark" })
                            }}
                        />
                    </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="子部门">
                    <ChildDepartment
                        childrenList={modalType === "update" ? departmentDetail?.children : childrenList}
                        pushOrUpdateList={pushOrUpdateList}
                        departmentDetail={departmentDetail}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="部门负责人">
                    <Form.Item
                        name="departmentLeaderName"
                        rules={departmentRules.departmentLeader}
                    >
                        <Input
                            placeholder='请输入部门负责人'
                            readOnly={true}
                            className="border-1"
                            addonAfter={
                                <DropPopover
                                    placeholderVal="请输入要查找的员工姓名"
                                    interfaceName="getStaffList"
                                    searchType="userName"
                                    getSelectItem={(item) => {
                                        form.setFieldsValue({
                                            departmentLeaderName: item.userName,
                                            departmentLeader: item._id,
                                        })
                                        modalType === "update" && updateDepartment({ type: "departmentLeader" })
                                    }}
                                />
                            }
                        />
                    </Form.Item>
                </Descriptions.Item>
                {modalType === "update" && <Descriptions.Item label="部门员工">
                    <StaffTable staffList={departmentDetail.staffList} />
                </Descriptions.Item>}
            </Descriptions>
            {modalType === "add" && <Form.Item>
                <Row justify="end">
                    <Button className='mt-20' type='primary' htmlType='submit'>
                        创建
                    </Button>
                </Row>
            </Form.Item>}
        </Form>
    )
}

export default FormComponent
