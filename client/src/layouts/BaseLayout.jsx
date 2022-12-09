import "./BaseLayout.less";

import { Layout, Menu } from "antd";
import CommonHeader from "components/CommonHeader";
import SideBar from "components/SideBar";
import React, { useState } from "react";
import { history, useSelector, useDispatch } from "umi";
import Loading from "../components/Loading";
import NotFound from "../pages/404Page";
import "common/css/main.less"

const { Header, Sider, Content } = Layout;
const BaseLayout = ({ children }) => {
    // const [collapse, setCollapse] = useState(false);
    const { collapse } = useSelector(state => state.common)
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch();
    const routeList = JSON.parse(sessionStorage.getItem("routeList"));
    const { pathname } = history.location;
    // console.log(loading)

    // 定义一个当前界面的判断函数，第一判断当前界面是不是根域下，直接跳转到路由对象的首页面，如果说当前访问的界面没有在路由表内部，直接跳转到404界面
    const judgeIsFound = () => {
        if (pathname === "/") {
            // 路由表根据权限返回，返回路由表的第一项内容
            routeList
                ? history.replace(routeList[0].route)
                : history.replace("/users/login");
            return false;
        }
        return (
            routeList?.some((item) => item.route === pathname) ||
            history.replace("/users/login")
        );
    };

    // 改变需要收起侧边栏
    const changeCollapse = () => dispatch({ type: "common/changeCollapse", payload: { collapse: !collapse } })

    return (
        <Layout className="container">
            <SideBar Sider={Sider} Menu={Menu} collapse={collapse} />
            <Layout>
                <CommonHeader
                    Header={Header}
                    collapse={collapse}
                    changeCollapse={changeCollapse}
                />
                <Content className="main-content">
                    {judgeIsFound() ? (
                        <>
                            <Loading
                                part={true}
                                isShow={
                                    loading.effects["dashboard/analyzeStaff"] ||
                                    loading.effects["attendance/initAttendanceData"]
                                }
                            />
                            {children}
                        </>
                    ) : <NotFound />}
                </Content>
            </Layout>
        </Layout>
    );
};;

export default BaseLayout;
