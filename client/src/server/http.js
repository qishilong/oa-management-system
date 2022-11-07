import { message } from "antd";
import qs from "qs";
import { history } from "umi";

const fetch = require('dva').fetch;

// 创建响应处理函数
const handleResp = (resp) => {
    //- 当请求大于等于200 小于300 成功
    if (resp >= 200 && resp.status < 300) {
        return resp;
    }
    message.error(`网络请求错误, ${resp.status}`);
    throw new Error(resp.statusText);
};

// 判断本次请求是否成功
const judgeOkState = async (resp) => {
    const state = await resp.clone().json();
    if (state.code !== 0) {
        message.error(`${state.code}${state.msg}`);
        // 跳转到登陆页面
        history.push('/users/login');
        // 清空本地保存的数据
        sessionStorage.clear();
    }
    return resp;
};

// 错误处理函数
const handleError = (error) => {
    if (error instanceof TypeError) {
        message.error(`网络请求失败了! ${error}`);
    }
    return {
        code: 1,
        data: false,
    };
};

class Http {
    static async staticFetch(url = '', options = {}) {
        // 对 url 统一管理
        url = '/api' + url;
        const defaultOptions = {
            mode: 'cors', //- 支持跨域处理，以cors的形式进行跨域
            hearders: {
                Authorization: sessionStorage.get('token') || null,
            },
        };
        if (options.method === 'PUT' || options.method === 'POST') {
            defaultOptions.hearders['Contype-type'] =
                'application/json;charset=utf-8';
        }
        //- 合并options选项
        const newOptions = { ...options, ...defaultOptions };

        return fetch(url, newOptions)
            .then(handleResp)
            .then(judgeOkState)
            .then((resp) => {
                //- 获取响应头的token
                const token = resp.hearders.get('Authorization');
                token && sessionStorage.set('token', token); //- 获取token，并且存储到sessionStorage里面
                return resp.json();
            })
            .catch(handleError);
    }

    // 处理 post 请求
    post(url, params = {}, options = {}) {
        const newOptions = Object.assign({ method: 'POST' }, options);
        newOptions.body = JSON.stringify(params);
        return Http.staticFetch(url, newOptions);
    }
    // 处理 put 请求
    put(url, params = {}, options = {}) {
        const newOptions = Object.assign({ method: 'PUT' }, options);
        newOptions.body = JSON.stringify(params);
        return Http.staticFetch(url, newOptions);
    }
    // 处理get请求
    get(url, options = {}) {
        const newOptions = Object.assign({ method: 'GET' }, options);
        Object.keys(options) && (url += '?' + JSON.stringify(options));
        return Http.staticFetch(url, newOptions);
    }
    // 处理delete 请求
    del(url, options = {}) {
        const newOptions = Object.assign({ method: 'DELETE' }, options);
        Object.keys(options) && (url += '?' + JSON.stringify(options));
        return Http.staticFetch(url, newOptions);
    }
}

const resFun = new Http();
export default resFun;
