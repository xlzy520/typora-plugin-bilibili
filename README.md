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
4. 获取SESSDATA并替换`index.js`中第`16`行的`Cookie`，**我预设的Cookie是删减过的，是不能用的，需要换成你自己的**
   
   登录哔哩哔哩→F12打开控制台→Application→Cookies→SESSDATA
5. `npm i`或者`yarn`或者`pnpm i`
6. 配置Typora，打开Typora设置，选择图像Tab，填入

```bash
# 后面的是shell脚本的路径
/bin/bash /Users/xxx/Documents/webstormProjects/typora-plugin-bilibili/upload.sh
```


![](https://i0.hdslb.com/bfs/album/1ae61c12ffc4a0ec9e67d4c7b173280902e4216c.png)

### 自定义图床
如果想要上传到其他的图床或者接口，可以直接修改index.js里面的逻辑，代码挺简单的

### 演示

https://user-images.githubusercontent.com/28336270/118472778-d3d77b80-b73b-11eb-951a-7efb1e5bf15f.mov


http://i0.hdslb.com/bfs/album/34bc7b5a1bd591a1b682fec4593345e4a9e3bfe9.png
![http://i0.hdslb.com/bfs/album/34bc7b5a1bd591a1b682fec4593345e4a9e3bfe9.png](http://i0.hdslb.com/bfs/album/34bc7b5a1bd591a1b682fec4593345e4a9e3bfe9.png)

### 图片参数
格式：(图像原链接)@(\d+[whsepqoc]_?)*(\.(|webp|gif|png|jpg|jpeg))?$
- w:[1, 9223372036854775807] (width，图像宽度)
- h:[1, 9223372036854775807] (height，图像高度)
- s:[1, 9223372036854775807] (作用未知)
- e:[0,2] (resize，0:保留比例取其小，1:保留比例取其大，2:不保留原比例，不与c混用)
- p:[1,1000] (默认100，放大倍数，不与c混用)
- q:[1,100] (quality，默认75，图像质量)
- o:[0,1] (作用未知)
- c:[0,1] (clip，0:默认，1:裁剪)
- webp,png,jpeg,gif(不加则保留原格式)
- 不区分大小写，相同的参数后面覆盖前面
- 计算后的实际w*h不能大于原w*h，否则wh参数失效


### 相似推荐
[哔哩哔哩图床-Chrome插件](https://github.com/xlzy520/bilibili-img-uploader) 提供粘贴图片上传到哔哩哔哩，并进行记录管理
