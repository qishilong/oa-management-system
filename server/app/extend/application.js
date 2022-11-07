
/* 配置后端七牛上传文件 */
/* const config = new QiNiu.conf.Config();
config.zone = QiNiu.zone.Zone_z0;
const formUploader = new QiNiu.form_up.FormUploader(config);
let putExtra = new QiNiu.form_up.PutExtra();

//- 后端进行文件上传
const upload = (key, localFile, bucket, uploadUrl) => {
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken(bucket, uploadUrl), key, localFile, putExtra, function (respErr,
      respBody, respInfo) {
      if (respErr) {
        reject(respErr);
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody);
      }
    });
  })
} */

// - 错误处理
class ConsultError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
  static throw (code = 500, message = '') {
    throw new ConsultError(code, message);
  }
}
exports.error = ConsultError;
