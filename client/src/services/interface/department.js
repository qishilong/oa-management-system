import ajax from "../http"

// 获取部门列表
export const getDepartmentList = (params) => {
    const reqParams = params.queryData ? params.queryData : {};
    delete params.queryData;
    return ajax.get("/department", { ...params, ...reqParams })
}