module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AssessmentSchema = new Schema({
    staffName: { type: Schema.Types.ObjectId, ref: 'users' }, // - 员工姓名
    date: { type: Date, required: true, default: Date.now }, // - 考核日期
    quarterly: { type: Number, required: true },  // - 考核日期对应季度
    result: { type: String, required: true },  // - 考核评分结果 ABC
    currentLevel: { type: Schema.Types.ObjectId, ref: 'levels' }, // - 当前需要对应的考核的等级
    initLevel: { type: Schema.Types.ObjectId, ref: 'levels' }, // - 没有修改之前的级别
    standardScore: { type: Number, required: true }, // -  对应职级分数
    assessmentScore: { type: Number, required: true }, // - 考核得分
  });

  return mongoose.model('assessments', AssessmentSchema);
};
