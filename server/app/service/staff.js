'use strict';

const Service = require('egg').Service;

class StaffService extends Service {
  // - 新增员工
  async createStaff (body) {
    const { ctx: { model } } = this;
    const { department: departmentName, _id } = await model.Staff.create(body);
    // - 新增成功之后关联部门表格,追加新增员工字段
    await model.Department.findOneAndUpdate({ _id: departmentName }, { $push: { staffList: _id } })
    return { msg: '添加员工成功' }
  }

  //- 获取员工列表
  async findStaff (queryData = {}, returnData = {}, page = 1, size = 5) {
    const { ctx: { model } } = this;
    const keysList = Object.keys(queryData)
    keysList.length && keysList.forEach(key => {

      queryData[key] = { $in: queryData[key] }
    })

    try {
      const staffList = await model.Staff
        .find(queryData, returnData)
        .populate({
          path: 'department',
          select: 'departmentName departmentLeader',
          populate: [{
            path: 'departmentLeader',
            select: 'userName',
          }],
        })
        .populate({
          path: 'level',
          select: 'levelName levelDescription',
        })
        .skip((page - 1) * +size).limit(+size).sort({ '_id': -1 })
      const staffTotal = await model.Staff.countDocuments(queryData)
      return { data: { staffList, staffTotal } }
    } catch (error) {
      return { code: 500, msg: '参数传递错误' }
    }


  }

  //- 修改员工信息
  async updateStaff (updateBody) {
    const { ctx, ctx: { model } } = this;
    const { _id, type, updateVal } = updateBody;
    await model.Staff.findOneAndUpdate({ _id }, { $set: { [type]: updateVal } })

    // - 当前是不是在修改部门
    if (type === 'department') {
      // - 获取当前的修改完成的部门的ID值，找到这个部门，新增一个员工的id
      await model.Department.updateOne({ staffList: _id }, { $pull: { staffList: _id } })
      await model.Department.updateOne({ _id: updateVal }, { $push: { staffList: _id } })
    }
    return "修改成功";
  }

  //- 批量修改员工信息(当删除部门时使用)
  async updateSomeStaff (ids, type, newVal = '000000000000000000000000') {
    const { ctx: { model } } = this;
    return await model.Staff.updateMany({ _id: { $in: ids } }, {
      $set: { [type]: newVal }
    })
  }

  // - 获取员工详情
  async getStaffDetail (_id) {
    const { ctx, ctx: { model } } = this;

    if (!ctx.session.user.identity && ctx.session.user._id !== _id) {
      return '对不起，您无法查看其他员工详细信息'
    }

    const { _doc: data } = await model.Staff.findOne({ _id }, { password: 0 })
      .populate({
        path: 'department',
        select: ['departmentName']
      })
      .populate({
        path: 'level',
        select: 'levelName levelDescription',
      })

    return { data }
  }

  //- 删除员工
  async destroyStaff (ids) {
    const { ctx: { model } } = this;
    const { deletedCount } = await model.Staff.deleteMany({ _id: { $in: ids } })
    if (!deletedCount) return '删除失败,ID值错误'
    //- 删除用户成功，部门链表处理员工数组
    ids.map(async _id => await model.Department.findOneAndUpdate({ staffList: _id }, { $pull: { staffList: _id } }))
    //- 删除用户成功之后，该员工绩效考核，该员工考勤表删除、删除调薪记录、删除奖惩记录
    ids.map(_id => {
      model.Assessment.find({}, (err, docs) => {
        docs.forEach(item => item.staffName.toString() === _id.toString() && (item.remove()))
      })
      model.Attendance.find({}, (err, docs) => {
        docs.forEach(item => item.staffName.toString() === _id.toString() && (item.remove()))
      })
      model.SalaryAdjustment.find({}, (err, docs) => {
        docs.forEach(item => item.staffName.toString() === _id.toString() && (item.remove()))
      })
      model.RewardAndPunishment.find({}, (err, docs) => {
        docs.forEach(item => item.staffName.toString() === _id.toString() && (item.remove()))
      })
    })
    return '删除成功'
  }

  //- 检测用户 
  async checkIsExists (checkData) {
    const { ctx, ctx: { model } } = this;
    const res = await model.Staff.findOne(checkData)
    return {
      msg: res ? `当前${checkData.hasOwnProperty('accountName') ? '账户名' : '手机号码'}已经存在，请更换` : '',
      data: res ? true : false
    };
  }
}
module.exports = StaffService;