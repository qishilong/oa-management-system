import ajax from "../http.js";

// 获取绩效考核列表
export const getAssessmentList = (params) => ajax.post("/getAssessmentList", params)

// 获取指定绩效考核详情
export const getAssessmentDetail = (params) => ajax.get(`/assessment/${params._id}`)

// 新增绩效考核
export const createAssessment = (params) => ajax.post("/assessment", params)

// 修改绩效考核
export const updateAssessment = (params) => ajax.put(`/assessment/${params._id}`, params)

/**
 * 接口文档描述的有问题，这才是真正生效的删除接口
 */
// 删除绩绩效考核
export const deleteAssessment = (params) => ajax.post("/destroyAssessment", params)
// export const deleteAssessment = (params) => ajax.del(`/assessment/${params._id}`)