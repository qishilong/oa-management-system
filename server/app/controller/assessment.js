'use strict';
const Controller = require('egg').Controller;

class assessmentController extends Controller {
  // --get 获取考核记录
  async getAssessmentList () {
    const { ctx } = this;
    const { page, size, queryData = {} } = ctx.request.body;
    ctx.body = await ctx.service.assessment.findAssessmentList(queryData, page, size)
  }

  // - 获取考核记录详情
  async show () {
    const { ctx } = this;
    const { id } = ctx.params
    ctx.body = await ctx.service.assessment.assessmentDetail(id)
  }

  // - post 新增考核记录
  async create () {
    const { ctx } = this;
    ctx.validate(ctx.assessmentRule)
    const requestBody = ctx.request.body;
    await ctx.service.assessment.createAssessment(requestBody)
    ctx.body = { msg: '添加考核记录成功' }
  }

  //- 修改考核记录
  async update () {
    const { ctx } = this;
    const updateInfo = ctx.request.body;
    const { id: _id } = ctx.params;
    ctx.validate(ctx.updateRule);
    ctx.body = await ctx.service.assessment.updateAssessment({ _id, ...updateInfo })
  }

  //- 删除考核记录
  async destroy () {
    const { ctx } = this;
    const {ids} = ctx.request.body
    ctx.body = await ctx.service.assessment.destroyAssessment(ids)
  }
}

module.exports = assessmentController;
