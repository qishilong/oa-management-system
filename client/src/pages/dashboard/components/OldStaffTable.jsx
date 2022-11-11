import React from "react";

const OldStaffTable = ({ title, renderList, styleData }) => {
    return (
        <div className="staff-amount-container" style={{ ...styleData }}>
            <div className="staff-amount_title">{title}</div>
            <div className="staff-amount_main">
                <div className="staff-header">
                    <div className="staff-list-title">姓名</div>
                    <div className="staff-list-title">部门</div>
                </div>
                <div className="staff-item-container">
                    {renderList?.map((item, index) => {
                        return (
                            <div className="staff-list-item" key={index}>
                                <span className="item">{item.userName}</span>
                                <span className="item">
                                    {item.department || (
                                        <span className="danger">
                                            未绑定部门
                                        </span>
                                    )}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OldStaffTable;
