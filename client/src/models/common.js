import $http from "api";

export default {
    namespace: "common",
    state: {
        collapse: false,
        isShowDetailDialog: false
    },
    reducers: {
        changeCollapse: (state, { payload }) => ({ ...state, ...payload }),
        changeIsShowDetailDialog: (state, { payload }) => ({ ...state, ...payload })
    },
    effects: {
        *queryLoginStatus({ payload }, { put, call }) {
            const {
                history,
                history: {
                    location,
                    location: { pathname },
                },
            } = payload;
            function* checkIsLogin() {
                const { code } = yield call($http.checkLoginState);
                if (code !== 0) {
                    history.replace("/users/login");
                    sessionStorage.clear();
                }
                // if (code !== 0) return;
            }
            if (
                pathname === "/users/login" &&
                pathname === "/users/forgetPassword"
            ) {
                if (
                    !sessionStorage.getItem("token") ||
                    !sessionStorage.getItem("userProfile") ||
                    !sessionStorage.getItem("routeList")
                ) {
                    history.replace("/users/login");
                } else {
                    // 用户满足条件，进行登录信息的检测
                    yield* checkIsLogin();
                    const { data: routeList } = yield call($http.getRouteList);
                    sessionStorage.setItem("routeList", JSON.stringify(routeList || []));
                }
            } else if (
                sessionStorage.getItem("token") &&
                sessionStorage.getItem("userProfile") &&
                sessionStorage.getItem("routeList")
            ) {
                yield* checkIsLogin();
            } else {
                // 不需要拦截
                sessionStorage.clear();
            }
        },
    },
    subscriptions: {
        setup({ history, dispatch }) {
            // 用于检测用户是否登录，在 app.start() 时执行
            dispatch({ type: "queryLoginStatus", payload: { history } });
        },
    },
};
