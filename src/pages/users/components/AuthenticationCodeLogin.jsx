import React from 'react';
import IconMap from '../../../components/IconMap';
import { Button } from 'antd';

const AuthenticationCodeLogin = ({ Input, FormItem }) => {
  return (
    <div>
      <FormItem>
        <Input placeholder="请输入用户名" prefix={IconMap.mobileIcon} />
      </FormItem>
      <FormItem>
        <Input
          placeholder="请输入验证码"
          prefix={IconMap.codeIcon}
          addonAfter={<Button>获取验证码</Button>}
        />
      </FormItem>
    </div>
  );
};

export default AuthenticationCodeLogin;
