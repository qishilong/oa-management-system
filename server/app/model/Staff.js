module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  
  const staffSchema = new Schema({
    userName: { type: String, required: true }, // 真实姓名
    accountName: { type: String, required: true },
    identity: { type: Number, required: true, default: 0 },  // - 管理员 为 1  普通用户0
    password: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'departments' },
    level: { type: Schema.Types.ObjectId, ref: 'levels' },
    marriage: { type: Number, required: true },
    education: { type: Number, required: true }, // - 映射
    gender: { type: Number, required: true },
    onboardingTime: { type: Date, required: true },  // - 入职时间
    idNumber: { type: String, required: true },
    bankNumber: { type: String, required: true },
    mobile: { type: String, required: true },
    salary: { type: String, required: false },
    avatar: { type: String, required: false },
    hometown: { type: String, required: false }, //- 籍贯
    graduatedSchool: { type: String, required: false },
  });
  return mongoose.model('users', staffSchema);
};
