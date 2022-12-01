import React from "react";
import ViolationChart from "./components/ViolationChart";
import ViolationTable from "./components/ViolationTable";
import "./css/index.less"
import { useSelector, useDispatch } from "umi";
import { useEffect } from "react";

const Attendance = () => {
    const dispatch = useDispatch();
    const { chartList, tableList } = useSelector(state => state.attendance)
    const { userInfo } = useSelector(state => state.user)

    // 初始化数据
    useEffect(() => {
        dispatch({ type: "attendance/initAttendanceData" })
    }, [])

    return (
        <div className="attendance-container">
            {userInfo.identity === 1 && (
                <div className="list-container">
                    {chartList.map((item, index) => <ViolationChart {...item} key={index} />)}
                </div>
            )}
            <div
                className="list-container"
                style={{ width: userInfo.identity === 1 ? "49.8%" : "100%" }}
            >
                {tableList.map((item, index) => <ViolationTable {...item} key={index} />)}
            </div>
        </div>
    )
}

export default Attendance;
