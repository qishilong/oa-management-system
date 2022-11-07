'use strict';

const Controller = require('egg').Controller;


class analyzeController extends Controller {
  // --get 获取员工列表
  async index () {
    const { ctx } = this;
    const result = await ctx.service.analyzeStaff.findStaff();
    ctx.body = {data:result}
  }
}

module.exports = analyzeController;
