'use strict';

const Service = require('egg').Service;

class AttendanceService extends Service {
  // - 新增考勤记录
  async createAttendance (body) {
    const { ctx, ctx: { model } } = this;
    // 非管理员添加考勤记录，直接使用系统缓存用户名添加
    !ctx.session.user.identity && (body.staffName = ctx.session.user._id)
    await model.Attendance.create(body);
    return { msg: '添加考勤记录成功' }
  }
  // - 获取考勤记录列表
  async findAttendance (queryData = {}, page = 1, size = 5) {
    const { ctx, ctx: { model } } = this;

    if (!ctx.session.user.identity) {
      queryData.staffName = [ctx.session.user._id]
    }
    const keysList = Object.keys(queryData)
    keysList.length && keysList.forEach(key => {
      switch (key) {
        case 'createTime':
          queryData["$and"] = [{ [key]: { "$gt": queryData[key][1] } }, { [key]: { "$lt": queryData[key][0] } }]
          delete queryData[key];
          break;
        default:
          queryData[key] = { $in: queryData[key] }
          break;
      }
    })

    const attendanceList = await model.Attendance
      .find(queryData)
      .populate({
        path: 'staffName',
        select: ['userName', 'department'],
        populate: {
          path: 'department',
          select: 'departmentName departmentLeader',
        }
      })
      .skip((page - 1) * +size).limit(+size).sort({ '_id': -1 })


    const attendanceTotal = await model.Attendance.countDocuments(queryData)
    return { data: { total: attendanceTotal, attendanceList } }
  }
  //- 获取考勤信息详情
  async getAttendanceDetail (_id) {
    const { ctx, ctx: { model } } = this;
    try {
      const { _doc } = await model.Attendance.findOne({ _id }).populate({
        path: 'staffName',
        select: ['userName', 'department'],
        populate: {
          path: 'department',
          select: 'departmentName departmentLeader',
        }
      })
      return { data: _doc }
    } catch (error) {
      return 'ID类型错误'
    }
  }

  // - 修改考勤信息
  async updateAttendance (updateBody) {
    const { ctx: { model } } = this;
    const { _id, updateVal, type } = updateBody

    await model.Attendance.findOneAndUpdate({ _id }, {
      $set: { [type]: updateVal },
    })
    return "修改成功"
  }
  
  //- 获取考勤表格,出勤统计界面渲染内容使用
  async getAttendanceTable () {
    const { ctx, ctx: { model } } = this;
    const returnData = {
      lateBI: {},
      lateTable: [],
      earlyBI: {},
      earlyTable: []
    }
    const queryData = { attendanceType: { $in: [3, 4] } }
    ctx.session.user.identity === 0 && Object.assign(queryData, { staffName: ctx.session.user._id })

    const result = await model.Attendance
      .find(queryData, { updateRecommendList: 0, departmentLeader: 0 })
      .populate({
        path: 'staffName',
        select: ['userName', 'department'],
        populate: {
          path: 'department',
          select: 'departmentName',
        }
      })

    const fill0 = (item) => item < 10 ? '0' + item : item;

    result.forEach(item => {
      const dateString = item.createTime.getFullYear().toString() + fill0((item.createTime.getMonth() + 1).toString()) + fill0((item.createTime.getDate().toString()));
      if (item.attendanceType === 3) {
        returnData.lateTable.push(item)
        if (!returnData.lateBI[dateString]) {
          returnData.lateBI[dateString] = { num: 0, date: item.createTime }
        }
        returnData.lateBI[dateString].num += 1;
      } else if (item.attendanceType === 4) {
        returnData.earlyTable.push(item)
        if (!returnData.earlyBI[dateString]) {
          returnData.earlyBI[dateString] = { num: 0, date: item.createTime }
        }
        returnData.earlyBI[dateString].num += 1;
      }
    })
    const ExData = [];
    const LxData = [];
    const EyData = [];
    const LyData = [];
    Object.keys(returnData.lateBI).sort((a, b) => a - b).forEach(item => {
      LxData.push(returnData.lateBI[item].date);
      LyData.push(returnData.lateBI[item].num);
    })
    Object.keys(returnData.earlyBI).sort((a, b) => a - b).forEach(item => {
      ExData.push(returnData.earlyBI[item].date);
      EyData.push(returnData.earlyBI[item].num);
    })

    returnData.earlyBI = { xData: ExData, yData: EyData }
    returnData.lateBI = { xData: LxData, yData: LyData }

    return { data: ctx.session.user.identity !== 1 ? { lateTable: returnData.lateTable, earlyTable: returnData.earlyTable } : returnData };
  }

  //- 删除考勤信息
  async deleteAttendance (ids) {
    const { ctx, ctx: { model } } = this;
    try {
      const { deletedCount } = await model.Attendance.deleteMany({ _id: { $in: ids } })
      return !deletedCount ? '删除失败' : '删除成功'
    } catch (e) {
      return 'ID传入错误'
    }
  }
}

module.exports = AttendanceService;