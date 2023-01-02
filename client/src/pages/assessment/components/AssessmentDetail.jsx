import React from 'react'
import { Form, Input, InputNumber, Tag, message, DatePicker, Row, Col } from "antd";
import $http from "api";
import { useDispatch, useSelector } from "umi";
import { assessmentRules } from '../../../utils/rules';
import staticAssessmentList, { readData } from '../../../staticList/staticAssessmentList';
import { dateFormat } from '../../../utils/dateFormat';
import moment from "moment"
import DropPopover from '../../../components/DropPopover';

const AssessmentDetail = ({ _initAssessment }) => {
    const { assessmentDetail } = useSelector(state => state.assessment);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    // 提交更新前检查
    const checkBeforeUpdate = async (item) => {
        const editData = await form.validateFields([item.itemName]);
        if (editData[item.itemName] === assessmentDetail[item.itemName]) return;
        updateAssessment(item, editData)
    }

    // 修改绩效考核
    const updateAssessment = async (item, editData) => {
        const { code, msg } = await $http.updateAssessment({
            _id: assessmentDetail._id,
            type: item.itemName,
            updateVal: editData[item.itemName]
        })
        if (code) return message.error(msg);
        message.success(msg);
        _initAssessment();
        dispatch({
            type: "assessment/_initAssessmentDetail",
            payload: { _id: assessmentDetail._id }
        })
    }

    // 表单集合映射
    const formData = {
        input: (item) => <Input placeholder={item.initVal} onBlur={() => checkBeforeUpdate(item)} />,
        inputNumber: (item) => <InputNumber
            placeholder={item.initVal}
            onBlur={() => checkBeforeUpdate(item)}
            readOnly={item.readOnly}
        />,
        popover: (item) =>
            item.itemName === "staffNameVal" ? <Tag>{assessmentDetail?.staffName?.userName ? assessmentDetail?.staffName?.userName : "---"}</Tag> :
                <Input
                    readOnly={true}
                    className="border-color"
                    addonAfter={<DropPopover
                        placeholderVal={item.initVal}
                        interfaceName={item.url}
                        searchType={item.type}
                        getSelectItem={(obj) => {
                            const setData = {
                                [item.itemName]: obj[item.type],
                                [item.itemName.split("V")[0]]: obj._id
                            }
                            item.itemName === "currentLevelVal" && (setData.standardScore = obj.levelScore)
                            form.setFieldsValue(setData)
                            updateAssessment({ itemName: "currentLevel" }, { currentLevel: obj._id })
                        }}
                    />}
                />,
        date: (item) => <DatePicker
            placeholder='请选择入职时间'
            style={{ width: "100%" }}
            onBlur={() => checkBeforeUpdate(item)}
        />,
        tag: (item) => <Tag>{item.itemName === "departmentName" ? assessmentDetail?.staffName?.department?.departmentName || "---" : assessmentDetail?.staffName?.onboardingTime ? dateFormat(assessmentDetail?.staffName?.onboardingTime) : "---"}</Tag>
    }


    return (
        <Form form={form} initialValues={{
            ...assessmentDetail,
            date: moment(assessmentDetail?.date),
            currentLevelVal: assessmentDetail?.currentLevel?.levelName
        }} layout="vertical">
            {[...staticAssessmentList, ...readData].map((item, index) => {
                return <Row key={index} justify={"space-between"}>
                    {item.map((childItem, childIndex) => {
                        return <Col span={11} key={childIndex}>
                            <Form.Item
                                label={childItem.labelTxt}
                                name={childItem.itemName}
                                rules={assessmentRules[childItem.itemName]}
                                required={true}
                                style={childItem.style}
                            >
                                {childItem.renderType && formData[childItem.renderType](childItem)}
                            </Form.Item>
                        </Col>
                    })}
                </Row>
            })}
        </Form>
    )
}

export default AssessmentDetail
