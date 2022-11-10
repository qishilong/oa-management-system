// @ts-nocheck
import { Button, message } from "antd";
import $http from "api";
import React, { useState } from "react";

import iconMap from "../../../components/iconMap";
import { loginRules } from "../../../utils/rules";

const SmCodeLogin = ({ Input, FormItem, form }) => {
    const [disabled, setDisabled] = useState(true);
    const [currentStatus, setCurrentStatus] = useState(true);
    let [currentTime, setCurrentTime] = useState(60);

    const sendVerificationCode = async () => {
        setCurrentStatus(false);
        // 获取当前用户输入的手机号
        const mobile = form.getFieldValue("mobile");
        const resp = await $http.getSmCode({ mobile });
        message.success(resp.msg);
        setDisabled(true);
        // 倒计时函数
        runTime();
    };
    const runTime = () => {
        const timer = setInterval(() => {
            if (currentTime === 0) {
                clearInterval(timer);
                setCurrentStatus(true);
                setDisabled(false);
                setCurrentTime(60);
                return;
            }
            setCurrentTime(--currentTime);
        }, 1000);
    };

    const inputChange = async () => {
        try {
            const inputValue = await form.validateFields(["mobile"]);
            setDisabled(!disabled);
        } catch (error) {
            setDisabled(true);
        }
    };
    return (
        <>
            <FormItem name="mobile" rules={loginRules.mobileRules} hasFeedback>
                <Input
                    placeholder="请输入手机号"
                    prefix={iconMap.mobileIcon}
                    onChange={inputChange}
                />
            </FormItem>
            <FormItem
                name="verificationCode"
                rules={loginRules.verificationCode}
                hasFeedback
            >
                <Input
                    placeholder="请输入验证码"
                    prefix={iconMap.codeIcon}
                    addonAfter={
                        <Button
                            disabled={disabled}
                            onClick={sendVerificationCode}
                        >
                            {currentStatus
                                ? "发送验证码"
                                : `${currentTime}秒后重新发送`}
                        </Button>
                    }
                />
            </FormItem>
        </>
    );
};

export default SmCodeLogin;
