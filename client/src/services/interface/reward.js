import ajax from "../http.js";

// 获取奖惩记录信息表
export const getRewardAndPunishment = (params) => ajax.get("/rewardAndPunishment", params)