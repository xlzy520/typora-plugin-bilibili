# typora-plugin-bilibili
哔哩哔哩图片上传, Typora插件，实现图片粘贴即可上传到哔哩哔哩，并替换链接

### 使用
1. 获取`nodejs`的路径，Mac下使用`which node`
```bash
$ which node
/Users/xxx/.nvm/versions/node/v14.16.0/bin/node
```

2. 替换`upload.sh`中的`node`路径
3. 获取`index.js`的绝对路径，替换`upload.sh`中的`indexjsPath`路径
4. 获取SESSDATA并替换`index.js`中的`Cookie`
   
   登录哔哩哔哩→F12打开控制台→Application→Cookies→SESSDATA
5. `npm i`或者`yarn`或者`pnpm i`

### 演示
