import $http from "api"
import { message } from "antd"

const assessmentDetailData = {
    "6176a9908ac207f0e36d3225": {
        "_id": "6176a9908ac207f0e36d3225",
        "__v": 0,
        "assessmentScore": 50,
        "currentLevel": null,
        "date": "2021-10-15T14:44:52.515Z",
        "initLevel": null,
        "quarterly": 0,
        "result": "A",
        "staffName": null,
        "standardScore": 70
    },
    "617691463e6d438d18bebb95": {
        "_id": "617691463e6d438d18bebb95",
        "__v": 0,
        "assessmentScore": 112,
        "currentLevel": null,
        "date": "2021-10-02T11:13:01.771Z",
        "initLevel": null,
        "quarterly": 0,
        "result": "A",
        "staffName": null,
        "standardScore": 70
    },
    "617691063e6d438d18bebb70": {
        "_id": "617691063e6d438d18bebb70",
        "__v": 0,
        "assessmentScore": 23,
        "currentLevel": null,
        "date": "2021-10-21T11:11:51.993Z",
        "initLevel": null,
        "quarterly": 0,
        "result": "C",
        "staffName": null,
        "standardScore": 70
    },
    "617690133e6d438d18bebb4c": {
        "_id": "617690133e6d438d18bebb4c",
        "__v": 0,
        "assessmentScore": 123,
        "currentLevel": null,
        "date": "2021-10-08T11:07:48.175Z",
        "initLevel": null,
        "quarterly": 0,
        "result": "A",
        "staffName": null,
        "standardScore": 70
    },
    "61768ff43e6d438d18bebb28": {
        "_id": "61768ff43e6d438d18bebb28",
        "__v": 0,
        "assessmentScore": 11,
        "currentLevel": null,
        "date": "2021-10-01T11:07:21.339Z",
        "initLevel": null,
        "quarterly": 0,
        "result": "C",
        "staffName": null,
        "standardScore": 70
    },
    "61768fce3e6d438d18bebafe": {
        "_id": "61768fce3e6d438d18bebafe",
        "__v": 0,
        "assessmentScore": -1,
        "currentLevel": null,
        "date": "2021-10-09T11:06:44.821Z",
        "initLevel": null,
        "quarterly": 0,
        "result": "C",
        "staffName": null,
        "standardScore": 70
    },
    "61768f593e6d438d18bebadb": {
        "_id": "61768f593e6d438d18bebadb",
        "__v": 0,
        "assessmentScore": 12,
        "currentLevel": null,
        "date": "2021-10-02T11:04:51.431Z",
        "initLevel": null,
        "quarterly": 0,
        "result": "C",
        "staffName": null,
        "standardScore": 70
    },
    "61768ebc3e6d438d18beb88a": {
        "_id": "61768ebc3e6d438d18beb88a",
        "__v": 0,
        "assessmentScore": 11,
        "currentLevel": null,
        "date": "2021-10-01T11:02:11.690Z",
        "initLevel": null,
        "quarterly": 0,
        "result": "C",
        "staffName": null,
        "standardScore": 70
    },
    "616c1b25f22b8e63ac5a8e70": {
        "_id": "616c1b25f22b8e63ac5a8e70",
        "__v": 0,
        "assessmentScore": 1,
        "currentLevel": null,
        "date": "2021-10-19T12:46:21.786Z",
        "initLevel": null,
        "quarterly": 0,
        "result": "A",
        "staffName": null,
        "standardScore": 1
    },
    "6139d0401f41f920e5f6dd61": {
        "_id": "6139d0401f41f920e5f6dd61",
        "__v": 0,
        "assessmentScore": 41,
        "currentLevel": null,
        "date": "2021-10-07T00:00:00.000Z",
        "initLevel": null,
        "quarterly": 4,
        "result": "B",
        "staffName": null,
        "standardScore": 60
    }
}

export default {
    namespace: "assessment",
    state: {
        assessmentList: [],
        assessmentDetail: null,
        total: 0
    },
    reducers: {
        saveAssessment: (state, { payload }) => ({ ...state, ...payload }),
        saveAssessmentDetail: (state, { payload }) => ({ ...state, ...payload }),
    },
    effects: {
        *_initAssessmentList({ payload }, { call, put }) {
            const { data, total } = yield call($http.getAssessmentList, payload);
            yield put({
                type: "saveAssessment",
                payload: { assessmentList: data.list, total: total }
            })
        },
        *_initAssessmentDetail({ payload }, { call, put }) {
            const { code, data, msg } = yield call($http.getAssessmentDetail, payload)
            if (code) return message.error(msg);
            message.success(msg)
            yield put({
                type: "saveAssessmentDetail",
                payload: { assessmentDetail: data || assessmentDetailData[payload._id] }
            })
            yield put({
                type: "common/changeIsShowDetailDialog",
                payload: { isShowDetailDialog: true }
            })
        }
    }
}