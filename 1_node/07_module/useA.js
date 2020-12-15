// let r = require('./a')
// console.log(this);

// ((function (exports, require, module, __filename, __dirname) {
//     let a = 1
//     module.exports = a
//     return module.exports
// })()





// 1.掌握node中如何实现代码调试
// node inspect useA.js
// 1.可以在浏览器中进行调试（调试某些模块可以使用这种方式 ）
// 2.直接使用vscode自带的调试方式
// 3.在控制台调试

// 分析node源码
// 1.会默认调用 require语法
// 2.Module.prototype.require 模块的原型上有require方法
// 3.Module._load 调用模块的加载方法 最终返回的是module.exports
// 4.Module._resolveFilename 解析文件名 将文件名变成绝对路径 默认尝试添加 .js / .json /.node
// 5.Module._cache[filename] 会判断是否有缓存
// 6.创建模块 new Module(filename, parent) this.id = id; this.exports = {};
// 7.把模块缓存起来，方便下次使用

// ----------------- 根据文件名（绝对路径）创建一个模块

// 8.加载模块 module.load(filename);
// 9.module.paths 第三方模块查找的路径
// 10.获取当前模块的扩展名 Module._extensions[extension](this, filename) 根据扩展名调用对应的函数 策略模式
// 11.获取文件的内容 fs.readFileSync(filename, 'utf8')
// 12.调用module._compile(content, filename) 方法
// 13.将用户的内容包裹到一个函数中 '(function (exports, require, module, __filename, __dirname) { }'
const path = require('path')
const fs = require('fs')
const vm = require('vm')

function Module(id) {
    this.id = id
    this.exports = {}
}

Module.wrap = function (script) {
    let arr = ['(function (exports, require, module, __filename, __dirname) {', script, '\r\n})']
    return arr.join('')
}

Module._extensions = {
    '.js': function (module) {
        let content = fs.readFileSync(module.id, 'utf-8')
        let fnStr = Module.wrap(content)
        let fn = vm.runInThisContext(fnStr)
        let exports = module.exports
        let require = myRequire
        let __filename = module.id
        let __dirname = path.dirname(__filename)
        // console.log(fn.toString())
        fn.call(exports, exports, require, module, __filename, __dirname)
    }, '.json': function (module) {
        let content = fs.readFileSync(module.id, 'utf-8')
        module.exports = JSON.parse(content)
    }
}

Module._resolveFilename = function (filepath) {
    let filePath = path.resolve(__dirname, filepath)
    let exists = fs.existsSync(filePath)
    if (exists) {
        return filePath
    }

    // 尝试添加后缀
    let keys = Object.keys(Module._extensions)
    for (let i = 0; i < keys.length; i++) {
        let currentPath = filePath + keys[i];
        if (fs.existsSync(currentPath)) { // 尝试添加后缀查找
            return currentPath
        }
    }

    throw new Error('模块不存在')
}

Module.prototype.load = function (filename) {
    // 获取文件的后缀来进行加载
    let extname = path.extname(filename)
    Module._extensions[extname](this) //根据对应的后缀名进行加载
}


Module.cache = {}
Module._load = function (filepath) {
    let filename = Module._resolveFilename(filepath)

    // 获取路径后不要立即创建模块，先看一下是否已经加载过了
    if (Module.cache[filename]) {
        return Module.cache[filename].exports
    }

    let module = new Module(filename)
    Module.cache[filename] = module
    module.load(filename)
    return module.exports
}

function myRequire(filepath) {
    return Module._load(filepath)
}

let r = myRequire('./a')
r = myRequire('./a')
console.log(r)

// 1.require语法是同步的，fs.readFileSync
// 2.最终require语法返回的是module.exports
// 3.模块的exports和module.exports引用的是同一个变量
// 4.更改exports的引用，不会导致module.exports变化
