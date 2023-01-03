export const rewardAndPunishmentRules = {
    staffName: [
        { required: true, message: '员工姓名不能为空' },
        { max: 4, message: '员工姓名长度不正确' },
        { min: 2, message: '员工姓名长度不正确' },
    ],
    date: [{ required: true, message: '创建时间不能为空' }],
    type: [
        {
            required: true,
            message: '奖惩类型不能为空',
        },
    ],
    reason: [
        { required: true, message: '奖惩原因不能为空' },
        { min: 2, message: '奖惩原因长度不正确' },
        { max: 20, message: '奖惩原因长度不正确' },
    ],
    recordDesc: [
        { required: true, message: '奖惩描述不能为空' },
        { min: 2, message: '奖惩描述长度不正确' },
        { max: 20, message: '奖惩描述长度不正确' },
    ],
};
