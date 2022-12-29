import { useState } from 'react'
import { Form, Input, Button, Row, Descriptions } from "antd"
import DropPopover from '../../../../components/DropPopover'
import ChildDepartment from '../ChildDepartment'
import { useDispatch } from 'umi'
import "./index.less"
import { departmentRules } from '../../../../utils/rules'

const FormComponent = ({ setDialogStatus, modalType }) => {
    const dispatch = useDispatch();
    const [childrenList, setChildrenList] = useState([])

    const [form] = Form.useForm()
    // console.log(setDialogStatus, modalType)

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
        console.log(data)
    }

    // 新增子部门或修改部门
    const pushOrUpdateList = (data) => {
        const childrenIds = data.list.map((item) => item._id)
        setChildrenList(prev => prev = data.list)
        form.setFieldsValue({ children: childrenIds })
    }

    return (
        <Form form={form} onFinish={_onFinish}>
            <Descriptions column={1} bordered={true} labelStyle={{ width: "150px" }}>
                <Descriptions.Item label="部门名称">
                    <Form.Item
                        name="departmentName"
                        rules={departmentRules.departmentName}
                    >
                        <Input onBlur={
                            () => {
                                // todo
                            }
                        } />
                    </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="备注">
                    <Form.Item name="remark">
                        <Input
                            onBlur={() => {
                                // todo
                            }}
                        />
                    </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="子部门">
                    <ChildDepartment
                        childrenList={childrenList}
                        pushOrUpdateList={pushOrUpdateList}
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
                                    }}
                                />
                            }
                        />
                    </Form.Item>
                </Descriptions.Item>
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
