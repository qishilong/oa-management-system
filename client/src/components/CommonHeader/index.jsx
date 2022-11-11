import { Avatar, Menu } from "antd";
import default_avatar from "common/images/default_avatar.png";
import React from "react";
import { history, useSelector } from "umi";

import iconMap from "../iconMap";

const CommonHeader = ({ Header, collapse, changeCollapse }) => {
    const { userInfo } = useSelector((state) => state.user);

    const signOutFn = () => {
        history.replace("/users/login");
        sessionStorage.clear();
        // window.location.href = "/users/login";
    };

    const subMenu = (
        <>
            <span
                style={{
                    padding: 0,
                    margin: 0,
                    position: "relative",
                    top: 4,
                }}
            >
                {userInfo?.userName || ""}
            </span>
            <Avatar
                style={{ marginLeft: 0 }}
                src={userInfo?.avatar || default_avatar}
            />
        </>
    );

    const items = [
        {
            label: subMenu,
            key: "SubMenu",
            children: [
                {
                    label: <span>退出</span>,
                    icon: iconMap.signOut,
                    key: "singOut",
                    onClick: () => signOutFn(),
                },
            ],
        },
    ];

    // console.log(userInfo);
    return (
        <Header className="header-wrapper">
            <div className="button" onClick={changeCollapse}>
                {collapse ? iconMap.rightArrow : iconMap.leftArrow}
            </div>
            <Menu items={items} mode="horizontal" />
        </Header>
    );
};;;;

export default CommonHeader;
