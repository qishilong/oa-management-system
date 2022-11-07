const whitelist = ['/api/department', '/api/salaryAdjustment'];

module.exports = (msg) => async (ctx, next) => {
  if (ctx.request.method === 'GET' && whitelist.includes(ctx.request.url.split('?')[0])) {
    await next();
    return
  }
  if (!ctx.session.user) {
    ctx.body = `对不起，请先进行登录操作`
    return
  }
  if (!ctx.session.user.identity) {
    ctx.body = `对不起，您无权${typeof msg === 'string' ? msg : msg[ctx.request.method.toLowerCase()]}选项！`
    return
  }
  await next();
};
