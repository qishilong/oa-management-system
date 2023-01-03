export default [
    [
        {
            itemName: "staffName",
            initVal: "请输入员工姓名",
            labelTxt: "员工",
            renderType: "popover",
            url: "getStaffList",
            type: "userName"
        },
        {
            itemName: "date",
            initVal: "请选择入职时间",
            labelTxt: "记录生成时间",
            renderType: "date",
        }
    ],
    [
        {
            itemName: "reason",
            initVal: "请选择奖惩原因",
            labelTxt: "奖惩原因",
            renderType: "input",
        },
        {
            itemName: "type",
            initVal: "请选择奖惩类型",
            labelTxt: "奖惩类型",
            renderType: "select",
            optionName: "rewardType"
        }
    ],
    [
        {
            itemName: "recordDesc",
            initVal: "请输入详细描述情况",
            labelTxt: "奖惩详细描述",
            renderType: "input",
        },
        {
            itemName: "file",
            labelTxt: "附件上传",
            renderType: "upload",
            type: "upload"
        }
    ],
]