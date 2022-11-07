'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcryptjs');
// - 七牛文件上传
const QiNiu = require("qiniu");




class UserService extends Service {
  // - 用户登录
  async findUser (body) {
    const { ctx, ctx: { model } } = this
    const typeArr = { 0: 'accountName', 1: 'mobile' }
    const result = await model.Staff.findOne({ [typeArr[body.type]]: body[typeArr[body.type]] })

    const returnData = result && {
      accountName: result.accountName,
      avatar: result.avatar,
      userName: result.userName,
      _id: result._id,
      identity: result.identity,
      department: result.department
    }

    switch (true) {
      case !result:
        return "该用户不存在"
      case body.type === 0:  //- 账户名登录
        const bool = await bcrypt.compare(body.password, result.password)
        return !bool ? "密码错误" : returnData;
      case body.type === 1: // - 手机号码登录
        return body.code !== ctx.session.smCode ? "验证码错误" : returnData;
    }
  }

  // - 路由表获取
  async getRouteList () {
    const { ctx, ctx: { model } } = this
    const queryData = ctx.session.user.identity === 1 ? {} : { identity: 0 };
    const result = await model.RouteList.find(queryData, { identity: 0 });
    return { data: result || [] }
  }

  // - 验证码发送(中间件会进行用户的查询)
  async getCode () {
    const { ctx } = this;
    const { mobile } = ctx.request.query
    const tempTime = Date.now();
    (typeof ctx.session.time === 'undefined') && (ctx.session.time = 0)
    if (tempTime - ctx.session.time > 30000) {
      ctx.session.smCode = await ctx.helper.sendCode(mobile);
      ctx.session.time = tempTime;
      ctx.session.mobile = mobile;
      return { msg: '验证码发送成功，请注意查收', data: ctx.session.smCode }
      // return '验证码发送成功，请注意查收'
    } else {
      return '验证码还在有效期内,30秒后进行重新获取操作'
    }
  }

  // - 检测用户验证码
  async checkSmCode (frontEndCode) {
    const { ctx } = this;
    return frontEndCode != ctx.session.smCode ? '请输入正确的验证码' : ctx.session.checkStatus = true && { msg: '验证码检测正确', data: true }
  }

  // - 重置用户密码
  async updateUser (password) {
    const { ctx, ctx: { model, helper } } = this;
    if (!ctx.session.checkStatus) return '请输入正确的验证码'

    password = await helper.generatePassword(password)
    await model.Staff.findOneAndUpdate({
      mobile: ctx.session.mobile
    }, { $set: { password } }, { new: true, upsert: true });

    ctx.session.checkStatus = false;
    ctx.session.user = null;
    ctx.session.mobile = null;
    return { msg: "修改密码成功，请重新登录", data: true }
  }

  // - 七牛文件上传token获取
  async getUploadToken (bucket, uploadUrl, accessKey, secretKey) {
    //- 替换成自己的key值
    const mac = new QiNiu.auth.digest.Mac(accessKey, secretKey);
    const config = new QiNiu.conf.Config();
    config.zone = QiNiu.zone.Zone_z0;

    const options = {
      scope: bucket,
      expires: 3600 * 24 * 366, //- 七牛token的过期时间为一年
      // returnBody: `{"url":"https://${uploadUrl}.hyfarsight.com/$(key)","code":0}`, //- 当七牛上传成功之后 你的返回值
      returnBody: `{"url":"${uploadUrl}/$(key)","code":0}`, //- 当七牛上传成功之后 你的返回值
      callbackBodyType: 'application/json'
    };
    const putPolicy = new QiNiu.rs.PutPolicy(options);
    return { msg: '', data: putPolicy.uploadToken(mac) }
  }

  // - 删除指定上传文件
  async deleteFile (bucket, fileName, accessKey, secretKey) {
    let key = fileName.substr(fileName.lastIndexOf('/') + 1);
    const mac = new QiNiu.auth.digest.Mac(accessKey, secretKey);
    const config = new QiNiu.conf.Config();
    config.zone = QiNiu.zone.Zone_z0;
    /* 每次的上传实例化之后进行对象的销毁 */
    let bucketManager = new QiNiu.rs.BucketManager(mac, config);
    return new Promise(resolve => {
      bucketManager.delete(bucket, key, function (err, respBody, respInfo) {
        resolve(err ? '删除失败' : '删除成功')
      })
    })
  }
}
module.exports = UserService;