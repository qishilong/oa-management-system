import $http from "api"

export default {
    namespace: "staff",
    state: {
        staffList: [],
        staffTotal: 0,
        // staffDetail: null
        // 因为数据问题，在进行$http.getStaffDetail请求时，会导致服务器内部错误，所以先暂时不发送请求，将数据固定
        staffDetail: {    // 当前登录用户为管理员或普通员工查看自己的详细信息是返回的内容
            "identity": 0,// 身份权限
            "level": [ // 职级
                "T6"
            ],
            "_id": "6135d3594adb8f10159468e9",
            "userName": "安安",// 真实姓名
            "accountName": "demo1",// 用户名
            "department": "技术部",// 部门
            "marriage": 1,// 婚姻状况
            "education": 3,// 学历
            "gender": 1,//性别
            "job": 2,// 职务
            "onboardingTime": "2021-09-04T02:44:48.476Z",// 创建时间
            "idNumber": "211302199505112819",
            "bankNumber": "63170525987771222",//银行卡
            "mobile": "13000000002",// 手机号
            "salary": "10000",//薪资
            "graduatedSchool": "清华大学",//毕业院校
            "__v": 0,
            "hometown": "山西太原"// 家乡
        }
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
            // console.log(payload)
            // console.log($http.getStaffDetail)

            // 因为数据问题，在进行$http.getStaffDetail请求时，会导致服务器内部错误，所以先暂时不发送请求，将数据固定
            // const { data, msg } = yield call($http.getStaffDetail, payload);
            // console.log(data, msg, 1111)
            // yield put({ type: "saveStaffDetail", payload: { staffDetail: data || {} } });
            yield put({
                type: "common/changeIsShowDetailDialog",
                payload: { isShowDetailDialog: true }
            })
        }
    }
}