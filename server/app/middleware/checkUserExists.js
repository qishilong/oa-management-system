
module.exports = () => async (ctx, next) => {
  const { type, mobile } = ctx.request.query;
  ctx.validate(ctx.smCodeRule, ctx.request.query)
  if (type) {
    const user = await ctx.model.Staff.findOne({ mobile },{mobile:1})
    if (!user) {
      ctx.body =  '对不起，该手机号码没有绑定任何员工' 
    } else {
      ctx.session.user = user;
      await next();
    }
  } else {
    await next();
  }
};
