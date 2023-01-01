import { mapData } from "../utils/mapData";

export default [
    [
        {
            renderType: 'input',
            itemName: 'userName',
            placeholderVal: '请输入员工姓名',
            labelTxt: '姓名',
        },
        {
            renderType: 'input',
            itemName: 'accountName',
            placeholderVal: '请输入员工账户名',
            labelTxt: '账户名',
        },
    ],
    [
        {
            renderType: 'input',
            itemName: 'password',
            placeholderVal: '请填写密码',
            labelTxt: '初始密码',
        },
        {
            renderType: 'input',
            itemName: 'mobile',
            placeholderVal: '请输入联系电话',
            labelTxt: '联系电话',
        },
    ],
    [
        {
            renderType: 'input',
            itemName: 'salary',
            placeholderVal: '请输入薪资',
            labelTxt: '薪资',
        },
        {
            renderType: 'input',
            itemName: 'hometown',
            placeholderVal: '请填写籍贯',
            labelTxt: '籍贯',
        },
    ],
    [
        {
            renderType: 'date',
            itemName: 'onboardingTime',
            placeholderVal: '入职时间',
            labelTxt: '入职时间',
        },
        {
            renderType: 'select',
            itemName: 'gender',
            placeholderVal: '请选择性别',
            labelTxt: '性别',
            optionData: mapData.gender,
        },
    ],
    [
        {
            renderType: 'input',
            itemName: 'idNumber',
            placeholderVal: '请填写身份证号',
            labelTxt: '身份证号',
        },
        {
            renderType: 'input',
            itemName: 'bankNumber',
            placeholderVal: '请输入银行卡号',
            labelTxt: '银行卡号',
        },
    ],
    [
        {
            renderType: 'popover',
            itemName: 'departmentName',
            placeholderVal: '请选择部门',
            labelTxt: '部门',
            interfaceName: 'getDepartmentList',
        },
        {
            renderType: 'popover',
            itemName: 'levelName',
            placeholderVal: '请选择职级',
            labelTxt: '职级',
            optionName: 'levelName',
            interfaceName: 'getLevelList',
        },
    ],
    [
        { itemName: 'department', renderType: 'input', style: { display: 'none' } },
        { itemName: 'level', renderType: 'input', style: { display: 'none' } },
    ],
    [
        {
            renderType: 'select',
            itemName: 'education',
            placeholderVal: '请选择员工学历',
            labelTxt: '员工学历',
            optionData: mapData.education,
        },
        {
            renderType: 'select',
            itemName: 'marriage',
            placeholderVal: '请选择婚姻状况',
            labelTxt: '婚姻状况',
            optionData: mapData.marriage,
        },
    ],
    [
        {
            itemName: 'graduatedSchool',
            placeholderVal: '请输入毕业院校',
            labelTxt: '毕业院校',
            renderType: 'input',
            type: 'input',
        },
        {
            labelTxt: '员工照片',
            type: 'upload',
            renderType: 'upload',
            itemName: 'avatar',
        },
    ],
];