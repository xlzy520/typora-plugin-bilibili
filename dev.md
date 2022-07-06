# 开发文档

### Go
#### 开发环境
搭建`Go`的开发环境，这里不赘述。我使用`vscode`开发`Go`
#### 打包构建
```bash
go build main.go # Mac用这条

GOOS=windows GOARCH=amd64 go build main.go # Windows用这条
```


### NodeJS

>你可以在这一步把哔哩哔哩换成其他的上传接口

1. 第一步肯定是先把项目拉下来，`git clone`
2. 项目内进行`npm i`或`yarn`或`pnpm i`
   ```bash
   npm i pkg -g # 全局安装pkg打包
   ```
3. 执行`npm run pkg`即可打包，之后就是拿到绝对路径去配置typora了

   **重点：打包的时候会遇到fetch node太慢的问题，[解决办法](#解决下载node慢)**


### 自定义图床

如果想要上传到其他的图床或者接口，可以直接修改index.js里面的逻辑，代码挺简单的


### 解决下载node慢

1. 打包的时候会遇到fetch node太慢的问题，解决办法就是先把依赖下载好，
    - [Windows node](https://gitee.com/xlzy520/typora-plugin-bilibili/attach_files/729610/download/fetched-v14.17.0-win-x64)
    - [Mac node](https://gitee.com/xlzy520/typora-plugin-bilibili/attach_files/729611/download/fetched-v14.17.0-macos-x64)

2. 放到指定的文件夹即可
    - Windows：C:\Users\xxx\.pkg-cache\3.1\
    - Mac: ~\.pkg-cache\3.1\
      ![image-20210608205418773](http://i0.hdslb.com/bfs/album/697f8e5458eaf631f300588aa257ace1ef8cad12.png)

