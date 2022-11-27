import "./css/index.less";

import { useEffect } from "react";
import { useDispatch, useSelector } from "umi";

import OldStaffTable from "./components/OldStaffTable";
import StaffAmount from "./components/StaffAmount";
import AgeColumn from "./components/AgeColumn";
import Column from "./components/Column";
import Pie from "./components/Pie";

const Dashboard = () => {
    const dispatch = useDispatch();
    const {
        amountDataList,
        staffData,
        pieList,
        marriageData,
        constellationData,
        columnList,
    } = useSelector((state) => state.dashboard);
    // console.log(
    //     amountDataList,
    //     staffData,
    //     pieList,
    //     marriageData,
    //     constellationData,
    //     columnList,
    // );

    useEffect(() => {
        dispatch({ type: "dashboard/analyzeStaff" });
    }, []);

    return (
        <div className="dashboard-container">
            {/* 员工展示组件 执行四次 */}
            {amountDataList.map((item, index) => (
                <StaffAmount key={index} {...item} />
            ))}

            {/* 最老的十个员工 */}
            <OldStaffTable {...staffData} />

            {/* 饼状图处理 学历情况，员工性别 */}
            {pieList.map((item, index) => (
                <Pie {...item} key={index} />
            ))}

            {/* 员工婚姻状况 */}
            <Pie {...marriageData} />

            {/* 星座分布 */}
            <Pie {...constellationData} />

            {/* 年龄柱状图 */}
            {pieList[1] && <AgeColumn {...pieList[1]} />}

            {columnList.map((item, index) => (
                <Column key={index} {...item} />
            ))}

        </div>
    );
};

export default Dashboard;
