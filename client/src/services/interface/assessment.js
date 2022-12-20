import ajax from "../http.js";

export const getAssessmentList = (params) => {
    // console.log(1)
    // console.log(params)
    return ajax.post("/getAssessmentList", params)
};