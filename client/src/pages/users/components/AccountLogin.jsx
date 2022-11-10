import React from "react";

import iconMap from "../../../components/iconMap";
import { loginRules } from "../../../utils/rules";

const AccountLogin = ({ Input, FormItem }) => {
    return (
        <div>
            <FormItem
                name="accountName"
                rules={loginRules.userRules}
                hasFeedback
            >
                <Input placeholder="请输入用户名" prefix={iconMap.userIcon} />
            </FormItem>
            <FormItem
                name="password"
                rules={loginRules.passwordRules}
                hasFeedback
            >
                <Input.Password
                    placeholder="请输入密码"
                    prefix={iconMap.passwordIcon}
                />
            </FormItem>
        </div>
    );
};

export default AccountLogin;
