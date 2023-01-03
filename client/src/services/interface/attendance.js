import ajax from "../http.js";

// 获取考勤统计表格
export const getAttendanceTable = () => ajax.get("/getAttendanceTable")

// 获取考勤列表
export const getAttendanceList = (params = {}) => ajax.post("/getAttendance", params);

// - 获取考勤信息详情
export const getAttendanceDetail = ({ _id }) => ajax.get(`/getAttendanceDetail/${_id}`);

// 新增考勤记录
export const createAttendance = (params) => ajax.post("/createAttendance", params);

// 修改考前记录
export const updateAttendance = (params) => ajax.put("/updateAttendance", params);

// 删除指定考勤信息
export const deleteAttendance = (params) => ajax.post('/deleteAttendance', params);
