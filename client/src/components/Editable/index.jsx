import { useState, useEffect, useContext, useRef, createContext } from 'react'
import { Form, Input, Select, DatePicker } from "antd"
import { mapData } from "utils/mapData"
import moment from "moment"

const { Option } = Select;
const EditableContext = createContext(null)

// 可编辑行
export const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    )
}

// 可编辑列
export const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    rules,
    type,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    // console.log(type)
    useEffect(() => {
        if (editing) {
            inputRef.current && inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        // console.log(dataIndex, record, 111)
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
            onboardingTime: moment(record.onboardingTime), // 指定的时间字段的渲染操作
            date: moment(record.date),   // 指定的时间字段的渲染操作
            createTime: moment(record.createTime), //- 指定的时间字段的渲染操作
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    // 修改之前的检测
    const _editBeforeCheck = async () => {
        try {
            const editData = await form.validateFields([dataIndex])
            setEditing(!editing);
            // 修改之后的值是否与修改之前的值相等
            if (editData[dataIndex] === record[dataIndex]) return;
            handleSave({
                _id: record._id,
                updateVal: editData[dataIndex],
                type: dataIndex
            })
        } catch (err) {
            setEditing(!editing)
        }
    }

    const editNodeData = {
        inputNode: (
            <Input
                ref={inputRef}
                onPressEnter={_editBeforeCheck}
                onBlur={_editBeforeCheck}
            />
        ),
        selectNode: (
            <Select
                ref={inputRef}
                onBlur={_editBeforeCheck}
            >
                {mapData[dataIndex] && mapData[dataIndex].map((item, index) => {
                    // console.log(item);
                    return <Option key={index} value={index}>{item}</Option>
                })
                }
            </Select >
        ),
        dateNode: (
            <DatePicker
                ref={inputRef}
                onBlur={_editBeforeCheck}
                onChange={_editBeforeCheck}
            />
        )
    }

    // console.log(editable, type)

    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={rules}
            >
                {editNodeData[type]}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};
