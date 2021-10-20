// console.log('https://i0.hdslb.com/bfs/album/d8fd43a41bd32b22addbb966036c582d1296298f.jpg');
// console.log('https://i0.hdslb.com/bfs/album/d8fd43a41bd32b22addbb966036c582d1296298f.jpg');

const args = process.argv.splice(2)
const FormData = require('form-data');
const fs = require('fs');
const http = require('http');

let SESSDATA = args.splice(0, 1)[0]
if (SESSDATA.startsWith('token=')) {
  SESSDATA = SESSDATA.replace('token=', '')
} else {
  console.log('请在命令尾部输入一个空格，再输入token=你的SESSDATA, 例如\n ...-macos token=xx')
  return
}

args.forEach((imgPath, index)=> {
  const form = new FormData();
  form.append('file_up', fs.createReadStream(imgPath));//图片文件的key
  form.append('category', 'daily');
  form.append('biz', 'draw');

  const headers = form.getHeaders();
  headers.Cookie = `SESSDATA=${SESSDATA}`;

  const request = http.request({
    method: 'post',
    host: 'api.vc.bilibili.com',
    path: '/api/v1/drawImage/upload',
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
      if (msg === 'success') {
        if (index === args.length) {
          console.log('Upload Success:');
        }
        const url = data.image_url.replace('http', 'https')
        console.log(url);
      } else if (msg === '请先登录') {
        console.log('token过期了，请及时更新命令行中的token');
      } else {
        console.log(msg)
      }
    });
  });
  form.pipe(request);
})


