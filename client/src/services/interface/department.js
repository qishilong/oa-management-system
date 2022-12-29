import ajax from "../http"

// 获取部门列表
export const getDepartmentList = (params) => {
    const reqParams = params.queryData ? params.queryData : {};
    delete params.queryData;
    return ajax.get("/department", { ...params, ...reqParams })
}

// 获取部门详情
export const getDepartmentDetail = (params) => ajax.get(`/department/${params._id}`)

// 新增部门
export const addDepartment = (params) => ajax.post("/department", params)