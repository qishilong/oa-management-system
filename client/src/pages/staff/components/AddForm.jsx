import React from 'react'
import { Form, Input, Select, Button, DatePicker, Row, Col, message } from 'antd';
import formList from "../../../staticList/staticStaffList"
import UploadComponent from '../../../components/Upload';
import DropPopover from '../../../components/DropPopover';
import { staffRules } from '../../../utils/rules/staffRules';
import $http from "api"

const { Option } = Select;

const AddForm = ({ setDialogStatus, reloadList }) => {
    const [form] = Form.useForm()

    // 用户名，手机号检测
    const checkIsExist = async (item) => {
        if (item.itemName !== "accountName" || item.itemName !== "mobile") return;

        const reqData = await form.validateFields([item.itemName]);
        const { data, msg } = await $http.checkIsExists({ checkData: reqData });
        if (data) {
            form.setFieldsValue({ [item.itemName]: "" })
            return message.error(msg)
        }
    }

    // 新增用户表单提交
    const _onFinish = async (data) => {
        delete data.departmentName;
        delete data.levelName;

        const { code, msg } = await $http.createStaff(data);
        if (code) return;
        message.success(msg);
        reloadList();
        setDialogStatus(prev => prev = false);
        form.resetFields()
    }

    // 表单数据
    const formData = {
        input: (item) => <Input
            placeholder={item.placeholderVal}
            type={item.itemName === "password" ? "password" : "text"}
            onBlur={() => checkIsExist(item)}
        />,
        select: (item) => <Select placeholder={item.placeholderVal}>
            {item.optionData.map((val, index) => <Option key={index} value={index}>{val}</Option>)}
        </Select>,
        date: (item) =>
            <DatePicker style={{ width: "100%" }} placeholder={item.placeholderVal} />,
        popover: (item) => <Input
            placeholder={item.placeholderVal}
            readOnly={true}
            addonAfter={<DropPopover
                placeholderVal={item.placeholderVal}
                interfaceName={item.interfaceName}
                searchType={item.itemName}
                getSelectItem={(res) => {
                    form.setFieldsValue({
                        [item.itemName]: res[item.itemName],
                        [item.itemName.split("N")[0]]: res._id
                    })
                }}
            />}
        />,
        upload: (item) => <UploadComponent getNewAvatar={(avatar) => form.setFieldsValue({ avatar })} />
    }

    return (
        <Form form={form} layout="vertical" onFinish={_onFinish}>
            {formList.map((arr, index) => {
                return <Row key={index} justify={"space-between"}>
                    {arr.map((item, itemIndex) => <Col span={11} key={itemIndex}>
                        <Form.Item
                            style={{ ...item.style }}
                            name={item.itemName}
                            label={item.labelTxt}
                            rules={staffRules[item.itemName]}
                        >
                            {formData[item.renderType](item)}
                        </Form.Item>
                    </Col>
                    )}
                </Row>
            })}
            <Col span={24} style={{ textAlign: "right" }}>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        创建
                    </Button>
                </Form.Item>
            </Col>
        </Form>
    )
}

export default AddForm


