## npm node包管理器，管理的都是node的模块
- 3n nrm（node中源管理工具） nvm（node中的版本管理工具） npm（包管理工具）

## 第三方模块分为两种
- 全局模块（只能在命令行中使用 任何路径都可以）
- 本地模块（开发或者上线使用的）

## 包的初始化工作
```
npm init -y
```

## 全局模块的安装
```
npm install nrm -g
```

- nrm的使用`nrm ls` `nrm use taobao` `nrm current` 其实就是在操作配置文件

## 自己编写一个全局包
- computed 1 2 3 4

- 1.先创建bin的配置
- 2.#!/usr/local/bin/node 以什么方式运行
- 3.放到npm全局中（方案1:上传后下载 -g 方案2:直接临时拷贝过去 `npm link`）

## 局部安装npm包，或者叫项目包（分为2种，一种是开发时使用，一种是生产环境使用）
- npm install webpack (--save-dev || -D) 如果没有()中的其中一项，就表示生产环境使用
- 项目依赖 开发依赖（--save-dev || -D）同版本依赖 vue vue-template-compiler
- bootstrap jquery

## 版本问题
- major(破坏性更新).minor(增加功能 修订大版本中的功能).patch(小的bug)
- ^ ~ >= <= 
- ^2.0.0 不能小于2 不能超过3
- ～2.3.0 （限制中间版本，只要2.3的版本就行）
- >=
- <=
- 1.0.0-2.0.0

- alpha预览版(内部测试的版本) beta版本(公测版本) rc(最终测试版本) => 上线 `npm i xxx@2.1.0-beta.1`

## 运行脚本问题
- 默认运行npm run 时会将node_modules下的.bin目录放到全局下，所以可以使用.bin文件夹下的命令
- 第二种方式npx npx的原理跟npm run 的原理是一样的，另外npx可以去下载包，下载完毕后执行，执行后删除

