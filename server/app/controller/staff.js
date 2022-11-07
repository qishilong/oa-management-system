'use strict';

const Controller = require('egg').Controller;

class StaffController extends Controller {
  // --post 获取员工列表
  async getStaff () {
    const { ctx } = this
    const { page, size, queryData } = ctx.request.body;
    ctx.body = await ctx.service.staff.findStaff(queryData, !ctx.session.user.identity ? { userName: 1, department: 1, gender: 1, mobile: 1, } : { password: 0 }, page, size)
  }


  //- get请求检测员工账户名手机号码是否存在
  async checkIsExists () {
    const { ctx } = this
    const { checkData } = ctx.request.body;
    ctx.body = await ctx.service.staff.checkIsExists(checkData)
  }


  // - 获取员工部分信息,考核 绩效时进行调用
  async getStaffInfoList () {
    const { ctx } = this;
    const { page, size } = ctx.request.query;
    ctx.body = await ctx.service.staff.findStaff({}, {
      job: 1,
      department: 1,
      userName: 1,
      level: 1
    }, page, size)
  }

  // - 获取员工详细信息
  async staffDetail () {
    const { ctx } = this
    const { id } = ctx.params
    ctx.body = await ctx.service.staff.getStaffDetail(id)
  }

  // - post 新增员工
  async createStaff () {
    const { ctx } = this;
    ctx.validate(ctx.staffRule)
    const requestBody = ctx.request.body;
    requestBody.password = await ctx.helper.generatePassword(requestBody.password)
    ctx.body = await ctx.service.staff.createStaff(requestBody)
  }

  //- put 修改员工
  async updateStaff () {
    const { ctx } = this;
    const updateBody = ctx.request.body;
    ctx.validate(ctx.updateRule)

    ctx.body = await ctx.service.staff.updateStaff(updateBody)
  }

  //- post 删除员工请求
  async destroyStaff () {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    ctx.body = await ctx.service.staff.destroyStaff(ids)
  }
}

module.exports = StaffController;
