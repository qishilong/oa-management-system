export const salaryRules = {
    staffNameVal: [
        { required: true, message: '员工姓名不能为空' },
        { max: 4, message: '员工姓名长度不正确' },
        { min: 2, message: '员工姓名长度不正确' },
    ],
    startTime: [{ required: true, message: '开始时间不能为空' }],
    salary: [
        { required: true, message: '薪资不能为空' },
        { min: 4, message: '薪资长度不正确' },
    ],
    salaryType: [{ required: true, message: '类型不能为空' }],
    reason: [{ required: true, message: '调薪原因不能为空' }],
};
