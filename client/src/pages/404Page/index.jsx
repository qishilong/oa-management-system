import notFound from "common/images/not_found.png";
import React from "react";

function NotFound() {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                justifyContent: "center",
            }}
        >
            <img src={notFound} alt="404 Not Found" />
        </div>
    );
}

export default NotFound;
