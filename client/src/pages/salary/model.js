import $http from "api"
import { message } from "antd"

const staticSalaryDetailData = {
    "6176b6188ac207f0e36d339a": {
        "_id": "6176b6188ac207f0e36d339a",
        "__v": 0,
        "newSalary": "11111",
        "reason": "11111",
        "salaryType": 2,
        "staffName": null,
        "startTime": "2021-10-08T13:50:08.798Z"
    },
    "6176b3538ac207f0e36d32f1": {
        "_id": "6176b3538ac207f0e36d32f1",
        "__v": 0,
        "newSalary": "22222",
        "reason": "2222",
        "salaryType": 2,
        "staffName": null,
        "startTime": "2021-10-09T13:38:20.427Z"
    },
    "6176b2028ac207f0e36d32c8": {
        "_id": "6176b2028ac207f0e36d32c8",
        "__v": 0,
        "newSalary": "10000",
        "reason": "转正",
        "salaryType": 1,
        "staffName": null,
        "startTime": "2021-10-14T13:32:34.822Z"
    },
    "6139bdadf79b5764a0382bcd": {
        "_id": "6139bdadf79b5764a0382bcd",
        "__v": 0,
        "newSalary": "12000",
        "reason": "转正22",
        "salaryType": 2,
        "staffName": null,
        "startTime": "2021-09-29T00:00:00.000Z"
    }
}
export default {
    namespace: "salary",
    state: {
        salaryList: [],
        salaryDetail: null,
        total: 0
    },
    reducers: {
        saveSalary: (state, { payload }) => ({ ...state, ...payload }),
        saveSalaryDetail: (state, { payload }) => ({ ...state, ...payload }),
    },
    effects: {
        *_initSalaryList({ payload }, { call, put }) {
            const { data, total } = yield call($http.getSalaryAdjustment, payload);
            yield put({
                type: "saveSalary",
                payload: { salaryList: data.list, total: data.total }
            })
        },
        *_initSalaryDetail({ payload }, { call, put }) {
            // console.log(payload)
            const { code, data, msg } = yield call($http.getSalaryDetail, payload)
            if (code) return message.error(msg);
            message.success(msg || "获取调薪详情成功")
            yield put({
                type: "saveSalaryDetail",
                payload: { salaryDetail: data || staticSalaryDetailData[payload._id] }
            })
            yield put({
                type: "common/changeIsShowDetailDialog",
                payload: { isShowDetailDialog: true }
            })
        }
    }
}