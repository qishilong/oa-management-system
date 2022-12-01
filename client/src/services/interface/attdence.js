import ajax from "../http.js";
export const getAttendanceTable = () => ajax.get("/getAttendanceTable")