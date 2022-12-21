import Loading from "components/Loading";
import React from "react";
import { useSelector } from "umi";
import { selectLayout } from "utils/selectLayout";
import BaseLayout from "./BaseLayout";
import LoginLayout from "./LoginLayout";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN"

function Layout({ children, location }) {
    //   console.log(location);
    //   console.log(children);
    const loading = useSelector((state) => state.loading);
    // const data = useSelector(state => state)
    // console.log(data)
    // console.log(loading);
    const layoutMap = { BaseLayout, LoginLayout };
    const Container = layoutMap[selectLayout(location.pathname)];
    return (
        <ConfigProvider locale={zhCN}>
            <Container>
                <Loading isShow={loading.effects['user/login']} />
                {children}
            </Container>
        </ConfigProvider>
    );
}
export default Layout;
