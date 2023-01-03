## 部门信息模块制作(一)

### 数据获取

> **部门信息模块涉及接口共计5个**
>
> - 部门列表
> - 部门详情
> - 删除部门
> - 新增部门
> - 修改部门
>
> 接口参考地址：http://mock.duyiedu.com/project/128/interface/api/cat_343

---

### 模块功能实现

> 1. 部门关系图展示
> 2. 部门详细信息展示
> 3. 当前部门部分字段修改
> 4. 当前部门删除功能
> 5. 新增部门



**说明**

> 该模块样式结构与其他模块差异较大，本模块内公共组件使用只需引入下拉列表组件即可





### 创建部门模块基本页面结构

- 头部新增部门按钮组件

- 树状图实现各部门关系展示

- 创建部门及部门修改组件

    ```js
     return (
        <div className="department-container">
          <Button className="create-department-btn" size="small" shape="round" icon={iconMap.add} onClick={openDialog}> 创建</Button>
          <DepartmentTree />
          <DepartmentDetail />
          <CreateDepartmentModal isCreateModalVisible={isCreateModalVisible} setIsCreateModalVisible={setIsCreateModalVisible} />
        </div>
      );
    ```

---



### 部门树状关系图组件制作

> 参考文档地址：https://github.com/artdong/react-org-tree
>
> 在制作过程中需要调整后端返回数据的渲染字段，否则无法正确的进行渲染



**实现功能**

> - 展示部门关系信息
> - 实现点击当前卡片进行详情展示



### 实现流程

- 数据获取 ： **获取所有部门集合内容**

    - 定义状态值

    - 初始化更新数据状态

        ```js
          useEffect(() => {
            dispatch({ type: 'department/_getDepartmentList', payload: {} });
          }, []);
        ```

- **结构渲染**

    ```js
        <OrgTree
          data={renderDta}
          horizontal={false}
          collapsable={false}
          expandAll={true}
          onClick={selectData}
        />
    ```

- **树状图进行点击事件添加**

    ```js
      const selectData = (e, data) => {
        if (data.id === -1) return
        getSelectDepartment(data.id, data.departmentName)
      }
    ```

    



