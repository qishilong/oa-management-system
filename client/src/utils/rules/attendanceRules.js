export const attendanceRules = {
    staffName: [{
        required: true,
        message: "姓名不能为空"
    }],
    createTime: [{
        required: true,
        message: "考勤时间不能为空"
    }],
    attendanceType: [{
        required: true,
        message: "考勤类型不能为空"
    }]
}