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
            itemName: 'startTime',
            initVal: '请选择开始时间',
            labelTxt: '开始时间',
            renderType: 'date',
        },
    ],
    [
        {
            itemName: 'newSalary',
            initVal: '请输入调整后薪资',
            labelTxt: '调整后薪资',
            renderType: 'input',
        },

        {
            renderType: 'select',
            itemName: 'salaryType',
            initVal: '请选择类型',
            labelTxt: '类型',
            optionName: 'salaryType',
        },
    ],
    [
        {
            itemName: 'reason',
            initVal: '请输入调薪原因',
            labelTxt: '调薪原因',
            renderType: 'input',
        },
        { itemName: 'staffName', renderType: 'input', style: { display: 'none' } },
    ],
];
