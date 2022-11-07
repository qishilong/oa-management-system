import "./index.less";

import classnames from "classnames";
import React from "react";

const Loading = ({ isShow }) => {
    return (
        <div className={classnames("loader", "fullScreen", { hidden: !isShow })}>
            <div className="wrapper">
                <div className="inner"></div>
                <div className="text">Loading...</div>
            </div>
        </div >
    )
}

export default Loading
