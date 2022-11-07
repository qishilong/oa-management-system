// 引入封装好的fetch方法
import ajax from "../http";

// 用户登录接口api
export const userLogin = (params) => ajax.post("./login", params)