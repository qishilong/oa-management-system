import "./css/login.less";

import { Button, Form, Input, message, Row } from "antd";
import $http from "api";
import React, { useState } from "react";

import SmCodeLogin from "./components/SmCodeLogin";
import UpdatePassWord from "./components/UpdatePassWord";

function ForgetPassword({ history }) {
    const [currentComponent, setCurrentComponent] = useState(1); // 判断当前展示的那个组件
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    const checkSmCode = async (smCode) => {
        console.log(smCode);
        const { data, msg } = await $http.checkSmCode({ smCode });
        console.log(data);
        if (data) {
            setCurrentComponent((previousValue) => (previousValue = 2));
        } else {
            message.error(msg);
        }
    };

    const checkConfirmPassword = async (newPassword) => {
        const { data, msg } = await $http.resetPassword({ newPassword });
        if (data) {
            message.success(msg);
            history.push('/users/login');
        } else {
            message.error(msg);
        }
    };

    const selectComponent = (props) =>
        currentComponent === 1 ? (
            <SmCodeLogin {...props} />
        ) : (
            <UpdatePassWord {...props} />
        );

    const submitSelect = async (data) => {
        console.log(data);
        currentComponent === 1
            ? checkSmCode(data.verificationCode)
            : checkConfirmPassword(data.confirmPassword);
    };

    return (
        <div className="form forget-password">
            <div className="forget-password-title">
                {currentComponent === 1 ? '忘记密码' : '重置密码'}
            </div>
            <Form form={form} onFinish={submitSelect}>
                {selectComponent({ FormItem, Input, form })}
                <Row>
                    <Button type="primary" htmlType="submit">
                        {currentComponent === 1 ? '下一步' : '重置'}
                    </Button>
                </Row>
            </Form>
        </div>
    );
}

export default ForgetPassword;
