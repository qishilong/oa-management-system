import React from 'react'
import { Popover } from "antd"
import "./index.less"

const DropPopover = () => {
    return (
        <Popover
            placement='bottomRight'
            title="搜索"
            content="气泡弹窗"
            trigger="click"
        >
            <span className='add-icon'>+</span>
        </Popover>
    )
}

export default DropPopover
