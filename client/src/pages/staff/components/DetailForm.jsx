import React from 'react'
import formList from "../../../staticList/staticStaffList"
import { Form, Input, message, Select, DatePicker, Row, Col } from "antd";
import DropPopover from '../../../components/DropPopover';
import moment from "moment";
import { staffRules } from '../../../utils/rules/staffRules';
import $http from "api";
import { useDispatch } from 'umi';
import Upload from '../../../components/Upload';

const { Option } = Select;


const DetailForm = ({ staffDetail, _initStaffData }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    // 提交表单之前的验证
    const checkBeforeSubmitForm = async (item) => {
        const newVal = form.getFieldValue(item.itemName);
        const oldVal = staffDetail[item.itemName];

        if (typeof oldVal === "Object") {
            oldVal = oldVal._id
        }

        try {
            // 判断输入框中新旧值是否相同
            if (newVal === oldVal) return;
            // 账户名或者手机号码验证
            if (item.itemName === "mobile" || item.itemName === "accountName") {
                const updateValue = await form.validateFields([item.itemName]);
                const { data, msg } = await $http.checkIsExists({ checkData: updateValue })
                if (data) {
                    form.setFieldsValue({ [item.itemName]: staffDetail[item.itemName] })
                    return message.error(msg)
                }
            }
            _updateStaff(item.itemName, newVal);
        } catch (error) {
            form.setFieldsValue({ [item.itemName]: staffDetail[item.itemName] })
        }
    }

    // 修改表单项
    const _updateStaff = async (type, updateVal) => {
        const { code, msg } = await $http.updateStaff({
            _id: staffDetail._id,
            type,
            updateVal
        })
        if (code) return;
        message.success(msg);
        _initStaffData();
        dispatch({ type: "staff/_getStaffDetail", payload: { _id: staffDetail._id } })
    }

    // 根据数据类型渲染表单数据
    const formData = {
        input: (item) => <Input
            placeholder={item.itemName === "password" ? "请在登陆界面完成修改" : item.placeholderVal}
            disabled={item.itemName === "password"}
            onBlur={() => checkBeforeSubmitForm(item)}
        />,
        select: (item) => <Select
            placeholder={item.placeholderVal}
            onChange={() => checkBeforeSubmitForm(item)}
        >
            {item.optionData.map((value, index) => <Option
                key={index}
                value={index}
            >{value}</Option>)}
        </Select>,
        date: (item) => <DatePicker
            style={{ width: "100%" }}
            placeholder={item.placeholderVal}
            onChange={() => checkBeforeSubmitForm(item)}
        />,
        popover: (item) => <Input
            placeholder={item.placeholderVal}
            readOnly={true}
            addonAfter={<DropPopover
                placeholderVal={item.placeholderVal}
                interfaceName={item.interfaceName}
                searchType={item.itemName}
                getSelectItem={(res) => {
                    form.setFieldsValue({
                        [item.itemName]: res[item.itemName],
                        [item.itemName.split("N")[0]]: res._id
                    })
                    // console.log(item.itemName, item.itemName.split("N"), [item.itemName.split("N")[0]], res._id)
                    // console.log(res)
                    const reqData = JSON.parse(JSON.stringify(item));
                    reqData.itemName = reqData.itemName.split("N")[0];
                    checkBeforeSubmitForm(reqData);
                }} />}
        />,
        upload: (item) => <Upload
            avatar={staffDetail.avatar}
            getNewAvatar={(newAvatar) => _updateStaff("avatar", newAvatar)}
        />
    }

    formData["input"]
    // console.log(staffDetail)

    return (
        <Form
            layout='vertical'
            form={form}
            initialValues={{
                ...staffDetail,
                onboardingTime: moment(staffDetail.onboardingTime),
                departmentName: staffDetail.department?.departmentName,
                levelName: staffDetail.level?.levelName
            }}
        >
            {formList.map((arr, arrIndex) => {
                return (<Row key={arrIndex} justify={"space-between"}>
                    {arr.map((item, itemIndex) => {
                        return <Col span={11} key={itemIndex}>
                            <Form.Item
                                style={{ ...item.style }}
                                name={item.itemName}
                                label={item.labelTxt}
                                rules={staffRules[item.itemName]}
                            >
                                {formData[item.renderType](item)}
                            </Form.Item>
                        </Col>
                    })}
                </Row>)
            })}
        </Form>
    )
}

export default DetailForm
