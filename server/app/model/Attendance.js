/* 
* @考勤
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const attendanceSchema = new Schema({
    createTime: { type: Date, required: true, default: Date.now }, // - 考勤时间添加
    staffName: { type: Schema.Types.ObjectId, ref: 'users' }, // - 员工姓名
    attendanceType: { type: Number, required: true }, //- 考勤类型
  });

  return mongoose.model('attendances', attendanceSchema);
};
