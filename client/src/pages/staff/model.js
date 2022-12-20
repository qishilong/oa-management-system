import $http from "api"

export default {
    namespace: "staff",
    state: {
        staffList: [],
        staffTotal: 0,
        staffDetail: null
    },
    reducers: {
        saveStaffList: (state, { payload }) => ({ ...state, ...payload }),
        saveStaffTotal: (state, { payload }) => ({ ...state, ...payload }),
        saveStaffDetail: (state, { payload }) => ({ ...state, ...payload }),
    },
    effects: {
        // 获取员工数据
        *_initStaffData({ payload }, { call, put }) {
            const { data: { staffList, staffTotal } } = yield call($http.getStaffList, payload);
            yield put({ type: "saveStaffList", payload: { staffList } });
            yield put({ type: "saveStaffTotal", payload: { staffTotal } });
        },
        // 获取员工详情
        *_getStaffDetail({ payload }, { put, call }) {
            // console.log(1)
            console.log(payload)
            console.log($http.getStaffDetail)
            const { data, msg } = yield call($http.getStaffDetail, payload);
            yield put({ type: "saveStaffDetail", payload: { staffDetail: data } });
            yield put({
                type: "common/changeIsShowDetailDialog",
                payload: { isShowDetailDialog: true }
            })
        }
    }
}