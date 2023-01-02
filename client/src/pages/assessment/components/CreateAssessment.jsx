import React from 'react'
import { Form, Input, DatePicker, message, InputNumber, Button, Row, Col } from "antd"
import DropPopover from '../../../components/DropPopover'
import $http from "api";
import staticAssessmentList from '../../../staticList/staticAssessmentList';
import { assessmentRules } from '../../../utils/rules';

const CreateAssessment = ({ setDialogStatus, reloadPage }) => {
    const [form] = Form.useForm();

    const formMap = {
        input: (item) => <Input placeholder={item.initVal} readOnly={item.readOnly} />,
        inputNumber: (item) => <InputNumber
            placeholder={item.initVal}
            readOnly={item.readOnly}
            style={{ width: "100%" }}
        />,
        popover: (item) => <Input
            readOnly={true}
            placeholder={item.initVal}
            addonAfter={<DropPopover
                placeholderVal={item.labelTxt}
                interfaceName={item.url}
                searchType={item.type}
                getSelectItem={(obj) => {
                    const setData = {
                        [item.itemName]: obj[item.type],
                        [item.itemName.split("V")[0]]: obj._id
                    }
                    item.itemName === "currentLevelVal" && (setData.standardScore = +obj.levelScore)
                    console.log(setData)
                    form.setFieldsValue(setData)
                }}
            />}
        />,
        date: () => <DatePicker placeholder='请选择入职时间' style={{ width: "100%" }} />,
    }

    // 表单提交
    const _onFinish = async (data) => {
        data.standardScore = +data.standardScore;
        data.assessmentScore = +data.assessmentScore;
        delete data.currentLevelVal;
        delete data.staffNameVal;
        data.staffName = form.getFieldValue("staffName");
        data.standardScore = form.getFieldValue("standardScore");
        data.currentLevel = form.getFieldValue("currentLevel");
        const { code, msg } = await $http.createAssessment(data);
        if (!code) {
            message.success(msg);
            reloadPage();
            setDialogStatus(prev => prev = false);
            return
        }
        message.error(msg)
    }

    // 改变考核得分时计算考核等级结果
    const changeResult = () => {
        const standardScore = form.getFieldValue("standardScore");
        const assessmentScore = form.getFieldValue("assessmentScore");
        if (standardScore && assessmentScore) {
            const result = assessmentScore - standardScore;
            let levelTag = null;
            switch (true) {
                case result <= 0:
                    levelTag = "C";
                    break;
                case result > 0 && result < 20:
                    levelTag = "B";
                    break;
                default:
                    levelTag = "A";
                    break;
            }
            form.setFieldsValue({ result: levelTag })
        }
    }


    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={_onFinish}
            onFieldsChange={changeResult}
        >
            {staticAssessmentList.map((item, index) => {
                return <Row key={index} justify={"space-between"}>
                    {item.map((childItem, childIndex) => {
                        return <Col key={childIndex} span={11}>
                            <Form.Item
                                label={childItem.labelTxt}
                                name={childItem.itemName}
                                required={true}
                                rules={assessmentRules[childItem.itemName]}
                                style={childItem.style}
                            >
                                {childItem.renderType && formMap[childItem.renderType](childItem)}
                            </Form.Item>
                        </Col>
                    })}
                </Row>
            })}
            <Col span={24} style={{ textAlign: "right" }}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        创建
                    </Button>
                </Form.Item>
            </Col>
        </Form>
    )
}

export default CreateAssessment
