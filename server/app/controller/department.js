'use strict';
const Controller = require('egg').Controller;

class departmentController extends Controller {
  // --get 获取部门列表
  async index () {
    const { ctx } = this;
    const { page, size, departmentName } = ctx.query;
    ctx.body = await ctx.service.department
      .findDepartment(departmentName && { departmentName }, { departmentName: 1, children: 1, parentLists: 1 }, page, size)
  }
  // - 获取部门详情
  async show () {
    const { ctx } = this;
    const { id } = ctx.params
    ctx.body = await ctx.service.department.getDepartmentDetail(id)
  }
  // - post 新增部门
  async create () {
    const { ctx } = this;
    ctx.validate(ctx.departmentRule)
    const requestBody = ctx.request.body;
    ctx.service.department.createDepartment(requestBody)
    ctx.body = { msg: '添加部门成功' }
  }
  //- 修改部门信息
  async update () {
    const { ctx } = this;
    const updateInfo = ctx.request.body;
    const { id: _id } = ctx.params
    ctx.validate(ctx.updateRule)
    ctx.body = await ctx.service.department.updateDepartment({ _id, updateInfo })
  }
  //- 删除部门
  async destroy () {
    const { ctx } = this;
    const { id } = ctx.params
    ctx.body = await ctx.service.department.destroyDepartment(id)
  }
}

module.exports = departmentController;
