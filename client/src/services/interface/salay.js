import ajax from "../http.js"

// 获取调薪记录信息表
export const getSalaryAdjustment = (params) => ajax.get("/salaryAdjustment", params)