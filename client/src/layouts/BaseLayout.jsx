import "./BaseLayout.less";

import { Layout, Menu } from "antd";
import CommonHeader from "components/CommonHeader";
import SideBar from "components/SideBar";
import React, { useState } from "react";
import { history } from "umi";

import NotFound from "../pages/404Page";

const { Header, Sider, Content } = Layout;
const BaseLayout = ({ children }) => {
    const [collapse, setCollapse] = useState(false);
    const routeList = JSON.parse(sessionStorage.getItem("routeList"));
    const { pathname } = history.location;
    const judgeIsFound = () => {
        if (pathname === "/") {
            history.replace(routeList[0].route);
            return false;
        }
        return routeList.some((item) => item.route === pathname);
    };

    // 改变需要收起侧边栏
    const changeCollapse = () =>
        setCollapse((prevValue) => (prevValue = !collapse));

    return (
        <Layout className="container">
            <SideBar Sider={Sider} Menu={Menu} collapse={collapse} />
            <Layout>
                <CommonHeader
                    Header={Header}
                    collapse={collapse}
                    changeCollapse={changeCollapse}
                />
                <Content>{judgeIsFound() ? children : <NotFound />}</Content>
            </Layout>
        </Layout>
    );
};;

export default BaseLayout;
