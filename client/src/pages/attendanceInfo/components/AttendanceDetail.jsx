import React from 'react'
import { Form, Input, message, DatePicker, Row, Col, Select, Upload } from "antd";
import $http from "api";
import { useDispatch, useSelector } from "umi";
import staticAttendanceList from '../../../staticList/staticAttendanceList';
import { attendanceRules } from '../../../utils/rules';
import moment from "moment"
import { mapData } from "../../../utils/mapData";
import DropPopover from '../../../components/DropPopover';
const { Option } = Select;


const AttendanceDetail = ({ _initAttendanceList }) => {
    const { attendanceDetail } = useSelector(state => state.attendanceInfo);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    // 提交更新前检查
    const checkBeforeUpdate = async (item) => {
        const editData = await form.validateFields([item.itemName]);
        if (editData[item.itemName] === attendanceDetail[item.itemName]) return;
        updateAttendance(item, editData)
    }

    // 修改绩效考核
    const updateAttendance = async (item, editData) => {
        const { code, msg } = await $http.updateAttendance({
            _id: attendanceDetail._id,
            type: item.itemName,
            updateVal: editData[item.itemName]
        })
        console.log(item.itemName)
        if (code) return message.error(msg);
        message.success(msg);
        _initAttendanceList();
        dispatch({
            type: "attendance/_initAttendanceDetail",
            payload: { _id: attendanceDetail._id }
        })
    }

    // 表单集合映射
    const formMap = {
        input: (item) => <Input placeholder={item.initVal} onBlur={() => checkBeforeUpdate(item)} />,
        date: (item) => <DatePicker
            placeholder='请选择入职时间'
            style={{ width: "100%" }}
            onBlur={() => checkBeforeUpdate(item)}
        />,
        select: (item) => <Select placeholder={item.initVal} onBlur={() => checkBeforeUpdate(item)}>
            {mapData[item.itemName].map((value, index) => <Option
                key={index}
                value={index}
            >
                {value}
            </Option>)}
        </Select>,
        popover: (item) => <Input
            placeholder={item.initVal}
            readOnly={true}
            addonAfter={<DropPopover
                placeholderVal={item.initVal}
                interfaceName="getStaffList"
                searchType="userName"
                getSelectItem={(obj) => {
                    form.setFieldsValue({
                        [item.itemName]: obj[item.itemName]
                    })
                    // obj[item.itemName] = obj.userName
                    // console.log(obj, item)
                    updateAttendance(item, obj)
                }}
            />}
        />
    }


    return (
        <Form form={form} initialValues={{
            ...attendanceDetail,
            staffName: attendanceDetail?.staffName?.userName || "---",
            createTime: moment(attendanceDetail?.createTime)
        }} layout="vertical">
            {staticAttendanceList.map((item, index) => {
                return <Row key={index} justify={"space-between"}>
                    {item.map((childItem, childIndex) => {
                        return <Col span={11} key={childIndex}>
                            <Form.Item
                                label={childItem.labelTxt}
                                name={childItem.itemName}
                                // rules={attendanceRules[childItem.itemName]}
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

export default AttendanceDetail
