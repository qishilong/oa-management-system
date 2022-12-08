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
        *_initStaffData(payload, { call, put }) {
            const { data: { staffList, staffTotal } } = yield call($http.getStaffList, payload);
            yield put({ type: "saveStaffList", payload: { staffList } });
            yield put({ type: "saveStaffTotal", payload: { staffTotal } });
        }
    }
}