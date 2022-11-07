/* eslint valid-jsdoc: "off" */

'use strict';
const I18n = require('i18n');

I18n.configure({
  locales: ['zh-CN'],
  defaultLocale: 'zh-CN',
  directory: __dirname + '/locale',
});

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1630633260352_7639';

  // add your middleware config here
  config.middleware = ['responseData'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.validate = {
    translate () {
      const args = Array.prototype.slice.call(arguments);
      return I18n.__.apply(I18n, args);
    },
  };

  // config.cors = {
  //   origin: "http://localhost:3000", //允许哪些域名可以进行接口访问.也可以使用*
  //   credentials: true, //允许cookie可以跨域.对应的axios的withCredentials:true。而且orgin为指定地址。
  //   allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
  // };

  config.security = {
    csrf: false,
  };

  // 自定义错误处理
  const constErrorMsg = {
    401: '未登录，或登录已过期',
    404: '服务器没有对应的资源',
    500: '服务器内部错误',
    406: '验证错误',
    // 422: '参数有误',
  };
  config.onerror = {
    errorPageUrl: '/public/error.html',
    all (err, ctx) {
      // 设置正确的code值
      let code = +err.code || ctx.status;
      let msg = constErrorMsg[code] || err.errors[0].message || err.message;
      // 设置正确的msg值
      ctx.set('content-type', 'application/json');
      ctx.status = 200;
      if (code === 500) {
        msg = constErrorMsg[code];
      }

      ctx.body = JSON.stringify({
        code,
        msg,
        data: null,
      });
    },
  };

  // const isProduction = process.env.NODE_ENV === 'production';
  config.mongoose = {
    url: 'mongodb://123.56.119.225:26030/person_admin', // user是collection(数据库)名称
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: 'hg9558@126.com_person_admin',
      pass: 'hangang9558'
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};
