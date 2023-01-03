import { useState, useEffect } from 'react'
import { Upload, Modal } from "antd"
import $http from "api"

/**
 * 前端直传
 * 七牛云对象存储
 * token值
 */
const UploadComponent = ({ avatar = null, getNewAvatar }) => {
    const [token, setToken] = useState("");
    const [fileList, setFileLists] = useState([]);
    const [previewImg, setPreviewImg] = useState(null);
    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
        if (avatar) {
            setFileLists(prev => prev = [{ url: avatar }]);
            setPreviewImg(prev => prev = avatar)
        }
        _getToken()
    }, [])

    // console.log(fileList)

    // 获取Token
    const _getToken = async () => {
        const { data } = await $http.getUploadToken({
            bucket: 'oa-demo',
            uploadUrl: 'r3l03lzeo.hd-bkt.clouddn.com',
            accessKey: '8QQD0qX3ER_tMNfKMeYfueFECLJW1Zyg7zExska0', //- 公钥
            secretKey: 'T4fa8ULII7kOxqv9oCDRGhC3zb37vSKnXPtFYPQk', //- 私钥
        });
        setToken(prev => prev = data);
    }

    // 预览关闭图片
    const handlePreClose = () => setIsShowModal(false)

    // 预览打开图片
    const handlePreview = () => setIsShowModal(true)

    // 图片发生改变
    const handleChange = (info) => {
        setFileLists(prev => prev = info?.fileList);
        // console.log(info);
        if (info.file.status === "done") {
            setPreviewImg(prev => prev = ("//" + info.file.response.url));
            getNewAvatar("//" + info.file.response.url);
            if (previewImg || avatar) {
                _deletePreviewImg()
            }
        }
    }

    // 删除掉之前的图片
    const _deletePreviewImg = async () => {
        const res = await $http.deleteFile({
            bucket: 'oa-demo',
            fileName: previewImg ? previewImg : avatar,
            accessKey: '8QQD0qX3ER_tMNfKMeYfueFECLJW1Zyg7zExska0', //- 公钥
            secretKey: 'T4fa8ULII7kOxqv9oCDRGhC3zb37vSKnXPtFYPQk', //- 私钥
        })
    }

    /**
     * z0: 华东
     * z1: 华北
     */
    return (
        <>
            <Upload
                maxCount={1}
                action="https://up-z0.qiniup.com/"
                listType='picture-card'
                fileList={fileList}
                data={{ token }}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                选择图片
            </Upload>
            <Modal
                open={isShowModal}
                footer={null}
                closable={false}
                onCancel={handlePreClose}
            >
                <img src={previewImg} alt="" style={{ width: "100%" }} />
            </Modal>
        </>
    )
}

export default UploadComponent
