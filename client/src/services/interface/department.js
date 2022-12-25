import ajax from "../http"

// 获取部门列表
export const getDepartmentList = (params) => ajax.get("/department", params)