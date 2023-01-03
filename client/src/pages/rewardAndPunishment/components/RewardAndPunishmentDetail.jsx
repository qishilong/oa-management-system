import React from 'react'
import { Form, Input, message, DatePicker, Row, Col, Select, Upload } from "antd";
import $http from "api";
import { useDispatch, useSelector } from "umi";
import staticRewardAndPunishmentList from '../../../staticList/staticRewardAndPunishmentList';
import { rewardAndPunishmentRules } from '../../../utils/rules';
import moment from "moment"
import { mapData } from "../../../utils/mapData";
import UploadComponent from "../../../components/Upload"
const { Option } = Select;


const RewardAndPunishmentDetail = ({ _initRewardAndPunishmentList }) => {
    const { rewardAndPunishmentDetail } = useSelector(state => state.rewardAndPunishment);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    // 提交更新前检查
    const checkBeforeUpdate = async (item) => {
        const editData = await form.validateFields([item.itemName]);
        if (editData[item.itemName] === rewardAndPunishmentDetail[item.itemName]) return;
        updateRewardAndPunishment(item, editData)
    }

    // 修改绩效考核
    const updateRewardAndPunishment = async (item, editData) => {
        const { code, msg } = await $http.updateRewardAndPunishment({
            _id: rewardAndPunishmentDetail._id,
            type: item.itemName,
            updateVal: editData[item.itemName]
        })
        if (code) return message.error(msg);
        message.success(msg);
        _initRewardAndPunishmentList();
        dispatch({
            type: "rewardAndPunishment/_initRewardAndPunishmentDetail",
            payload: { _id: rewardAndPunishmentDetail._id }
        })
    }

    // 表单集合映射
    const formMap = {
        input: (item) => <Input placeholder={item.initVal} onBlur={() => checkBeforeUpdate(item)} />,
        popover: (item) => <Input placeholder={item.initVal} />,
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
        </Select>,
        // 上传附件图片
        upload: (item) => <UploadComponent
            getNewAvatar={(file) => updateRewardAndPunishment({ itemName: "avatar" }, { avatar: file })}
            avatar={rewardAndPunishmentDetail?.file}
        />
    }


    return (
        <Form form={form} initialValues={{
            ...rewardAndPunishmentDetail,
            staffName: rewardAndPunishmentDetail?.staffName?.userName || "---",
            date: moment(rewardAndPunishmentDetail?.date)
        }} layout="vertical">
            {staticRewardAndPunishmentList.map((item, index) => {
                return <Row key={index} justify={"space-between"}>
                    {item.map((childItem, childIndex) => {
                        return <Col span={11} key={childIndex}>
                            <Form.Item
                                label={childItem.labelTxt}
                                name={childItem.itemName}
                                rules={rewardAndPunishmentRules[childItem.itemName]}
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

export default RewardAndPunishmentDetail
