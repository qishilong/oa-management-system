'use strict';
const Controller = require('egg').Controller;

class rewardAndPunishmentController extends Controller {
  // --get 获取奖惩记录
  async index () {
    const { ctx } = this;
    const { page, size, staffName } = ctx.request.query;
    ctx.body = await ctx.service.rewardAndPunishment.findRecordList(page, size, staffName)
  }
  // - 查看奖惩记录详情
  async show () {
    const { ctx } = this;
    const { id } = ctx.params
    ctx.body = await ctx.service.rewardAndPunishment.showDetail(id)
  }
  // - post 新增奖惩记录
  async create () {
    const { ctx } = this;
    ctx.validate(ctx.rewardAndPunishmentRule)
    const requestBody = ctx.request.body;
    ctx.service.rewardAndPunishment.createRecord(requestBody)
    ctx.body = { msg: '添加奖惩记录成功' }
  }
  //- 修改奖惩记录
  async update () {
    const { ctx } = this;
    const updateInfo = ctx.request.body;
    const { id: _id } = ctx.params;
    ctx.validate(ctx.updateRule)
    ctx.body = await ctx.service.rewardAndPunishment.updateRecord({ _id, ...updateInfo })
  }

  //- 删除奖惩记录
  async destroy () {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    ctx.body = await ctx.service.rewardAndPunishment.deleteRecord(ids)
  }
}

module.exports = rewardAndPunishmentController;
