import ajax from "../http.js";

// 获取员工列表
export const getStaffList = (params) => ajax.post("/getStaff", params);

// 获取员工详情
export const getStaffDetail = ({ _id }) => ajax.get(`/staffDetail/${_id}`)

// 新增员工
export const createStaff = (params) => ajax.post("/createStaff", params);

// 修改员工信息
export const updateStaff = (params) => ajax.put("/updateStaff", params);

// 删除员工
export const destroyStaff = (params) => ajax.post("/destroyStaff", params)

// 检测员工用户名或者手机号是否已经存在
export const checkIsExists = (params) => ajax.post("/checkIsExists", params)

// 文件上传token获取
export const getUploadToken = (params) => ajax.get("/getUploadToken", params);

// 删除图片
export const deleteFile = (params) => ajax.get("/deleteFile", params)