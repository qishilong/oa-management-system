'use strict'
const bcrypt = require('bcryptjs');
const tencentcloud = require("tencentcloud-sdk-nodejs")

module.exports = {
  // - 新增员工
  get staffRule () {
    return {
      userName: { type: 'string', required: true }, // 真实姓名
      accountName: { type: 'string', required: true },
      password: { type: 'string', required: true },
      department: { type: 'string', required: true },   // - 部门
      level: { type: 'string', required: true },
      marriage: { type: 'number', required: true },   // - 婚姻
      education: { type: 'number', required: true }, // - 映射
      gender: { type: 'number', required: true },
      onboardingTime: { type: 'string', required: true },   // - 格式为YYYY-MM-DD
      idNumber: { type: 'string', required: true },   // - 身份证号码
      bankNumber: { type: 'string', required: true },
      mobile: { type: 'string', required: true },
      salary: { type: 'string', required: false },    // - 薪水
      avatar: { type: 'string', required: false },
      hometown: { type: 'string', required: false },  // - 家乡
      graduatedSchool: { type: 'string', required: false },   // -毕业学校
    }
  },
  //- 修改验证规则
  get updateRule () {
    return {
      _id: { type: 'string', required: false },
      // type: { type: 'string', required: false },
      // updateVal: { type: 'string', required: true },
    }
  },
  //- 部门验证规则
  get departmentRule () {
    return {
      departmentName: { type: 'string', required: true },
      remark: { type: 'string', required: false },
      departmentLeader: { type: 'string', required: true },
    }
  },
  // - 职级验证规则
  get levelRule () {
    return {
      levelName: { type: 'string', required: true }, // - 职级英文名称
      levelDescription: { type: 'string', required: true }, // - 职级中文名称
      assessmentRequire: { type: 'string', required: false, },  // - 考核要求
      interviewRequire: { type: 'string', required: false }, // - 面试要求
    }
  },
  //- 发送验证码规则检测
  get smCodeRule () {
    return {
      type: { type: 'type', required: false },
      mobile: { type: 'mobile', required: true },
    }
  },
  // - 奖惩记录规则
  get rewardAndPunishmentRule () {
    return {
      "recordDesc": { type: 'string', required: true },
      "type": { type: 'string', required: true },
      "date": { type: 'string', required: true },
      "staffName": { type: 'string', required: true },
      "reason": { type: 'string', required: true },
      "file": { type: 'array', required: false }
    }
  },
  // - 绩效考核
  get assessmentRule () {
    return {
      staffName: { type: 'string', required: true }, // - 员工姓名
      date: { type: 'string', required: true }, // - 考核日期
      result: { type: 'string', required: true },  // - 考核等级
      currentLevel: { type: 'string', required: true }, // - 当前考核等级
      standardScore: { type: 'number', required: true }, // - 考核标准分数
      assessmentScore: { type: 'number', required: true }, // - 考核标准分数
    }
  },
  // - 考勤验证规则
  get attendanceRule () {
    return {
      createTime: { type: 'string', required: true },
      staffName: { type: 'string', required: true },
      attendanceType: { type: 'number', required: true },
    }
  },
  // - 员工登录验证规则
  get loginRule () {
    // - 用户名登录
    if (this.request.body.type === 0) {
      return {
        accountName: { type: 'accountName', required: true },
        password: { type: 'password', required: true }
      }
    } else { // - 手机号码登录
      return {
        mobile: { type: 'mobile', required: true },
        code: { type: 'code', required: true },
      }
    }
  },
  // - 调薪验证规则
  get salaryAdjustmentRule () {
    return {
      reason: { type: 'string', required: true }, // - 调薪原因
      newSalary: { type: 'string', required: true }, // - 调薪后的薪资
      staffName: { type: 'string', required: true, },  // - 员工
      salaryType: { type: 'number', required: true }, // - 类型
      startTime: { type: 'string', required: true }, // - 开始时间
      remark: { type: 'string', required: false }, // - 备注
      file: { type: 'array', required: false } // - 附件
    }
  }
}
