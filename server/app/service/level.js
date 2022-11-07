'use strict';

const Service = require('egg').Service;

class DepartmentService extends Service {
  //- 查找职级集合
  async findLevelList (queryData = {}, size = 5, page = 1) {
    const { ctx: { model } } = this

    if (queryData.hasOwnProperty('levelName')) {
      queryData.levelName = new RegExp(queryData['levelName'], 'i')
    }

    const list = await model.Level.find(queryData).skip((page - 1) * +size).limit(+size).sort({ '_id': -1 })
    const total = await model.Level.countDocuments(queryData)
    return { data: { list, total } }
  }
  //- 创建职级
  async createLevel (body) {
    const { ctx: { model } } = this
    const list = await model.Level.find({ levelName: body.levelName })
    if (list.length) {
      return { msg: '对不起，职级名称重复', data: true }
    }
    await model.Level.create(body);
    return '添加职级成功'
  }
  // - 获取职级详情
  async getLevelDetail (_id) {
    const { ctx, ctx: { model } } = this;
    try {
      const { _doc } = await model.Level.findOne({ _id })
      return { data: _doc }
    } catch (error) {
      return 'ID类型错误'
    }
  }

  // - 修改职技信息
  async updateLevel ({ _id, type, updateVal }) {
    const { ctx: { model } } = this;
    let result = await model.Level.findOneAndUpdate({ _id }, {
      $set: { [type]: updateVal }
    });
    return "修改成功"
  }
  // - 删除职级
  async destroyLevel (ids) {
    const { ctx, ctx: { model } } = this;
    try {
      const staffList = await model.Staff.find({ level: { $in: ids } })
      const userIds = staffList.map(item => item._id) // - 获取用户id
      //- 删除员工当前对应职级
      userIds && await ctx.service.staff.updateSomeStaff(ids, 'level')
      const { deletedCount } = await model.Level.deleteMany({ _id: { $in: ids } })
      return !deletedCount ? '删除失败' : '删除成功'
    } catch (e) {
      return 'ID传入错误'
    }
  }
}
module.exports = DepartmentService;