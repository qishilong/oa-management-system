import { useState } from 'react'
import classnames from "classnames";
import iconMap from '../iconMap';
import "./index.less"
import { useDispatch } from "umi";


const SearchContainer = ({ render }) => {
    const [closeStatus, setCloseStatus] = useState(false)
    const dispatch = useDispatch();

    // 清除表单
    const clearForm = () => {
        dispatch({ type: "common/clearSearchForm", payload: { isClearForm: true } })
    }

    return (
        <div className={classnames("filter-wrapper", { close: closeStatus })}>
            <div className="filter-title-wrapper">
                <span>字段过滤</span>
                <span className='c-r' onClick={clearForm}>{iconMap.reload}</span>
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
