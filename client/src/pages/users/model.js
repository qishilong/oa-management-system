import { message } from "antd";
import $http from "api";

export default {
    namespace: "user",
    state: {
        userInfo: sessionStorage.getItem("userProfile") ? JSON.parse(sessionStorage.getItem("userProfile")) : null
    },
    reducers: {
        updataUserProfile: (state, { payload }) => ({
            ...state, ...payload
        })
    },
    effects: {
        *login({ payload }, { call, put, select }) {
            const { data, msg } = yield call($http.userLogin, payload);
            if (!data) {
                message.error(msg)
                return;
            }
            sessionStorage.setItem("userProfile", JSON.stringify(data));
            // console.log(data, msg);
            yield put({
                type: "updataUserProfile",
                payload: { userInfo: data }
            })
            // todo 开始进行页面跳转
        }
    }
}