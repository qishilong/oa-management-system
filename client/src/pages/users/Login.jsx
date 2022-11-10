import "./css/login.less";

import { Button, Col, Form, Input, Row } from "antd";
import logoImg from "common/images/logo.svg";
import iconMap from "components/iconMap";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AccountLogin from "./components/AccountLogin";
import SmCodeLogin from "./components/SmCodeLogin";

const FormItem = Form.Item;
const Login = ({ history, match, location }) => {
    // console.log(history, match, location)
    const [form] = Form.useForm();
    const [type, setType] = useState(0);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);

    // 当表单完成输入后的提交事件
    // 发收送用户信息到后端
    const submitForm = (data) => {
        //- 登录请求的参数处理  type为必选项 + 当前登录模式的参数 手机号码  mobile + code 账户：accountName ,password
        dispatch({ type: 'user/login', payload: { ...data, type } });
    };

    // 组件选择的容器函数
    const SelectForm = (prop) =>
        !type ? <AccountLogin {...prop} /> : <SmCodeLogin {...prop} />;

    return (
        <div className="form">
            <div className="logo">
                <img src={logoImg} alt="logo" />
                <span>人事管理系统</span>
            </div>
            <Form onFinish={submitForm} form={form}>
                {SelectForm({ form, FormItem, Input })}
                <Row>
                    <Button
                        block={true}
                        type="primary"
                        htmlType="submit"
                        loading={loading.effects["user/login"]}
                    >
                        登录
                    </Button>
                </Row>
                <Row>
                    <Col span={6}>
                        <p
                            className="login-methods-container"
                            onClick={() => {
                                history.push("/users/forgetPassword");
                            }}
                        >
                            忘记密码?
                        </p>
                    </Col>
                    <Col span={18}>
                        <p
                            onClick={() => {
                                setType(!type ? 1 : 0);
                            }}
                            className="login-methods-container login-methods"
                        >
                            {!type
                                ? "使用手机号+验证码登录"
                                : "使用账号密码登录"}
                            {iconMap.arrRowRight}
                        </p>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Login;
