'use strict'
const bcrypt = require('bcryptjs');
const tencentcloud = require("tencentcloud-sdk-nodejs")

module.exports = {
  // - 生成加密密码
  generatePassword (password) {
    return new Promise(resolve => {
      bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(password, salt).then(resolve);
      })
    })
  },
  // - 发送验证码
  sendCode (mobile) {
    return new Promise(resolve => {
      // - 腾讯讯短信对象
      const smsClient = tencentcloud.sms.v20210111.Client
      const client = new smsClient({
        // - 腾讯云账户id，密钥
        credential: {
          secretId: 'AKID0pRq1z7CcpvxhEezEVDfQwNaXEj1PGST',
          secretKey: 'Rb9bpoSw9vWjBWO9l7vgqvud6LLVPmvp',
        },
        region: "ap-beijing",
        profile: {
          /* SDK默认用TC3-HMAC-SHA256进行签名，非必要请不要修改这个字段 */
          signMethod: "HmacSHA256",
          httpProfile: {
            reqMethod: "POST",
            reqTimeout: 30,
            endpoint: "sms.tencentcloudapi.com"
          },
        },
      })
      const code = Math.random().toString().substr(2, 6)
      const params = {
        // - 短信应用ID
        SmsSdkAppId: "1400256241",
        /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，签名信息可登录 [短信控制台] 查看 */
        SignName: "学习演示个人网",
        /* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
        ExtendCode: "",
        /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
        SenderId: "",
        /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
        SessionContext: "",
        PhoneNumberSet: [mobile],
        /* 模板 ID: 必须填写已审核通过的模板 ID。模板ID可登录 [短信控制台] 查看 */
        TemplateId: "883964",
        // - 模板参数，生成的验证码
        TemplateParamSet: [code],
      }
      client.SendSms(params, function (err, response) {
        if (err) {
          console.log(err)
          return
        }
        resolve(code)
      })
    })
  },
  // -年龄获取
  getAge (idCard) {
    let birthday = "";
    let currentTime = Date.now();
    let month = "";
    let day = "";
    if (idCard.length == 15) {
      birthday = "19" + idCard.slice(6, 12);
    } else if (idCard.length == 18) {
      birthday = idCard.slice(6, 14);
    }
    month = birthday.substr(4, 2);
    day = birthday.substr(6);
    birthday = Math.floor((currentTime - new Date(birthday.replace(/(.{4})(.{2})/, "$1-$2-")).getTime()) / 1000 / 3600 / 24 / 365)

    return { birthday, month, day };
  },
  // - 学历映射
  eduTypes () {
    return {
      0: { name: "无学历", value: 0 },
      1: { name: "中专", value: 0 },
      2: { name: "大专", value: 0 },
      3: { name: "本科", value: 0 },
      4: { name: "研究生", value: 0 },
      5: { name: "博士", value: 0 }
    }
  },
  // - 性别映射
  genderType () {
    return {
      0: { name: '男', value: 0, age: 0 },
      1: { name: '女', value: 0, age: 0 },
    }
  },
  // - 婚姻映射
  marriageType () {
    return {
      0: { name: '未婚', value: 0 },
      1: { name: '已婚', value: 0 },
    }
  },
  // -岗位映射
  // jobType () {
  //   return {
  //     0: { name: "空", value: 0 },
  //     1: { name: "运营专员", value: 0 },
  //     2: { name: "测试工程师", value: 0 },
  //     3: { name: "后端工程师", value: 0 },
  //     4: { name: "UI设计师", value: 0 },
  //     5: { name: "开发组长", value: 0 },
  //     6: { name: "客户经理", value: 0 },
  //     7: { name: "开发工程师", value: 0 },
  //     8: { name: "品牌组长", value: 0 },
  //     9: { name: "APP开发工程师", value: 0 },
  //     10: { name: "业务总监", value: 0 },
  //   }
  // },
  // - 年龄格式
  formatAgeMap (obj, age) {
    !obj[age] ? (obj[age] = 1) : ++obj[age]
  },
  //- 工龄
  onboardingTimeMap (item, enterTimeData) {
    // - 入职时间人数
    //- 处理入职年份
    const days = (new Date() - new Date(item.onboardingTime)) / 1000 / 3600 / 24;
    switch (true) {
      case days <= 365:
        ++enterTimeData.one
        break;
      case days > 365 && days <= 730:
        ++enterTimeData.two
        break;
      default:
        ++enterTimeData.three
        break;
    }
  },
  // - 入职时间排序
  sortStaffList (list) {
    let tempArr = JSON.parse(JSON.stringify(list));

    tempArr = tempArr.sort((x, y) => (new Date(x.onboardingTime).getTime() - new Date(y.onboardingTime).getTime())).map(item => ({ userName: item.userName, department: item.department && item.department.departmentName }))
    return tempArr.slice(0, 10)
  },
  //- 收集星座
  getConstellation (month, day, obj) {
    const s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    let text = s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
    !obj[text] ? (obj[text] = 1) : ++obj[text]
  }
  // - 排序处理
  // sortData(arr,) {

  // }
}
