// console.log('https://i0.hdslb.com/bfs/album/d8fd43a41bd32b22addbb966036c582d1296298f.jpg');
// console.log('https://i0.hdslb.com/bfs/album/d8fd43a41bd32b22addbb966036c582d1296298f.jpg');

const args = process.argv.splice(2)
const FormData = require('form-data');
const fs = require('fs');
const http = require('http');

args.forEach((imgPath, index)=> {
  const form = new FormData();
  form.append('file_up', fs.createReadStream(imgPath));//图片文件的key
  form.append('category', 'daily');
  form.append('biz', 'draw');

  const headers = form.getHeaders();
  headers.Cookie = 'SESSDATA=ef0ecf6e%2C1634699903%2Cf006a*41';

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
      if (result.message === 'success') {
        if (index === args.length) {
          console.log('Upload Success:');
        }
        console.log(result.data.image_url);
      }
    });
  });
  form.pipe(request);
})


