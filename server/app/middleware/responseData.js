module.exports = () => async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.app.error.throw(404);
  }
  ctx.status = 200;
  ctx.body = Object.assign({
    code: 0,
    msg: typeof ctx.body === 'string' ?  ctx.body : '',
    data: null
  }, (typeof ctx.body === 'object' ?  ctx.body : {}))
};
