import React from 'react';
import IconMap from '../../../components/IconMap';
import { loginRules } from '../../../utils/rules';

const AccountLogin = ({ Input, FormItem }) => {
  return (
    <div>
      <FormItem name="accountName" rules={loginRules.userRules} hasFeedback>
        <Input placeholder="请输入用户名" prefix={IconMap.userIcon} />
      </FormItem>
      <FormItem name="password" rules={loginRules.passwordRules} hasFeedback>
        <Input.Password
          placeholder="请输入密码"
          prefix={IconMap.passwordIcon}
        />
      </FormItem>
    </div>
  );
};

export default AccountLogin;
