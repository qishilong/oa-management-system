import $http from "api"
import { message } from "antd"

export default {
    namespace: "department",
    state: {
        departmentList: [],
        departmentDetail: null,
        showModalDialog: false,
        // 保存指定部门id
        departmentId: null
    },
    reducers: {
        // 保存部门列表
        savaDepartmentList: (state, { payload }) => ({ ...state, ...payload }),
        // 保存部门详情信息
        savaDepartmentDetail: (state, { payload }) => ({ ...state, ...payload }),
        savaShowModalDialog: (state, { payload }) => ({ ...state, ...payload }),
        savaDepartmentId: (state, { payload }) => ({ ...state, ...payload })
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
            yield put({
                type: "savaShowModalDialog",
                payload: { showModalDialog: true }
            }),
                yield put({
                    type: "savaDepartmentId",
                    payload: { departmentId: payload }
                })
        },
        // 新增部门
        *_addDepartment({ payload }, { call, put }) {
            const { code, msg } = yield call($http.addDepartment, payload);
            if (code) return message.error(msg);
            message.success(msg);
            yield put({
                type: "_initDepartmentList",
                payload: {}
            })
        },
        // 修改部门信息
        *_updateDepartmentDetail({ payload }, { call, put }) {
            const { code, msg } = yield call($http.updateDepartment, payload);
            if (code) return message.error(msg);
            message.success(msg);
            yield put({
                type: "_initDepartmentList",
                payload: {}
            })
            yield put({
                type: "_getDepartmentDetail",
                payload: { _id: payload._id }
            })
        },
        // 删除指定部门
        *_deleteDepartment({ payload }, { call, put }) {
            const { code, msg } = yield call($http.deleteDepartment, payload);
            if (code) return message.error(msg);
            message.success(msg);
            yield put({
                type: "_initDepartmentList",
                payload: {}
            })
        }
    }
}