import "./css/index.less";

import { useEffect } from "react";
import { useDispatch, useSelector } from "umi";

import OldStaffTable from "./components/OldStaffTable";
import StaffAmount from "./components/StaffAmount";

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
            {amountDataList?.map((item, index) => (
                <StaffAmount key={index} {...item} />
            ))}
            <OldStaffTable {...staffData} />
        </div>
    );
};

export default Dashboard;
