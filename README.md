# typora-plugin-bilibili
哔哩哔哩图片上传, Typora插件，实现图片粘贴即可上传到哔哩哔哩，并替换链接

### 项目地址(求颗Star呀)
[typora-plugin-bilibili](https://github.com/xlzy520/typora-plugin-bilibili)

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
6. 配置Typora，打开Typora设置，选择图像Tab,填入

```bash
# 后面的是shell脚本的路径
/bin/bash /Users/xxx/Documents/webstormProjects/typora-plugin-bilibili/upload.sh
```


![](http://i0.hdslb.com/bfs/album/1ae61c12ffc4a0ec9e67d4c7b173280902e4216c.png)




### 演示图片
http://i0.hdslb.com/bfs/album/34bc7b5a1bd591a1b682fec4593345e4a9e3bfe9.png
![http://i0.hdslb.com/bfs/album/34bc7b5a1bd591a1b682fec4593345e4a9e3bfe9.png](http://i0.hdslb.com/bfs/album/34bc7b5a1bd591a1b682fec4593345e4a9e3bfe9.png)

### 相似推荐
[哔哩哔哩图床-Chrome插件](https://github.com/xlzy520/bilibili-img-uploader) 提供粘贴图片上传到哔哩哔哩，并进行记录管理
