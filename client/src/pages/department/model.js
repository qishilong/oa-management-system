import $http from "api"

export default {
    namespace: "department",
    state: {
        departmentList: [],
        departmentDetail: null
    },
    reducers: {
        // 保存部门列表
        savaDepartmentList: (state, { payload }) => ({ ...state, ...payload }),
        // 保存部门详情信息
        savaDepartmentDetail: (state, { payload }) => ({ ...state, ...payload })
    },
    effects: {
        // 获取部门列表
        *_initDepartmentList({ payload }, { put, call }) {
            const { data } = yield call($http.getDepartmentList, payload);
            yield put({
                type: "savaDepartmentList",
                payload: { departmentList: data.list }
            })
        },
        // 获取部门详情
        *_getDepartmentDetail({ payload }, { put, call }) {
            const { data } = yield call($http.getDepartmentDetail, payload);
            yield put({
                type: "savaDepartmentDetail",
                payload: { departmentDetail: data }
            })
        }
    }
}