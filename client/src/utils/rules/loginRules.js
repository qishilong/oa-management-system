export const loginRules = {
    userRules: [
        { required: true, message: '账户名不能为空' },
        { max: 16, message: '账户名长度不正确' },
        { min: 4, message: '账户名长度不正确' },
    ],
    passwordRules: [
        { required: true, message: '密码不能为空' },
        { max: 16, message: '密码长度不正确' },
        { min: 4, message: '密码长度不正确' },
    ],
    mobileRules: [
        {
            validator: (rules, value) => {
                const mobileReg = /^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/;
                switch (true) {
                    case !Boolean(value):
                        return Promise.reject('手机号码不能为空');
                    case !mobileReg.test(value):
                        return Promise.reject('手机号码格式不正确');
                    default:
                        return Promise.resolve();
                }
            },
        },
    ],
    verificationCode: [
        { required: true, message: '验证码不能为空' },
        { max: 6, message: '验证码长度不正确' },
        { min: 6, message: '验证码长度不正确' },
    ],
    confirmPasswordRules(form) {
        return [
            {
                validator: (_, value) => {
                    switch (true) {
                        case !Boolean(value):
                            return Promise.reject('确认密码不能为空！');
                        case form.getFieldValue('password') !== value:
                            return Promise.reject('前后密码不一致！');
                        default:
                            return Promise.resolve();
                    }
                },
            },
        ];
    },
};
