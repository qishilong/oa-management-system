import ajax from "../http"

// 获取奖惩记录列表
export const getRewardAndPunishmentList = (params) => ajax.get("/rewardAndPunishment", params)

// 获取奖惩记录详情
export const getRewardAndPunishmentDetail = (params) => {
    console.log(params)
    return ajax.get(`/rewardAndPunishment/${params._id}`)
}

// 新增奖惩记录
export const createRewardAndPunishment = (params) => ajax.post("/rewardAndPunishment", params)

// 更新奖惩记录
export const updateRewardAndPunishment = (params) => ajax.put(`/rewardAndPunishment/${params._id}`, params)

// 删除奖惩记录
export const deleteRewardAndPunishment = (params = {}) => ajax.post(`/deleteRewardAndPunishment/${params._id}`, params)