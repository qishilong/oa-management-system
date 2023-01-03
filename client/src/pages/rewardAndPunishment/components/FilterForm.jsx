import { useEffect } from 'react'
import { Form, Input, DatePicker } from "antd"
import { useDispatch, useSelector } from "umi"
import DropPopover from "../../../components/DropPopover"

const FilterForm = ({ reloadPage }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { isClearForm } = useSelector(state => state.common)

    useEffect(() => {
        if (isClearForm) {
            form.resetFields()
            dispatch({
                type: "common/clearSearchForm",
                payload: { isClearForm: false }
            })
            reloadPage({})
        }
    }, [isClearForm])

    // 搜索函数
    const searchValue = (data) => {
        // console.log(data, 222)
        form.setFieldsValue({ staffName: data.userName, staffId: data._id })
        reloadPage({ staffName: data._id })
    }

    return (
        <Form form={form} layout="vertical">
            <Form.Item label="搜索员工" name="staffName">
                <Input
                    readOnly={true}
                    placeholder="请输入要搜索的员工"

                    addonAfter={<DropPopover
                        placeholderVal="请输入要搜索的员工"
                        interfaceName="getStaffList"
                        searchType="userName"
                        getSelectItem={(item) => searchValue(item)}
                    />}
                />
            </Form.Item>
            <Form.Item style={{ display: "none" }} name="staffId">
                <Input />
            </Form.Item>
        </Form>
    )
}

export default FilterForm
