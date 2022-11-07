module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const departmentSchema = new Schema({
    departmentName: { type: String, required: true }, // - 部门名称
    remark: { type: String, required: false }, // - 备注
    children: [{ type: Schema.Types.ObjectId, ref: 'departments' }],  // - 子部门ID列表
    departmentLeader: { type: Schema.Types.ObjectId, ref: 'users' }, // -部门领导
    staffList: [{ type: Schema.Types.ObjectId, ref: 'users', default: [] }], //- 部门成员列表
    parentLists: { type: Array, required: false, default: [] },
  });
  return mongoose.model('departments', departmentSchema);
};
