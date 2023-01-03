import React from 'react'
import { Form, Input, DatePicker, message, Button, Row, Col, Select } from "antd"
import DropPopover from '../../../components/DropPopover'
import $http from "api";
import { attendanceRules } from '../../../utils/rules/attendanceRules';
import staticAttendanceList from '../../../staticList/staticAttendanceList';
import { mapData } from '../../../utils/mapData';
const { Option } = Select

const CreateAttendance = ({ setDialogStatus, reloadPage }) => {
    const [form] = Form.useForm();

    const formMap = {
        popover: (item) => <Input
            placeholder={item.initVal}
            readOnly={true}
            addonAfter={
                <DropPopover
                    placeholderVal={item.labelVal}
                    interfaceName="getStaffList"
                    searchType="userName"
                    getSelectItem={(obj) => {
                        form.setFieldsValue({
                            [item.itemName]: obj[item.itemName],
                            staffName: obj._id
                        })
                    }}
                />
            }
        />,
        date: () => <DatePicker placeholder='请选择入职时间' style={{ width: "100%" }} />,
        select: (item) => <Select placeholder={item.initVal}>
            {mapData[item.itemName].map((value, index) => <Option
                key={index}
                value={index}
            >
                {value}
            </Option>)}
        </Select>,
    }

    // 表单提交
    const _onFinish = async (data) => {
        // console.log(data)
        const staffName = form.getFieldValue("staffName");
        delete data.userName
        const { code, msg } = await $http.createAttendance({ staffName, ...data });
        if (!code) {
            message.success(msg);
            reloadPage();
            setDialogStatus(prev => prev = false);
            return
        }
        message.error(msg)
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={_onFinish}
        >
            {staticAttendanceList.map((item, index) => {
                return <Row key={index} justify={"space-between"}>
                    {item.map((childItem, childIndex) => {
                        return <Col key={childIndex} span={11}>
                            <Form.Item
                                label={childItem.labelTxt}
                                name={childItem.itemName}
                                required={true}
                                rules={attendanceRules[childItem.itemName]}
                                style={childItem.style}
                            >
                                {childItem.renderType && formMap[childItem.renderType](childItem)}
                            </Form.Item>
                        </Col>
                    })}
                </Row>
            })}
            <Col span={24} style={{ textAlign: "right" }}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        创建
                    </Button>
                </Form.Item>
            </Col>
        </Form>
    )
}

export default CreateAttendance
