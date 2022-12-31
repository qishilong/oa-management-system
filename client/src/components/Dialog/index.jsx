import React from 'react'
import { Modal } from 'antd'

const Dialog = ({
    title,
    dialogStatus,
    render,
    setDialogStatus,
    width = 600,
    className = ""
}) => {
    // console.log(dialogStatus)
    return (
        <Modal
            title={title}
            width={width}
            destroyOnClose={true}
            centered={true}
            open={dialogStatus}
            footer={null}
            className={className}
            onCancel={() => setDialogStatus(prev => prev = false)}
        >
            {render()}
        </Modal>
    )
}

export default Dialog
