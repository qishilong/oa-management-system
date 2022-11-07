const jwt = require('jsonwebtoken');

module.exports = () => async (ctx, next) => {
  try {
    const auth = ctx.headers.authorization;
    const user = jwt.verify(auth, ctx.app.config.keys);
    // ctx.session.user = user
  } catch (e) {
    ctx.logger.error(e);
    ctx.app.error.throw(401);
  }
  await next();
};