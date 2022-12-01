import $http from "api"

export default {
    namespace: "attendance",
    state: {
        chartList: [],
        tableList: []
    },
    reducers: {
        formatData(state, { payload }) {
            const formatData = {
                tableList: [
                    { title: "迟到详情", renderList: payload.lateTable },
                    { title: '早退详情', renderList: payload.earlyTable },
                ],
                chartList: [
                    { title: '迟到员工数量', renderList: payload.lateBI },
                    { title: '早退员工数量', renderList: payload.earlyBI },
                ],
            }
            return { ...state, ...formatData }
        }
    },
    effects: {
        *initAttendanceData({ }, { put, call }) {
            const { data, code } = yield call($http.getAttendanceTable)
            if (code) return;
            yield put({ type: "formatData", payload: data })
        }
    }
}