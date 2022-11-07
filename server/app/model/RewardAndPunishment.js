module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const rewardAndPunishmentSchema = new Schema({
    recordDesc: { type: String, required: true }, // - 奖惩名称描述
    type: { type: Number, required: true }, // - 奖惩类型
    date: { type: Date, required: true, default: Date.now },  // - 添加记录时间
    staffName: { type: Schema.Types.ObjectId, ref: 'users' }, // - 员工姓名
    reason: { type: String, required: true }, // - 奖惩理由
    file: { type: String, required: false }, // - 附件列表
  });

  return mongoose.model('rewardAndPunishments', rewardAndPunishmentSchema);
};
