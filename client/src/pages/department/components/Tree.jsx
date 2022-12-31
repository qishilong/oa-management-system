import { useEffect } from 'react'
import { useDispatch, useSelector } from "umi"
import OrgTree from "react-org-tree"

const Tree = ({ getDepartmentDetail }) => {
    const dispatch = useDispatch();
    const departmentList = useSelector(state => JSON.parse(JSON.stringify(state.department.departmentList.filter(
        item => !item.parentLists.length
        // item => item
    ))
    ))

    // console.log(departmentList)

    useEffect(() => {
        dispatch({
            type: "department/_initDepartmentList",
            payload: {}
        })
    }, [])

    const addProp = (list) => {
        list.forEach(item => {
            item.label = item.departmentName;
            item.id = item._id;
            item.children && item.children.length && addProp(item.children);
        })
    }

    addProp(departmentList)

    const renderData = {
        id: -1,
        label: "公司组织架构图",
        children: departmentList
    }

    // 获取当前选定的内容
    const selectData = (e, data) => {
        getDepartmentDetail(data.id, data.departmentName)
    }

    return (
        <OrgTree
            data={renderData}
            horizontal={false}
            collapsable={false}
            expandAll={true}
            onClick={selectData}
        />
    )
}

export default Tree
