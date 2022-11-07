'use strict';
const jwt = require('jsonwebtoken');
const Controller = require('egg').Controller;

class UserLoginController extends Controller {
  // - 用户登录
  async userLogin () {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate(ctx.loginRule)
    const result = await ctx.service.userHandler.findUser(body)
    // - 生成token
    if (typeof result === 'object') {
      const remember = +ctx.request.body.remember || 1;
      const maxAge = remember * 24 * 3600;
      const token = jwt.sign(result, ctx.app.config.keys, { expiresIn: maxAge });
      ctx.set('authorization', token);
      ctx.session.user = result;  // - 登录之后进行用户挂载
    }
    ctx.body = typeof result === 'string' ? result : { data: result, msg: "登录成功" }
  }

  //- 检测用户登录状态
  async queryLoginStatus () {
    const { ctx } = this;
    ctx.body = { msg: 'success', data: null }
  }

  //- 获取用户登录权限
  async getRouteList () {
    const { ctx } = this;
    ctx.body = await ctx.service.userHandler.getRouteList();
  }


  // -发送验证码
  async getCode () {
    const { ctx } = this;
    ctx.body = await ctx.service.userHandler.getCode()
  }

  // - 用户密码重置-检测验证码第一步
  async checkSmCode () {
    const { ctx } = this;
    const { smCode } = ctx.request.query;
    ctx.validate({ smCode: { type: 'string', required: true } }, ctx.request.query)
    ctx.body = await ctx.service.userHandler.checkSmCode(smCode)
  }

  // - 用户密码重置-输入新的登录密码
  async resetPassword () {
    const { ctx } = this;
    const { newPassword } = ctx.request.body;
    ctx.validate({ newPassword: { type: 'password', required: true } })
    ctx.body = await ctx.service.userHandler.updateUser(newPassword);
  }

  // - 文件上传的token获取
  async getUploadToken () {
    const { ctx } = this;
    const { bucket, uploadUrl, accessKey, secretKey} = ctx.request.query;
    ctx.body = await ctx.service.userHandler.getUploadToken(bucket, uploadUrl, accessKey, secretKey);
  }

  // -  删除图片处理
  async deleteFile () {
    const { ctx } = this;
    const { bucket, fileName, accessKey, secretKey } = ctx.request.body;
    ctx.body = await ctx.service.userHandler.deleteFile(bucket, fileName, accessKey, secretKey);
  }

}

module.exports = UserLoginController;
