import { useState, useEffect } from 'react'
import { Form, Input } from "antd";
import { useDispatch, useSelector } from 'umi';

const FilterForm = ({ reloadPage }) => {
    const [form] = Form.useForm();
    const [queryData, setQueryData] = useState({
        levelName: null,
        levelDescription: null
    })
    const dispatch = useDispatch();
    const { isClearForm } = useSelector(state => state.common)

    useEffect(() => {
        if (isClearForm) {
            form.resetFields();
            reloadPage();
            setQueryData(prev => prev = { levelName: null, levelDescription: null })
            dispatch({ type: "common/clearSearchForm", payload: { isClearForm: false } })
        }
    }, [isClearForm])

    // 搜索函数
    const searchVal = (type) => {
        const tempData = JSON.parse(JSON.stringify(queryData))
        tempData[type] = form.getFieldValue(type);
        setQueryData(prev => prev = tempData);
        Object.keys(tempData).forEach(item => !tempData[item] && delete tempData[item]);
        reloadPage(tempData)
    }

    return (
        <Form form={form} layout="vertical">
            <Form.Item label="职级名称" name="levelName">
                <Input placeholder='请输入搜索内容' onPressEnter={() => searchVal("levelName")} />
            </Form.Item>
            <Form.Item label="职级描述" name="levelDescription">
                <Input placeholder='请输入搜索内容' onPressEnter={() => searchVal("levelDescription")} />
            </Form.Item>
        </Form>
    )
}

export default FilterForm
