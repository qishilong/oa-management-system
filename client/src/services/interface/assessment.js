import ajax from "../http.js";

export const getAssessmentList = (params) => ajax.post("/getAssessmentList", params);