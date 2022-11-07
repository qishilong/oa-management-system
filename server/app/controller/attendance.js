'use strict';

const Controller = require('egg').Controller;

class AttendanceController extends Controller {
  // --post 获取考勤列表
  async getAttendance () {
    const { ctx } = this
    const { page, size, queryData } = ctx.request.body;
    ctx.body = await ctx.service.attendance.findAttendance(queryData, page, size)
  }
  // - post 新增考勤
  async createAttendance () {
    const { ctx } = this;
    ctx.validate(ctx.attendanceRule)
    const requestBody = ctx.request.body;
    ctx.body = await ctx.service.attendance.createAttendance(requestBody)
  }
  //- 获取考勤信息详情
  async getAttendanceDetail () {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await ctx.service.attendance.getAttendanceDetail(id)
  }
  //- put 修改考勤信息
  async updateAttendance () {
    const { ctx } = this;
    const updateBody = ctx.request.body;
    ctx.validate(ctx.updateRule)
    ctx.body = await ctx.service.attendance.updateAttendance(updateBody)
  }
  //- 获取考勤表格
  async getAttendanceTable () {
    const { ctx } = this;
    ctx.body = await ctx.service.attendance.getAttendanceTable()
  }
  //- delete 删除考勤信息
  async deleteAttendance () {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    ctx.body = await ctx.service.attendance.deleteAttendance(ids)
  }
}

module.exports = AttendanceController;
