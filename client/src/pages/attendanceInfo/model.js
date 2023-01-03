import $http from "api"
import { message } from "antd"

const staticAttendanceDetailData = {
    "615fd80a2bf17448d02905b7": {
        "_id": "615fd80a2bf17448d02905b7",
        "__v": 0,
        "attendanceType": 1,
        "createTime": "2021-10-08T05:32:40.938Z",
        "staffName": null
    },
    "615fd7e8c3c6a348cadb66f0": {
        "_id": "615fd7e8c3c6a348cadb66f0",
        "__v": 0,
        "attendanceType": 2,
        "createTime": "2021-10-02T11:10:11.085Z",
        "staffName": null
    },
    "615fd7e22bf17448d02905b5": {
        "_id": "615fd7e22bf17448d02905b5",
        "__v": 0,
        "attendanceType": 1,
        "createTime": "2021-10-02T11:10:11.085Z",
        "staffName": null
    },
    "615fd7dec3c6a348cadb66ee": {
        "_id": "615fd7dec3c6a348cadb66ee",
        "__v": 0,
        "attendanceType": 4,
        "createTime": "2021-10-02T11:10:11.085Z",
        "staffName": null
    },
    "615fd7d72bf17448d02905b3": {
        "_id": "615fd7d72bf17448d02905b3",
        "__v": 0,
        "attendanceType": 4,
        "createTime": "2021-10-08T06:03:31.085Z",
        "staffName": null
    },
    "615fd7bfc3c6a348cadb66ec": {
        "_id": "615fd7bfc3c6a348cadb66ec",
        "__v": 0,
        "attendanceType": 4,
        "createTime": "2021-10-08T05:30:11.085Z",
        "staffName": null
    },
    "614164801dd5d02cbe0d640b": {
        "_id": "614164801dd5d02cbe0d640b",
        "__v": 0,
        "attendanceType": 3,
        "createTime": "2021-08-09T00:00:00.000Z",
        "staffName": null
    }
}

export default {
    namespace: "attendanceInfo",
    state: {
        attendanceList: [],
        attendanceDetail: null,
        total: 0
    },
    reducers: {
        saveAttendance: (state, { payload }) => ({ ...state, ...payload }),
        saveAttendanceDetail: (state, { payload }) => ({ ...state, ...payload }),
    },
    effects: {
        *_initAttendanceList({ payload }, { call, put }) {
            const { data } = yield call($http.getAttendanceList, payload);
            yield put({
                type: "saveAttendance",
                payload: { attendanceList: data.attendanceList, total: data.total }
            })
        },
        *_initAttendanceDetail({ payload }, { call, put }) {
            console.log(payload)
            const { code, data, msg } = yield call($http.getAttendanceDetail, payload)
            if (code) return message.error(msg);
            message.success(msg || "获取考勤详情成功")
            yield put({
                type: "saveAttendanceDetail",
                payload: { attendanceDetail: data || staticAttendanceDetailData[payload._id] }
            })
            yield put({
                type: "common/changeIsShowDetailDialog",
                payload: { isShowDetailDialog: true }
            })
        }
    }
}