const FormData = require('form-data');
const fs = require('fs');
const https = require('https');
const args = process.argv.splice(2)
let [SESSDATA, csrf, ...images] = args

if (SESSDATA.startsWith('token=')) {
  SESSDATA = SESSDATA.replace('token=', '')
} else {
  console.log('请在命令尾部输入一个空格，再输入token=你的SESSDATA, 例如\n ...-macos token=xx csrf=xx ')
  return
}

if (csrf.startsWith('csrf=')) {
  csrf = csrf.replace('csrf=', '')
} else {
  console.log('请在命令尾部输入一个空格，再输入csrf=你的bili_jct, 例如\n ...-macos token=xx csrf=xx ')
  return
}

images.forEach((imgPath, index)=> {
  const form = new FormData();
  const fileStream = fs.createReadStream(imgPath);
  fileStream.on('error', (err) => {
    console.error(`打开文件失败: ${imgPath}, ${err.message}`);
    return;
  });
  form.append('file', fileStream);//图片文件的key
  form.append('bucket', 'openplatform');
  form.append('csrf', csrf);

  const headers = form.getHeaders();
  headers.Cookie = `SESSDATA=${SESSDATA}`;

  const request = https.request({
    method: 'post',
    host: 'api.bilibili.com',
    path: '/x/upload/web/image',
    headers: headers
  },function(res){
    let str='';
    res.on('data',function(buffer){
        str+=buffer;//用字符串拼接
      }
    );
    res.on('end',()=>{
      const result = JSON.parse(str);
      const { message: msg, data } = result;
      if (data?.location) {
        if (index === 1) {
          console.log('Upload Success:');
        }
        const url = data.location.replace('http', 'https')
        console.log(url);
      } else if (msg === '请先登录') {
        console.log('token过期了，请及时更新命令行中的token');
      } else {
        console.log('发生未知错误，请查看最新仓库，错误信息：' + msg)
      }
    });
  });
  form.pipe(request);
})
