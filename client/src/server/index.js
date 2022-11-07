//- webpack 的require.context 方法 提取模块内容
const requierApi = require.context(".", true, /.js$/);

const module = {}

requierApi.keys().forEach((key) => {
    if (key === './index.js' || key === "./http.js") return;
    Object.assign(module, requierApi(key))
})

export default module;