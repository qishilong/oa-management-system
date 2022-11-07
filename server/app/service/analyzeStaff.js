'use strict';

const Service = require('egg').Service;

class AnalyzeStaffService extends Service {
  async findStaff () {
    const { ctx } = this
    // - 获取全部员工信息
    const staffList = await ctx.model.Staff.find({}).populate({
      path: 'department',
      select: ['departmentName']
    });
    // - 获取员工总数
    const total = await ctx.model.Staff.countDocuments({});
    const { data: { list: departmentList } } = await ctx.service.department.findDepartment({}, { staffList: 1, departmentName: 1 })

    const formatData = {
      total, // - 总人数
      educationList: ctx.helper.eduTypes(),  //- 学历
      onboardingTimeData: { one: 0, two: 0, three: 0 },
      genderList: ctx.helper.genderType(),   //- 男女比例
      marriageList: ctx.helper.marriageType(),  //- 婚姻状况 
      ageMap: {},  //- 平均年龄
      wordingYearsMaps: ctx.helper.sortStaffList(staffList), //- 工龄十人
      constellationList: {},   //- 星座
      departmentList: { //- 部门列表
        yData: departmentList.map(item => item.staffList.length),
        xData: departmentList.map(item => item.departmentName),
      }
    }
    staffList.forEach(item => {
      // - 获取年龄
      const { birthday: age, month, day } = ctx.helper.getAge(item.idNumber)
      ctx.helper.formatAgeMap(formatData.ageMap, age)
      ctx.helper.onboardingTimeMap(item, formatData.onboardingTimeData)
      ctx.helper.getConstellation(month, day, formatData.constellationList)
      formatData.educationList[item.education].value++
      formatData.genderList[item.gender].value++
      formatData.genderList[item.gender].age += age
      // formatData.jobList[item.job].value++
      formatData.marriageList[item.marriage].value++
    })
    //- 调整年龄分布数据格式
    formatData.ageMap = {
      xData: Object.keys(formatData.ageMap),
      yData: Object.values(formatData.ageMap)
    }
    //- 调整显示方式
    formatData.educationList = Object.values(formatData.educationList);
    formatData.genderList = Object.values(formatData.genderList);
    formatData.marriageList = Object.values(formatData.marriageList);
    formatData.constellationList = Object.keys(formatData.constellationList).map(key => ({ value: formatData.constellationList[key], name: key }))
    // - 获取年龄平均数
    formatData.genderList.forEach(obj => {
      obj.age = (obj.age / obj.value).toFixed(2)
    })
    return formatData
  }
}
module.exports = AnalyzeStaffService;