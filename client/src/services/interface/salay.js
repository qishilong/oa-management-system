import ajax from "../http.js"

// 获取调薪记录信息表
export const getSalaryAdjustment = (params) => ajax.get("/salaryAdjustment", params)

// 获取调薪详情
export const getSalaryDetail = (params) => ajax.get(`/getSalaryAdjustmentDetail/${params._id}`)

// 新增调薪记录
export const createSalary = (params) => ajax.post("/salaryAdjustment", params)

// 修改调薪记录
export const updateSalary = (params) => ajax.put(`/salaryAdjustment/${params._id}`, params)

// 删除调薪记录
// export const deleteSalary = (params) => ajax.del(`/salaryAdjustment/${params._id}`)
export const deleteSalary = (params) => ajax.post(`/destroySalary`, params);
