export default [
    [
        {
            itemName: 'staffNameVal',
            initVal: '请输入员工姓名',
            labelTxt: '员工',
            renderType: 'popover',
            url: 'getStaffList',
            type: 'userName',
        },
        {
            itemName: 'date',
            initVal: '请选择考核日期',
            labelTxt: '考核日期',
            renderType: 'date',
        },
    ],
    [
        {
            itemName: 'result',
            initVal: '请输入考核等级',
            labelTxt: '考核等级结果',
            renderType: 'input',
            type: 'levelName',
            readOnly: true,
        },
        {
            itemName: 'currentLevelVal',
            initVal: '请输入调整职级',
            labelTxt: '调整职级',
            renderType: 'popover',
            url: 'getLevelList',
            type: 'levelName',
        },
    ],
    [
        {
            itemName: 'standardScore',
            initVal: '请输入对应职级分数',
            labelTxt: '对应职级分数',
            renderType: 'inputNumber',
            readOnly: true,
        },
        {
            itemName: 'assessmentScore',
            initVal: '请输入考核得分',
            labelTxt: '考核得分',
            renderType: 'inputNumber',
        },
    ],
];

export const readData = [
    [
        { itemName: 'departmentName', labelTxt: '所在部门', renderType: 'tag' },
        { itemName: 'onboardingTime', labelTxt: '入职时间', renderType: 'tag' },
    ],
];
