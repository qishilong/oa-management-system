import "./index.less";

import classnames from "classnames";
import React from "react";

const Loading = ({ isShow, part = false }) => {

    const loadingStyle = part ? {
        position: "absolute",
        top: "50%",
        left: "50%",
        height: "100%",
        width: "100%",
        transform: 'translate(-50%, -50%)',
    } : {}

    return (
        <div
            style={{ ...loadingStyle }}
            className={classnames("loader", "fullScreen", { hidden: !isShow })}>
            <div className="wrapper">
                <div className="inner"></div>
                <div className="text">Loading...</div>
            </div>
        </div >
    )
}

export default Loading
