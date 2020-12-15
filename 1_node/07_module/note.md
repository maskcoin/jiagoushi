## 模块化规范
- Node中的模块化规范 commonjs规范(node自己实现的)，es6Module（import export）

## commonjs规范（模块的概念）
- 可以把复杂的代码拆分成小的模块，方便管理代码和维护 
- 每个模块之间的内容是相互独立的，互不影响（解决变量冲突的问题）

## 规范的定义
- 每个文件都是一个模块
- 如果你希望模块中的变量被别人使用，可以使用module.exports = a
- 如果另一个模块想使用这个模块导出的结果 需要使用require()语法来引用（同步）

## 模块的分类
- require('fs')、内置模块 不是自己写的，也不是安装来的，是node自己提供的，在node的可执行文件中
- require('commander') 别人写的模块，通过npm install 安装过来的
- 自定义模块 require('./promise.js') 自定义模块就是自己写的模块 引用时需要增加路径（相对路径，绝对路径）

## 核心模块
- fs、path、vm（虚拟机模块 沙箱环境）