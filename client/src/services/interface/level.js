import ajax from "../http"

// 获取职级列表
export const getLevelList = (params) => ajax.get("/getLevel", params)