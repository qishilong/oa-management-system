export const levelRules = {
    levelName: [
        { required: true, message: '职级名称不能为空' },
        { max: 20, message: '职级名称长度不正确' },
        { min: 2, message: '职级名称长度不正确' },
    ],
    levelDescription: [
        { required: true, message: '描述不能为空' },
        { max: 20, message: '描述长度不正确' },
        { min: 2, message: '描述长度不正确' },
    ],
    assessmentRequire: [
        { required: true, message: '考核要求不能为空' },
        { max: 16, message: '考核要求长度不正确' },
        { min: 2, message: '考核要求长度不正确' },
    ],
    interviewRequire: [
        { required: true, message: '面试要求不能为空' },
        { max: 5, message: '面试要求长度不正确' },
        { min: 1, message: '面试要求长度不正确' },
    ],
    baseNumber: [{ required: true, message: '分红权配赠基数不能为空' }],
    levelScore: [{ required: true, message: '职级对应分数不能为空' }],
};
