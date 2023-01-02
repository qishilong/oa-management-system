export const assessmentRules = {
    staffNameVal: [
        { required: true, message: '员工姓名不能为空' },
        { max: 4, message: '员工姓名长度不正确' },
        { min: 2, message: '员工姓名长度不正确' },
    ],
    date: [{ required: true, message: '考核日期不能为空' }],
    assessmentRequire: [
        { required: true, message: '考核要求不能为空' },
        { max: 16, message: '考核要求长度不正确' },
        { min: 2, message: '考核要求长度不正确' },
    ],
    result: [{ required: true, message: '考核等级不能为空' }],
    currentLevelVal: [{ required: true, message: '调整职级不能为空' }],
    standardScore: [{ required: true, message: '对应分数不能为空' }],
    assessmentScore: [{ required: true, message: '考核得分不能为空' }],
};
