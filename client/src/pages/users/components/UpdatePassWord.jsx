import iconMap from "components/iconMap";
import React from "react";
import { loginRules } from "utils/rules";

const UpdatePassWord = ({ FormItem, Input, form }) => {
    return (
        <div>
            <FormItem
                name="password"
                hasFeedback
                rules={loginRules.passwordRules}
            >
                <Input
                    placeholder="请输入新的登陆密码"
                    prefix={iconMap.passwordIcon}
                    type="password"
                />
            </FormItem>
            <FormItem
                name="confirmPassword"
                rules={loginRules.confirmPasswordRules(form)}
                hasFeedback
            >
                <Input
                    placeholder="确认登陆密码"
                    prefix={iconMap.passwordIcon}
                    type="password"
                />
            </FormItem>
        </div>
    );
};

export default UpdatePassWord;
