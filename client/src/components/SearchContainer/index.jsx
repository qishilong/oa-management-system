import { useState } from 'react'
import classnames from "classnames";
import iconMap from '../iconMap';
import "./index.less"


const SearchContainer = ({ render, closeStatus, setCloseStatus }) => {

    // 清除字段
    const clearFields = () => {
        console.log("清除字段")
    }

    return (
        <div className={classnames("filter-wrapper", { close: closeStatus })}>
            <div className="filter-title-wrapper">
                <span>字段过滤</span>
                <span className='c-r' onClick={clearFields}>{iconMap.reload}</span>
            </div>
            <div className={classnames('filter-form-wrapper', { opacity: closeStatus })}>
                {render()}
            </div>
            <div className="close-tip" onClick={() => setCloseStatus(!closeStatus)}>
                {closeStatus ? iconMap.right : iconMap.left}
            </div>
        </div>
    )
}

export default SearchContainer
