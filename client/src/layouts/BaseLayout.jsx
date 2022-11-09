import "./BaseLayout.less";

import { Layout, Menu } from "antd";
import SideBar from "components/SideBar";
import React from "react";

const { Header, Sider, Content } = Layout;
const BaseLayout = ({ children }) => {
    return (
        <Layout className="container">
            <SideBar Sider={Sider} Menu={Menu} />
            <Layout>
                <Header>Header</Header>
                <Content>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default BaseLayout;
