module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const LevelSchema = new Schema({
    levelName: { type: String, required: true }, // - 职级英文名称
    levelDescription: { type: String, required: true }, // - 职级中文名称
    assessmentRequire: { type: String, required: false, },  // - 考核要求
    interviewRequire: { type: String, required: false }, // - 面试要求
    baseNumber: { type: String, required: false }, // - 分红权限
    levelScore: { type: String, required: false },
  });

  return mongoose.model('levels', LevelSchema);
};
