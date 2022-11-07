'use strict'

module.exports = app => {
  const { validator } = app
  // 自定义校验规则
  validator.addRule('accountName', (rule, value) => {
    if (value.length < 4 || value.length > 20) {
      return '账户名的长度应该在8-20之间'
    }
  })
  validator.addRule('password', (rule, value) => {
    if (value.length < 4 || value.length > 20) {
      return '密码长度不正确'
    }
  })
  validator.addRule('mobile', (rule, value) => {
    const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
    if (!reg.test(value)) {
      return '手机号格式不正确'
    }
  })
  validator.addRule('code', (rule, value) => {
    if (value.length !== 6) {
      return '验证码长度不正确'
    }
  })
  // - 重置密码标识验证
  validator.addRule('type', (rule, value) => {
    if (value !== 'reset') {
      return 'reset值不正确'
    }
  })
}
