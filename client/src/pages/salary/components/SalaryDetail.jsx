import React from 'react'
import { Form, Input, message, DatePicker, Row, Col, Select } from "antd";
import $http from "api";
import { useDispatch, useSelector } from "umi";
import { salaryRules } from '../../../utils/rules';
import staticSalaryList from '../../../staticList/staticSalaryList';
import moment from "moment"
import { mapData } from "../../../utils/mapData";
const { Option } = Select;


const SalaryDetail = ({ _initSalaryList }) => {
    const { salaryDetail } = useSelector(state => state.salary);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    // 提交更新前检查
    const checkBeforeUpdate = async (item) => {
        const editData = await form.validateFields([item.itemName]);
        if (editData[item.itemName] === salaryDetail[item.itemName]) return;
        updateSalary(item, editData)
    }

    // 修改绩效考核
    const updateSalary = async (item, editData) => {
        const { code, msg } = await $http.updateSalary({
            _id: salaryDetail._id,
            type: item.itemName,
            updateVal: editData[item.itemName]
        })
        if (code) return message.error(msg);
        message.success(msg);
        _initSalaryList();
        dispatch({
            type: "Salary/_initSalaryDetail",
            payload: { _id: salaryDetail._id }
        })
    }

    // 表单集合映射
    const formMap = {
        input: (item) => <Input placeholder={item.initVal} onBlur={() => checkBeforeUpdate(item)} />,
        popover: (item) => <Input placeholder={item.initVal} disabled={true} />,
        date: (item) => <DatePicker
            placeholder='请选择入职时间'
            style={{ width: "100%" }}
            onBlur={() => checkBeforeUpdate(item)}
        />,
        select: (item) => <Select placeholder={item.initVal}>
            {mapData[item.itemName].map((value, index) => <Option
                key={index}
                value={index}
            >
                {value}
            </Option>)}
        </Select>
    }


    return (
        <Form form={form} initialValues={{
            ...salaryDetail,
            staffNameVal: salaryDetail?.userName?.userName || "---",
            startTime: moment(salaryDetail?.startTime)
        }} layout="vertical">
            {staticSalaryList.map((item, index) => {
                return <Row key={index} justify={"space-between"}>
                    {item.map((childItem, childIndex) => {
                        return <Col span={11} key={childIndex}>
                            <Form.Item
                                label={childItem.labelTxt}
                                name={childItem.itemName}
                                rules={salaryRules[childItem.itemName]}
                                required={true}
                                style={childItem.style}
                            >
                                {childItem.renderType && formMap[childItem.renderType](childItem)}
                            </Form.Item>
                        </Col>
                    })}
                </Row>
            })}
        </Form>
    )
}

export default SalaryDetail
