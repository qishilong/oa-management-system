import $http from "api"
import { message } from "antd"

let levelDetailData = {
    "6175ce3a11484a9c90b9c9e4": {
        "_id": "6175ce3a11484a9c90b9c9e4",
        "__v": 0,
        "assessmentRequire": "A1",
        "baseNumber": "80",
        "interviewRequire": "B2",
        "levelDescription": "工程师",
        "levelName": "T3-2",
        "levelScore": "70"
    },
    "6175ce0858ebe778d4a6896c": {
        "_id": "6175ce0858ebe778d4a6896c",
        "__v": 0,
        "assessmentRequire": "A1",
        "baseNumber": "80",
        "interviewRequire": "B2",
        "levelDescription": "工程师",
        "levelName": "T3-1",
        "levelScore": "70"
    },
    "6175ccb27dac8aa440b81c36": {
        "_id": "6175ccb27dac8aa440b81c36",
        "__v": 0,
        "assessmentRequire": "A1",
        "baseNumber": "80",
        "interviewRequire": "B2",
        "levelDescription": "工程师",
        "levelName": "T9",
        "levelScore": "70"
    },
    "6175cc5771891735942086f5": {
        "_id": "6175cc5771891735942086f5",
        "__v": 0,
        "assessmentRequire": "A1",
        "baseNumber": "80",
        "interviewRequire": "B2",
        "levelDescription": "工程师",
        "levelName": "T6",
        "levelScore": "70"
    },
    "6175cb37337302094059af92": {
        "_id": "6175cb37337302094059af92",
        "__v": 0,
        "assessmentRequire": "A1",
        "baseNumber": "80",
        "interviewRequire": "B2",
        "levelDescription": "工程师1",
        "levelName": "T3",
        "levelScore": "70"
    },
    "6175cb18337302094059af8b": {
        "_id": "6175cb18337302094059af8b",
        "__v": 0,
        "assessmentRequire": "A3",
        "baseNumber": "80",
        "interviewRequire": "B2",
        "levelDescription": "祖先",
        "levelName": "T8",
        "levelScore": "70"
    },
    "6175cb00337302094059af87": {
        "_id": "6175cb00337302094059af87",
        "__v": 0,
        "assessmentRequire": "A1",
        "baseNumber": "80",
        "interviewRequire": "B2",
        "levelDescription": "工程师",
        "levelName": "T9",
        "levelScore": "69"
    },
    "6141e181d66ccd522ca32d0d": {
        "_id": "6141e181d66ccd522ca32d0d",
        "__v": 0,
        "assessmentRequire": "2S",
        "baseNumber": "160",
        "interviewRequire": "2S2A",
        "levelDescription": "资深研究员",
        "levelName": "T6-2",
        "levelScore": "80"
    },
    "6141e15ed66ccd522ca32d0b": {
        "_id": "6141e15ed66ccd522ca32d0b",
        "__v": 0,
        "assessmentRequire": "2S",
        "baseNumber": "160",
        "interviewRequire": "2S2A",
        "levelDescription": "资深研究员",
        "levelName": "T6-2",
        "levelScore": "80"
    },
    "6139764f7a20aedf77b83621": {
        "_id": "6139764f7a20aedf77b83621",
        "__v": 0,
        "assessmentRequire": "2S",
        "baseNumber": "160",
        "interviewRequire": "2S2A",
        "levelDescription": "资深专家",
        "levelName": "T6-1",
        "levelScore": "70.0"
    },
    "6139761c7a20aedf77b8361f": {
        "_id": "6139761c7a20aedf77b8361f",
        "__v": 0,
        "assessmentRequire": "1A",
        "baseNumber": "20",
        "interviewRequire": "2A",
        "levelDescription": "初级专员",
        "levelName": "T2-3",
        "levelScore": "60"
    },
    "613975be73b76ede854025aa": {
        "_id": "613975be73b76ede854025aa",
        "__v": 0,
        "assessmentRequire": "1A",
        "baseNumber": "60",
        "interviewRequire": "3A",
        "levelDescription": "学徒",
        "levelName": "T1-4",
        "levelScore": "90"
    }
}
export default {
    namespace: "level",
    state: {
        // 职级列表
        levelList: [],
        /**
         * 因为访问职级详情接口有问题，所以暂时用假数据代替
         */
        // 职级详情
        levelDetail: null,
        // 列表总数
        total: 0
    },
    reducers: {
        savaLevel: (state, { payload }) => ({ ...state, ...payload }),
        savaLevelDetail: (state, { payload }) => ({ ...state, ...payload }),
    },
    effects: {
        // 初始化职级列表
        *_initLevelList({ payload }, { put, call }) {
            const { data } = yield call($http.getLevelList, payload)
            // console.log(data, 222)
            yield put({
                type: "savaLevel",
                payload: { levelList: data.list, total: data.total }
            })
        },
        // 获取职级详情
        *_initLevelDetail({ payload }, { put, call }) {
            const { code, data, msg } = yield call($http.getLevelDetail, payload)
            if (code) return message.error(msg || "获取职级详情失败");
            message.success(msg || "获取职级详情成功")
            yield put({
                type: "savaLevelDetail",
                payload: { levelDetail: data || levelDetailData[payload._id] }
            })
            yield put({
                type: "common/changeIsShowDetailDialog",
                payload: { isShowDetailDialog: true }
            })
        }
    }
}