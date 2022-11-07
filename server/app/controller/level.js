'use strict';
const Controller = require('egg').Controller;

class departmentController extends Controller {
  // --get 获取职级列表
  async getLevel () {
    const { ctx } = this;
    const { queryData, size, page } = ctx.request.body;
    ctx.body = await ctx.service.level.findLevelList(queryData, size, page)
  }
  // - 获取职级详情,
  async getLevelDetail () {
    const { ctx } = this;
    const { id } = ctx.params
    ctx.body = await ctx.service.level.getLevelDetail(id)
  }
  // - post 新增职级
  async createLevel () {
    const { ctx } = this;
    ctx.validate(ctx.levelRule)
    const requestBody = ctx.request.body;
    ctx.body = await ctx.service.level.createLevel(requestBody)
  }
  //- 修改职级
  async updateLevel () {
    const { ctx } = this;
    const updateInfo = ctx.request.body;
    const { id: _id } = ctx.params

    ctx.validate(ctx.updateRule)

    ctx.body = await ctx.service.level.updateLevel({ _id, ...updateInfo })
  }
  //-post 删除职级
  async destroyLevel () {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    ctx.body = await ctx.service.level.destroyLevel(ids)
  }
}

module.exports = departmentController;
