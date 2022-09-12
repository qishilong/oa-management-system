import React, { useState } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import AccountLogin from './components/AccountLogin';
import AuthenticationCodeLogin from './components/AuthenticationCodeLogin';
import './css/login.less';
import IconMap from '../../components/IconMap';
import logoImg from 'common/images/logo.svg';

const FormItem = Form.Item;
const Login = () => {
  const [form] = Form.useForm();
  const [type, setType] = useState(true);

  // 当表单完成输入后的提交事件
  const submitForm = (e) => {
    console.log(e);
  };

  // 组件选择的容器函数
  const SelectForm = (prop) =>
    type ? <AccountLogin {...prop} /> : <AuthenticationCodeLogin {...prop} />;

  return (
    <div className="divForm">
      <div className="logo">
        <img src={logoImg} alt="logo" />
        <span>人事管理系统</span>
      </div>
      <Form onFinish={submitForm} form={form}>
        {SelectForm({ form, FormItem, Input })}
        <Row>
          <Button block={true} type="primary">
            登录
          </Button>
        </Row>
        <Row className="row-6-18">
          <Col span={6}>忘记密码?</Col>
          <Col
            span={18}
            onClick={() => {
              setType(!type);
            }}
            className="align-right"
          >
            {type ? '使用手机号+验证码登录' : '使用账号密码登录'}
            {IconMap.arrRowRight}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
