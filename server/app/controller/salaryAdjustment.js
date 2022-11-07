'use strict';
const Controller = require('egg').Controller;

class salaryAdjustmentController extends Controller {
  // - get 获取调薪记录
  async getSalaryAdjustmentList () {
    const { ctx } = this;
    const { staffName, page, size } = ctx.request.query;
    ctx.body = await ctx.service.salaryAdjustment.findSalaryAdjustment(staffName ?  {staffName} : {}, page, size)
  }
  // - 查看调薪记录详情
  async getSalaryAdjustmentDetail () {
    const { ctx } = this;
    const { id } = ctx.params
    ctx.body = await ctx.service.salaryAdjustment.getSalaryAdjustment(!ctx.session.user.identity ? { userName: ctx.session.user.userName } : { _id: id })
  }
  // - post 新增调薪记录
  async create () {
    const { ctx } = this;
    ctx.validate(ctx.salaryAdjustmentRule)
    const requestBody = ctx.request.body;
    ctx.service.salaryAdjustment.createSalaryAdjustment(requestBody)
    ctx.body = { msg: '添加调薪记录成功' }
  }
  //- 修改调薪记录
  async update () {
    const { ctx } = this;
    const updateInfo = ctx.request.body;
    const { id: _id } = ctx.params
    ctx.validate(ctx.updateRule)
    ctx.body = await ctx.service.salaryAdjustment.updateSalaryAdjustment({ _id, ...updateInfo })
  }
  //- 删除调薪记录
  async destroy () {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    ctx.body = await ctx.service.salaryAdjustment.deleteSalaryAdjustment(ids)
  }
}

module.exports = salaryAdjustmentController;
