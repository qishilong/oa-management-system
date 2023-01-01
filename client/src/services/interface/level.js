import ajax from "../http"

// 获取职级列表
export const getLevelList = (params) => ajax.post("/getLevel", params)

/**
 * 这个接口有问题，在正常传递Id值后，仍然会一直显示Id错误
 */
// 获取职级详情
export const getLevelDetail = (params) => ajax.get(`/getLevelDetail/${params._id}`)

// 更新职级信息
export const updateLevelDetail = (params) => ajax.put(`/updateLevel/${params._id}`, params)


// 新增职级
export const createLevel = (params) => ajax.post("/createLevel", params)

/**
 * 删除职级接口的描述文档有问题，这是真正生效的接口类型
 */
// 删除职级
// export const deleteLevel = (params) => ajax.del(`/destroyLevel/${params._id}`)
export const deleteLevel = (params) => ajax.post("/destroyLevel", params)
