import { Button } from "antd";
import Loading from "components/Loading";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "umi";
import { selectLayout } from "utils/selectLayout";

import BaseLayout from "./BaseLayout";
import LoginLayout from "./LoginLayout";

function Layout({ children, history, location }) {
    //   console.log(location);
    //   console.log(children);
    const loading = useSelector((state) => state.loading);
    // const data = useSelector(state => state)
    // console.log(data)
    // console.log(loading);
    const layoutMap = { BaseLayout, LoginLayout };
    const Container = layoutMap[selectLayout(location.pathname)];
    return (
        <Container>
            <Loading isShow={loading.effects['user/login']} />
            {children}
        </Container>
    );
}
export default Layout;
