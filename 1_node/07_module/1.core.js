const fs = require('fs').promises
const path = require('path')

// console.log(path.resolve(__dirname, './name.txt')) // resolve 不能遇到/
// console.log(path.join(__dirname, './name.txt', '/'))
// console.log(path.extname('a.min.js'))
// console.log(__dirname + '/name.txt')

// 所有的方法基本上都是同步方法、异步方法
// fs.readFile(path.resolve(__dirname, './name1.txt'), 'utf-8').then(data => console.log(data), err => console.log('路径错了' + err))

// 虚拟机模块（沙箱）测试用例
// 内部一般情况下操作的都是字符串逻辑，如何让一个字符串来运行 console.log(1)

// 模版引擎的实现原理 with语法 + 字符串拼接 + new Function()来实现的

const vm = require('vm') // 虚拟机模块 可以创建沙箱环境
vm.runInThisContext(`console.log(a)`)

