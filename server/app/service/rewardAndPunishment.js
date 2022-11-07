'use strict';

const Service = require('egg').Service;

class RewardAndPunishmentService extends Service {
  //- 查找奖惩列表
  async findRecordList (page = 1, size = 5, staffName) {
    const { ctx, ctx: { model } } = this;
    const queryData = staffName ? { staffName } : {};
    //- 非管理员查询条件
    !ctx.session.user.identity && (queryData.staffName = [ctx.session.user._id]);

    const result = await model.RewardAndPunishment
      .find(queryData)
      .populate({
        path: 'staffName',
        select: ['userName'],
      })
      .skip((page - 1) * +size).limit(+size).sort({ '_id': -1 })

    const total = await model.RewardAndPunishment.countDocuments(queryData)

    return { msg: "查询成功", data: { list: result, total } }
  }
  //- 创建奖惩记录
  async createRecord (body) {
    const { ctx: { model } } = this
    await model.RewardAndPunishment.create(body);
  }

  // - 获取奖惩详情
  async showDetail (_id) {
    const { ctx: { model } } = this;
    try {
      const { _doc } = await model.RewardAndPunishment
        .findOne({ _id })
        .populate({
          path: 'staffName',
          select: ['userName'],
        })
      return { data: _doc }
    } catch (error) {
      return 'ID类型错误'
    }
  }

  // - 修改奖惩记录
  async updateRecord ({ _id, type, updateVal }) {
    const { ctx: { model } } = this;
    let result = await model.RewardAndPunishment.findOneAndUpdate({ _id }, {
      $set: { [type]: updateVal },
    })
    return "修改成功"
  }

  // - 删除奖惩记录
  async deleteRecord (ids) {
    const { ctx, ctx: { model } } = this;
    try {
      const { deletedCount } = await model.RewardAndPunishment.deleteMany({ _id: { $in: ids } })
      if (!deletedCount) return '删除失败'
      return '删除成功'
    } catch (e) {
      console.log(e)
      return 'ID传入错误'
    }
  }
}
module.exports = RewardAndPunishmentService;