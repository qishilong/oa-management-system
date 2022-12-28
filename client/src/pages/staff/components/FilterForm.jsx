import { useState, useEffect } from 'react'
import DropPopover from '../../../components/DropPopover'
import { Form, Input, Select } from "antd";
import { mapData } from "../../../utils/mapData"
import { useSelector, useDispatch } from "umi"
const { Option } = Select

const FilterForm = ({ reload }) => {
    const [form] = Form.useForm()
    const { userInfo: { identity } } = useSelector(state => state.user)
    const { isClearForm } = useSelector(state => state.common);
    const dispatch = useDispatch()

    const [queryData, setQueryData] = useState({
        education: null,
        level: null,
        department: null,
        userName: null,
        marriage: null
    })

    useEffect(() => {
        if (isClearForm) {
            form.resetFields();
            reload({});
            setQueryData({
                education: null,
                level: null,
                department: null,
                userName: null,
                marriage: null
            })
            dispatch({ type: "common/clearSearchForm", payload: { isClearForm: false } })
        }
    }, [isClearForm])

    // 员工搜索
    const searchStaff = (type) => {
        const searchData = JSON.parse(JSON.stringify(queryData));
        if (typeof type === "object") {
            Object.assign(searchData, type)
        } else {
            searchData[type] = form.getFieldValue(type)
        }
        setQueryData(searchData);
        _filterData(searchData)
    }

    // 搜索员工
    const _filterData = (currentData) => {
        Object.keys(currentData).forEach((key) => {
            if (!currentData[key]) {
                delete currentData[key]
            }
        })
        console.log(currentData)
        reload({ queryData: currentData })
    }

    return (
        <Form form={form} layout="vertical">
            <Form.Item label="姓名" name="userName">
                <Input
                    allowClear={true}
                    onPressEnter={() => searchStaff("userName")}
                    placeholder="请输入搜索的员工姓名"
                />
            </Form.Item>
            <Form.Item label="部门" name="department">
                <Input
                    readOnly={true}
                    placeholder="请输入搜索的员工部门"
                    addonAfter={
                        <DropPopover
                            searchType="departmentName"
                            interfaceName="getDepartmentList"
                            placeholder="请输入搜索的部门"
                            getSelectItem={(item) => {
                                form.setFieldsValue({
                                    department: item.departmentName
                                })
                                searchStaff({ department: item._id })
                            }}
                        />
                    }
                />
            </Form.Item>
            <Form.Item>
                <Input
                    readOnly={true}
                    placeholder="请输入搜索的员工职级"
                    addonAfter={
                        <DropPopover
                            searchType="levelName"
                            interfaceName="getLevelList"
                            placeholder="请输入搜索的部门"
                            getSelectItem={(item) => {
                                form.setFieldsValue({
                                    level: item.levelName
                                })
                                searchStaff({ level: item._id })
                            }}
                        />
                    }
                />
            </Form.Item>
            {
                identity && (
                    <>
                        <Form.Item label="婚姻状况" name="marriage">
                            <Select
                                allowClear={true}
                                onChange={() => searchStaff("marriage")}
                                placeholder="根据婚姻状况进行员工搜索"
                            >
                                {mapData.marriage.map((item, index) =>
                                    <Option key={index} value={index}>
                                        {item}
                                    </Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item label="学历" name="education">
                            <Select
                                allowClear={true}
                                onChange={() => searchStaff("education")}
                                placeholder="根据学历进行员工搜索"
                            >
                                {mapData.education.map((item, index) =>
                                    <Option key={index} value={index}>
                                        {item}
                                    </Option>)}
                            </Select>
                        </Form.Item>
                    </>
                )
            }
        </Form>
    )
}

export default FilterForm
