## 员工列表模块制作（二）

### 表格组件制作

- **实现功能**

    > 展示员工列表信息，根据当前不同的用户进行指定信息展示，普通员工，展示部分信息，管理员，展示全部信息。根据接口返回字段，进行拼接定义即可，返回字段，可参考员工列表接口文档说明。接口api说明地址：[http://mock.duyiedu.com/project/128/interface/api/306](http://mock.duyiedu.com/project/128/interface/api/306)

- **三方依赖**

    > 使用ant的表格组件进行表格搭建基本结构，添加ant的**可编辑**表格功能
    >
    > 参考地址：https://ant.design/components/table-cn/#header

- **私有子组件**

    - columns组件，当前表格列表项展示可使用单独的列表组件实现

    - columns组件在定义时需要区分当前的用户身份，普通员工时，渲染内容根据后端返回数据相应减少，管理员用户时展示全部数据内容，并进行是否可编辑的验证处理

    - **判断用户身份，进行展示表格项拼接操作**

    - 规定渲染的可编辑单元格显示类型（type类型值）

        ```js
          let returnColumnsList = identity === 0 ? normalColumns : [...normalColumns,
          ...authColumns];
        
        returnColumnsList = returnColumnsList.map((col) => {
            if (!col.editable) return col;
            return {
              ...col,
              onCell: (record) => 	{
                let type = '';
                switch (col.dataIndex) {
                  case 'onboardingTime':
                  case 'birthday':
                    type = 'dateNode';   // 日期节点
                    break;
                  case 'gender':
                  case 'education':
                  case 'marriage':
                    type = 'selectNode';   // 下拉菜单节点
                    break;
                  default:
                    type = 'inputNode';    // 文本节点
                    break;
                }
                return {
                  record,
                  type,
                  editable: col.editable,
                  dataIndex: col.dataIndex,
                  align: 'center',
                  title: col.title,
                  rules: editStaffData[col.dataIndex],
                  handleSave, //- 编辑表格保存时处理
                };
              },
            };
          });
        ```

- **公共组件定义**

    >  在表格中，会使用到公共的可编辑单元格及单元行组件，可进行公共组件的抽离

    - 创建单元格及单元行组件

    - 通过createContext实现form表单的关联及依赖注入

        ```js
        import React from 'react';
        export const EditableContext = React.createContext(null);
        ```

    - **单元行组件定义**

        ```js
        const EditableRow = ({ index, ...props }) => {
          const [form] = Form.useForm();
          return (
            <Form form={form} component={false}>
              <EditableContext.Provider value={form}>
                <tr {...props} />
              </EditableContext.Provider>
            </Form>
          );
        };
        ```

    - **单元格组件定义，实现可编辑childNode节点根据不同的类型进行相关表单组件的使用,定义节点时，需编辑节点类型，区分节点type，选择inut节点，及select节点**

        ```js
         const editNodeData = {
            inputNode: (
              <Input ref={inputRef} style={{ minWidth: '130px', maxWidth: '130px' }} onBlur={_sendBeforeCheck} />
            ),
            dateNode: <DatePicker style={{ minWidth: '150px', maxWidth: '150px' }} onBlur={_sendBeforeCheck} />,
            selectNode: (
              <Select
                style={{ minWidth: '150px', maxWidth: '150px' }}
                onBlur={_sendBeforeCheck}
              >
                {matchData[dataIndex] &&
                  matchData[dataIndex].map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.val}
                    </Option>
                  ))}
              </Select>
            ),
          };
        
        ```

---
