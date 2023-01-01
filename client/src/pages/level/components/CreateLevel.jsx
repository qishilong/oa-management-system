import React from 'react'
import { Form, Input, Button, Row, Col, message } from "antd";
import $http from "api";
import staticLevelList from '../../../staticList/staticLevelList';
import { levelRules } from '../../../utils/rules';

const CreateLevel = ({ setDialogStatus, reloadPage }) => {
    const [form] = Form.useForm();

    // 新增表单提交
    const _onFinish = async (values) => {
        const { code, msg } = await $http.createLevel(values)
        if (code) return message.error(msg);
        message.success(msg);
        reloadPage()
        setDialogStatus(prev => prev = false);
        form.resetFields();
    }


    return (
        <Form form={form} layout="vertical" onFinish={_onFinish}>
            {staticLevelList.map((item, index) => {
                return <Row key={index} justify={"space-between"}>
                    {item.map((childItem, childIndex) => {
                        return <Col
                            span={11}
                            key={childIndex}
                        >
                            <Form.Item
                                style={childItem.style}
                                label={childItem.labelTxt}
                                name={childItem.itemName}
                                rules={levelRules[childItem.itemName]}
                                required={true}
                            >
                                <Input placeholder={childItem.initVal} />
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

export default CreateLevel
