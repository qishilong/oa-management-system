import $http from "api";

export default {
    namespace: "dashboard",
    state: {
        amountDataList: [],
        staffData: {},
        pieList: [],
        columnList: [],
        marriageData: {},
        constellationData: {},
    },
    reducers: {
        formData(state, { payload }) {
            const { data } = payload;
            const filterData = {
                amountDataList: [
                    {
                        title: "总人数",
                        renderList: data.total,
                        styleData: { width: "100%", height: "170px" },
                    },
                    {
                        title: "入职1年内员工",
                        renderList: data.onboardingTimeData.one,
                        styleData: { width: "33%", height: "170px" },
                    },
                    {
                        title: "入职1-2年内员工",
                        renderList: data.onboardingTimeData.two,
                        styleData: { width: "33%", height: "170px" },
                    },
                    {
                        title: "入职3年以上员工",
                        renderList: data.onboardingTimeData.three,
                        styleData: { width: "33%", height: "170px" },
                    },
                ],
                pieList: [
                    {
                        title: "学历情况",
                        renderList: data.educationList,
                        styleData: { width: "49.8%", height: "350px" },
                    },
                    {
                        title: "员工性别占比",
                        renderList: data.genderList,
                        styleData: { width: "49.8%", height: "350px" },
                        showSidebar: true,
                    },
                ],
                columnList: [
                    {
                        title: "员工年龄段",
                        renderList: data.ageMap,
                        styleData: { width: "49.8%", height: "350px" },
                    },
                    {
                        title: "部门员工数量",
                        renderList: data.departmentList,
                        styleData: { width: "49.8%", height: "350px" },
                        br: true
                    },
                ],
                marriageData: {
                    title: "员工婚姻状况",
                    renderList: data.marriageList,
                    styleData: { width: "49.8%", height: "350px" },
                    isEmpty: true
                },
                staffData: {
                    title: "工龄最老的10个人",
                    renderList: data.wordingYearsMaps,
                    styleData: { width: "49.8%", height: "350px" },
                },
                constellationData: {
                    title: "员工星座分布",
                    renderList: data.constellationList,
                    styleData: { width: "49.8%", height: "350px" },
                    isArea: true
                },
            };
            return { ...state, ...filterData };
        },
    },
    effects: {
        *analyzeStaff({ }, { call, put }) {
            const { data } = yield call($http.analyzeStaff);
            yield put({ type: "formData", payload: { data } });
        },
    },
};
