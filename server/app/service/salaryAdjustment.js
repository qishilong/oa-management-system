'use strict';

const Service = require('egg').Service;

class SalaryAdjustmentService extends Service {
  //- 查找调薪列表
  async findSalaryAdjustment (queryData, page = 1, size = 5) {
    
    const { ctx, ctx: { model } } = this
    //- 普通用户只能获取自己的调薪记录
    !ctx.session.user.identity && (queryData.staffName = ctx.session.user._id);
    
    const list = await model.SalaryAdjustment.find(queryData)
      .populate({
        path: 'staffName',
        select: 'userName department',
        populate: {
          path: 'department',
          select: 'departmentName'
        }
      })
      .skip((page - 1) * +size)
      .limit(+size)
      .sort({ '_id': -1 });
    const total = await model.SalaryAdjustment.countDocuments(queryData)
    return { msg: "查询成功", data: {list,total} }
  }
  //- 创建调薪记录
  async createSalaryAdjustment (body) {
    const { ctx, ctx: { model } } = this
    await ctx.service.staff.updateSomeStaff([body.userName], 'salary', body.newSalary)
    await model.SalaryAdjustment.create(body);
  }
  // - 获取调薪详情
  async getSalaryAdjustment (queryData) {
    const { ctx: { model } } = this;
    try {
      const data = await model.SalaryAdjustment
        .findOne(queryData)
        .populate({
          path: 'staffName',
          select: 'userName department',
          populate: {
            path: 'department',
            select: 'departmentName'
          }
        })
      return data && ({ data })
    } catch (error) {
      return 'ID类型错误'
    }
  }
  // - 修改调薪记录
  async updateSalaryAdjustment ({ _id, type, updateVal, staffName }) {
    const { ctx, ctx: { model } } = this;
    // - 调整用户当前薪资为最新纪值
    type === 'newSalary' && await ctx.service.staff.updateSomeStaff([staffName], 'salary', updateVal)
    await model.SalaryAdjustment.findOneAndUpdate({ _id }, {
      $set: { [type]: updateVal },
    })
    return "修改成功"
  }
  // - 删除调薪记录
  async deleteSalaryAdjustment (ids) {
    const { ctx, ctx: { model } } = this;
    try {
      const staffList = await model.Staff.find({ level: { $in: ids } })
      const userIds = staffList.map(item => item._id) // - 获取用户id
      //- 删除员工当前对应薪资
      userIds && await ctx.service.staff.updateSomeStaff(ids, 'salary')
      const { deletedCount } = await model.SalaryAdjustment.deleteMany({ _id: { $in: ids } })
      if (!deletedCount) return '删除失败'
      return '删除成功'
    } catch (e) {
      console.log(e)
      return 'ID传入错误'
    }

  }
}
module.exports = SalaryAdjustmentService;