import $http from "api"
import { message } from "antd"

const staticRewardAndPunishmentDetailData = {

    "613a2819579d4b622f637e3b": {
        "_id": "613a2819579d4b622f637e3b",
        "__v": 0,
        "date": "2021-09-16T13:12:27.632Z",
        "file": "https://tva1.sinaimg.cn/large/008i3skNly1guaslrcs7nj60wi0kywfy02.jpg",
        "reason": "工作失误",
        "recordDesc": "第一条惩罚",
        "staffName": null,
        "type": 4
    }

}

export default {
    namespace: "rewardAndPunishment",
    state: {
        rewardAndPunishmentList: [],
        rewardAndPunishmentDetail: null,
        total: 0
    },
    reducers: {
        saveRewardAndPunishment: (state, { payload }) => ({ ...state, ...payload }),
        saveRewardAndPunishmentDetail: (state, { payload }) => ({ ...state, ...payload }),
    },
    effects: {
        *_initRewardAndPunishmentList({ payload }, { call, put }) {
            const { data, total } = yield call($http.getRewardAndPunishmentList, payload);
            yield put({
                type: "saveRewardAndPunishment",
                payload: { rewardAndPunishmentList: data.list, total: data.total }
            })
        },
        *_initRewardAndPunishmentDetail({ payload }, { call, put }) {
            // console.log(payload)
            const { code, data, msg } = yield call($http.getRewardAndPunishmentDetail, payload)
            if (code) return message.error(msg);
            message.success(msg || "获取奖惩详情成功")
            yield put({
                type: "saveRewardAndPunishmentDetail",
                payload: { rewardAndPunishmentDetail: data || staticRewardAndPunishmentDetailData[payload._id] }
            })
            yield put({
                type: "common/changeIsShowDetailDialog",
                payload: { isShowDetailDialog: true }
            })
        }
    }
}