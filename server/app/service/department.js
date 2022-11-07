'use strict';

const Service = require('egg').Service;

class DepartmentService extends Service {
  //- 查找部门集合
  async findDepartment (queryData = {}, returnParams = {}, page = 1, size = 20) {
    const { ctx: { model } } = this
    Object.keys(queryData).length && (queryData = { departmentName: new RegExp(queryData['departmentName'], 'i') })
    const list = await model.Department
      .find(queryData, returnParams)
      .populate({
        path: 'children',
        select: ['departmentName', 'children'],
        populate: {
          path: 'children',
          select: ['departmentName', 'children'],
          populate: {
            path: 'children',
            select: ['departmentName']
          }
        }
      }).skip((page - 1) * +size).limit(+size).sort({ '_id': -1 })


    const total = await model.Department.countDocuments(queryData)
    return { data: { list, total } }
  }

  //- 新增部门集合
  async createDepartment (body) {
    const { ctx, ctx: { model } } = this

    const { _id } = await model.Department.create(body);
    try {
      await model.Department.updateMany({ _id: { $in: body.children } }, {
        $push: { parentLists: _id }
      })
    } catch (err) { console.log(err) }
    await ctx.service.staff.updateStaff({
      _id: body.departmentLeader,
      type: "department",
      updateVal: _id
    })
  }

  // - 获取部门详情
  async getDepartmentDetail (_id) {
    const { ctx, ctx: { model } } = this;
    try {
      let select = 'idNumber avatar gender mobile hometown job onboardingTime graduatedSchool userName education'.split(' ');
      !ctx.session.user.identity && (select = select.slice(select.length - 4))
      const { _doc } = await model.Department
        .findOne({ _id })
        .populate({
          path: 'staffList',
          select,
        })
        .populate({
          path: 'departmentLeader',
          select: ['userName'],
        })
        .populate({
          path: 'children',
          select: 'departmentName',
        })

      return { data: _doc }
    } catch (error) {
      return 'ID类型错误'
    }
  }

  // - 修改部门信息
  async updateDepartment (updateBody) {
    const { ctx: { model } } = this;
    const { _id, updateInfo } = updateBody
    let { type, updateVal, isDelete, ...updateObj } = updateInfo;
    //- 部门的时候进行单独处理
    if (type === 'children') {
      await new Promise((resolve, reject) => {
        model.Department.find({ _id: { $in: updateVal } }, (err, doc) => {
          doc.forEach(item => {
            if (isDelete) {
              const index = item.parentLists.findIndex(id => {
                return id === _id
              });
              item.parentLists.splice(index, 1);
            } else {
              item.parentLists.push(_id)
            }
            item.save();
          })
          resolve();
        })
      })

      await new Promise((resolve, reject) => {
        model.Department.findOne({ _id }, (err, doc) => {
          if (isDelete) {
            updateVal.forEach(id => {
              const index = doc.children.findIndex(item => {
                return item.toString() === id.toString();
              });
              doc.children.splice(index, 1)
            })
          } else {
            doc.children.unshift(...updateVal)
          }
          doc.save();
          resolve();
        })
      })
    } else {
      await model.Department.findOneAndUpdate({ _id }, {
        $set: { [type]: updateVal }
      })
    }
    return "修改成功"
  }

  // - 删除部门
  async destroyDepartment (_id) {
    const { ctx, ctx: { model } } = this;
    try {
      const { staffList, children, parentLists } = await model.Department.findOne({ _id })

      if (parentLists.length) {
        await new Promise((resolve, reject) => {
          model.Department.findOne({ _id: parentLists[0] }, (error, doc) => {
            const index = doc.children.findIndex(childId => childId.toString() === _id.toString());
            doc.children.splice(index, 1)
            doc.save()
            resolve()
          })
        })
      }

      if (children.length) {
        await new Promise((resolve, reject) => {
          model.Department.find({ _id: { $in: children } }, (err, doc) => {
            doc.forEach(item => {
              const index = item.parentLists.findIndex(id => {
                return id === _id
              });
              item.parentLists.splice(index, 1);
              item.save();
            })
            resolve();
          })
        })
      }

      //- 删除部门员工并且删除自己
      await ctx.service.staff.updateSomeStaff(staffList, 'department')
      const { deletedCount } = await model.Department.deleteOne({ _id })

      if (!deletedCount) return '删除失败'
      return '删除成功'
    } catch (e) {
      console.log(e)
      return 'ID传入错误'
    }
  }
}
module.exports = DepartmentService;