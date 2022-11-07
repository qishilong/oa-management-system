'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const { router, controller } = app;
  const auth = app.middleware.auth();
  const checkedIdentity = app.middleware.checkedIdentity;
  const checkUserExists = app.middleware.checkUserExists();

  router.post('/api/getStaff', auth, controller.staff.getStaff)   //- 员工列表获取
  router.post('/api/checkIsExists', auth, checkedIdentity('检测用户'), controller.staff.checkIsExists)  //-  检测员工手机名是否存在
  router.post('/api/createStaff', auth, checkedIdentity('新增用户'), controller.staff.createStaff)  // - 员工列表新增
  router.put('/api/updateStaff', auth, checkedIdentity('修改员工'), controller.staff.updateStaff)  //- 修改员工
  router.post('/api/destroyStaff', auth, checkedIdentity('删除员工'), controller.staff.destroyStaff)   // -  员工信息删除
  router.get('/api/staffDetail/:id', auth, controller.staff.staffDetail) // - 员工详情获取
  router.get('/api/getStaffInfoList', auth, checkedIdentity('获取员工信息列表'), controller.staff.getStaffInfoList) // - 员工列表返回部分信息


  // - 部门resetFull路由
  router.resources('department', '/api/department', auth, checkedIdentity({
    'get':'修改部门',
    'post': '使用新增部门',
    'put': '使用修改部门',
    'delete': '使用删除部门',
  }), controller.department);

  // - 考勤表格
  router.get('/api/getAttendanceTable', auth, controller.attendance.getAttendanceTable)
  // - 考勤信息列表
  router.post('/api/getAttendance', auth, controller.attendance.getAttendance)
  //- 获取考勤信息详情
  router.get('/api/getAttendanceDetail/:id', auth, controller.attendance.getAttendanceDetail)
  // - 新增考勤信息
  router.post('/api/createAttendance', auth, controller.attendance.createAttendance)
  // - 修改考信息
  router.put('/api/updateAttendance', auth, checkedIdentity('您无权修改考勤信息'), controller.attendance.updateAttendance)
  // - 删除考勤信息
  router.post('/api/deleteAttendance', auth, checkedIdentity('您无权删除考勤信息'), controller.attendance.deleteAttendance)

  //- 职级路由
  router.post('/api/getLevel', auth, controller.level.getLevel)  // - 获取职级列表
  router.post('/api/createLevel', auth, checkedIdentity('您无法进行新增职级操作'), controller.level.createLevel)  // - 新增职级列表
  router.put('/api/updateLevel/:id', auth, checkedIdentity('您无法进行修改职级操作'), controller.level.updateLevel)  // - 修改职级列表
  router.post('/api/destroyLevel', auth, checkedIdentity('您无法进行删除职级操作'), controller.level.destroyLevel)  // - 删除职级列表
  router.get('/api/getLevelDetail/:id', auth, controller.level.getLevelDetail)  // - 获取职级详情

  // - 员工考核绩效
  router.resources('assessment', '/api/assessment', auth, checkedIdentity({
    'post': '新增绩效考核',
    'put': '修改绩效考核',
    // 'delete': '删除绩效考核',
  }), controller.assessment);

  router.post('/api/getAssessmentList', auth, controller.assessment.getAssessmentList) //- 获取员工考核列表
  router.post('/api/destroyAssessment', auth, controller.assessment.destroy)//- 删除考核记录

  //- 调薪记录
  router.resources("salaryAdjustment", '/api/salaryAdjustment', auth, checkedIdentity({
    'post': '新增调薪记录',
    'put': '修改调薪记录',
  }), controller.salaryAdjustment)
  //- 删除调薪记录
  router.post('/api/destroySalary', auth, controller.salaryAdjustment.destroy)


  // - 获取指定的调薪信息
  router.get('/api/getSalaryAdjustmentDetail/:id', auth, controller.salaryAdjustment.getSalaryAdjustmentDetail)
  // - 获取调薪记录列表
  router.get('/api/salaryAdjustment', auth, controller.salaryAdjustment.getSalaryAdjustmentList)

  // - 奖惩记录
  router.resources("rewardAndPunishment", '/api/rewardAndPunishment', auth,  checkedIdentity({
    'post': '新增奖惩记录',
    'put': '修改奖惩记录',
  }), controller.rewardAndPunishment)
  //- 删除调薪记录
  router.post('/api/deleteRewardAndPunishment', auth, checkedIdentity('您无法进行删除奖惩记录操作'), controller.rewardAndPunishment.destroy)

  // - 用户登录
  router.post('/api/login', controller.userHandler.userLogin)
  //- 检测当前用户是否登录
  router.get('/api/queryLoginStatus', auth, controller.userHandler.queryLoginStatus)
  //- 获取用户路由表
  router.get('/api/getRouteList', auth, controller.userHandler.getRouteList)
  //- 获取验证码
  router.get('/api/getCode', checkUserExists, controller.userHandler.getCode)
  // - 检测用户验证码
  router.get('/api/checkSmCode', controller.userHandler.checkSmCode)
  // - 设置新的登录密码
  router.post('/api/resetPassword', controller.userHandler.resetPassword)
  // - 文件上传token获取
  router.get('/api/getUploadToken', checkedIdentity('获取上传token'), auth, controller.userHandler.getUploadToken)
  //-  文件删除
  router.post('/api/deleteFile', checkedIdentity('文件删除'), auth, controller.userHandler.deleteFile)

  //- 员工分析 
  router.get('/api/analyzeStaff', auth, checkedIdentity({ 'get': '获取员工分析列表' }), controller.analyzeStaff.index)
}
