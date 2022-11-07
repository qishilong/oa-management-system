module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const salaryAdjustmentSchema = new Schema({
    reason: { type: String, required: true }, // - 调薪原因
    newSalary: { type: String, required: true }, // - 调薪后的薪资
    staffName: { type: Schema.Types.ObjectId, ref: 'users'},  // - 员工
    salaryType: { type: Number, required: true }, // - 类型
    startTime: { type: Date, required: true }, // - 开始时间
    remark: { type: String, required: false }, // - 备注
  });

  return mongoose.model('salaryAdjustments', salaryAdjustmentSchema);
};