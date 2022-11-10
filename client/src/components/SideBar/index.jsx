import logo from "common/images/logo.png";
import React from "react";
import { history, Link } from "umi";

import iconMap from "../iconMap";

const SideBar = ({ Sider, Menu, collapse }) => {
    const pathname = history.location.pathname;
    const route = sessionStorage.getItem("routeList")
        ? JSON.parse(sessionStorage.getItem("routeList"))
        : [];
    // console.log(route);
    // console.log(history);
    // console.log(pathname);

    /*
    const items = [
  { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
  { label: '菜单项二', key: 'item-2' },
  {
    label: '子菜单',
    key: 'submenu',
    children: [{ label: '子菜单项', key: 'submenu-item-1' }],
  },
];
return <Menu items={items} />;
*/

    const items = route?.map((item) => ({
        label: (
            <Link to={item.route}>
                <span>{item.zhName}</span>
            </Link>
        ),
        key: item._id,
        icon: iconMap[item.icon],
    }));

    return (
        <Sider theme="light" className="side-bar" collapsed={collapse}>
            <div className="brand">
                <div className="logo">
                    <img src={logo} alt="人事管理系统" />
                    {!collapse && <h1>人事管理系统</h1>}
                </div>
            </div>
            <div className="menu-container">
                <Menu items={items} mode="inline" />
                {/* <Menu mode="inline" selectedKeys={[pathname]}>
                    {route?.map((item) => {
                        return (
                            <Menu.Item key={item.route}>
                                <Link to={item.route}>
                                    {iconMap[item.icon]}
                                    <span>{item.zhName}</span>
                                </Link>
                            </Menu.Item>
                        );
                    })}
                </Menu> */}
            </div>
        </Sider>
    );
};

export default SideBar;
