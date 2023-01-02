import React from 'react'
import { Form, Input, Row, Col, message } from "antd";
import { useSelector, useDispatch } from "umi";
import staticLevelList from '../../../staticList/staticLevelList';
import $http from "api";
import { levelRules } from '../../../utils/rules';

const LevelDetail = ({ _initLevelList }) => {
    const { levelDetail } = useSelector(state => state.level)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    // console.log(levelList, levelDetail, 111)

    // 更改前检查
    const checkBeforeUpdate = async (item) => {
        const editData = await form.validateFields([item.itemName]);
        if (editData[item.itemName] === levelDetail[item.itemName]) return;
        updateLevelDetail(item, editData);
    }

    // 修改职级
    const updateLevelDetail = async (item, editData) => {
        const { code, msg } = await $http.updateLevelDetail({
            _id: levelDetail._id,
            type: item.itemName,
            updateVal: editData[item.itemName]
        })
        if (code) return message.error(msg);
        message.success(msg);
        _initLevelList();
        dispatch({
            type: "level/_initLevelDetail",
            payload: { _id: levelDetail._id }
        })
    }

    return (
        <Form form={form} initialValues={levelDetail} layout="vertical">
            {staticLevelList.map((item, index) => {
                return <Row key={index} justify={"space-between"}>
                    {item.map((childItem, childIndex) => {
                        // console.log(childItem)
                        return <Col key={childIndex} span={11}>
                            <Form.Item
                                style={childItem.style}
                                label={childItem.labelTxt}
                                name={childItem.itemName}
                                required={true}
                                rules={levelRules[childItem.itemName]}
                            >
                                <Input
                                    placeholder={childItem.initVal}
                                    onBlur={() => checkBeforeUpdate(childItem)}
                                />
                            </Form.Item>
                        </Col>
                    })}
                </Row>
            })}
        </Form>
    )
}

export default LevelDetail
