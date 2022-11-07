module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const routeSchema = new Schema({
    identity: { type: Number, required: true },
    icon: { type: String, required: true },
    zhName: { type: String, required: true },  // - 管理员 为 1  普通用户0
    route: { type: String, required: true },
  });
  return mongoose.model('routers', routeSchema);
};
