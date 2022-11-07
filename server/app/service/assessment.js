'use strict';

const Service = require('egg').Service;

class demo extends Service {
  //- 查找绩效考核集合
  async findAssessmentList (queryData = {}, page, size) {
    const { ctx, ctx: { model } } = this;
    !ctx.session.user.identity && (queryData.staffName = [ctx.session.user._id]);
    const keysList = Object.keys(queryData);

    keysList.length && keysList.forEach(key => {
    queryData['findByYear'] && new Date(queryData['findByYear']).getTime()

      switch (key) {
        case 'staffName':
          if (typeof queryData[key] === 'string') {
            queryData[key] = { $in: queryData[key].split(' ').map(val => val) }
          } else {
            queryData[key] = { $in: queryData[key].map(val => val) }
          }
          break;
        case 'findByYear':
          queryData['date'] = {
            "$gte": +queryData['findByYear'],
            "$lte": +queryData['findByYear'] + 31536000000
          };
          delete queryData.findByYear
          break;
      }
    })
    return {
      data: {
        list: await model.Assessment.find(queryData).populate({
          path: 'staffName',
          select: ['userName', 'onboardingTime', 'department'],
          populate: [{
            path: 'department',
            select: 'departmentName',
          }],
        }).populate([{
          path: 'initLevel',
          select: 'levelName'
        }, {
          path: 'currentLevel',
          select: 'levelName'
        }]).skip((page - 1) * +size).limit(+size).sort({ '_id': -1 })
      },
      total: await model.Assessment.countDocuments(queryData)
    }
  }

  // - 获取绩效考核详情
  async assessmentDetail (_id) {
    const { ctx, ctx: { model } } = this;
    const queryData = { _id }
    !ctx.session.user.identity && (queryData.staffName = [ctx.session.user._id]);
    try {
      const res = await model.Assessment.findOne(queryData).populate({
        path: 'staffName',
        select: ['userName', 'onboardingTime', 'department'],
        populate: [{
          path: 'department',
          select: 'departmentName ',
        }],
      }).populate([{
        path: 'initLevel',
        select: 'levelName'
      }, {
        path: 'currentLevel',
        select: 'levelName'
      }])
      return res ? { data: res._doc } : '查询失败'
    } catch (error) {
      return 'ID类型错误'
    }
  }

  //- 创建绩效考核记录
  async createAssessment (body) {
    const { ctx, ctx: { model } } = this
    const quarterlyList = [3, 6, 9, 12];
    const month = new Date(+body.date).getMonth() + 1
    body.quarterly = quarterlyList.findIndex(item => month <= item) + 1
    const { level: initLevel } = await model.Staff.findOne({ _id: body.staffName });
    body.initLevel = initLevel
    //- 先得获取当前考核用户的id，找到这个用户，修改他的level级别为当前对应的level级别
    await ctx.service.staff.updateSomeStaff([body.staffName], 'level', body.currentLevel)
    await model.Assessment.create(body);
  }

  // - 修改考核记录
  async updateAssessment ({ _id, type, updateVal, staffName }) {
    const { ctx, ctx: { model } } = this;
    let updateObj = {}

    if (type === 'onboardingTime' || type === 'initLevel') {
      return '该字段无法进行修改';
    } else if (type === 'currentLevel') { // - 调整用户当前level为最新纪录，从新赋值initLevel
      updateObj.initLevel = (await model.Assessment.findOne({ _id })).currentLevel;
      await ctx.service.staff.updateSomeStaff([staffName], 'level', updateVal)
    }
    await model.Assessment.findOneAndUpdate({ _id }, {
      $set: { [type]: updateVal, ...updateObj }
    });
    updateObj = {};
    return "修改成功"
  }

  // - 删除考核记录
  async destroyAssessment (ids) {
    const { ctx, ctx: { model } } = this;
    try {
      const { deletedCount } = await model.Assessment.deleteMany({ _id: { $in: ids } })
      // const { deletedCount } = await model.Assessment.deleteOne({ _id })
      if (!deletedCount) return '删除失败'
      return '删除成功'
    } catch (e) {
      console.log(e)
      return 'ID传入错误'
    }
  }
}
module.exports = demo;