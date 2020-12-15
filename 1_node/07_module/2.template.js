// 实现自定义的模板引擎

// const ejs = require('ejs') //第三方模块
const path = require('path')
// ejs.renderFile(path.resolve(__dirname, './template.html'), { name: 'zf', age: 11, arr: [1, 2, 3] }, (err, data) => {
//     console.log(data)
// })
const fs = require('fs')
const renderFile = (filePath, obj, cb) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return cb(err, data)
        }
        // arguments[0] 就是匹配到的原字符串 arguments[1] 就是第一个()
        data = data.replace(/\{\{([^}]+)\}\}/g, function () {
            let key = arguments[1].trim()
            return '${' + key + '}'
        })
        // cb(err, data)
        // console.log(data)
        let head = `let str = '';\r\n with(obj){`
        head += 'str +=`'
        data = data.replace(/\{%([^%]+)%\}/g, function () {
            return '\r\n`\r\n' + arguments[1] + '\r\nstr+=`\r\n'
        })
        let tail = '`}\r\n return str;'
        console.log(head + data + tail)
        // let fn = new Function('obj', head + data + tail)

        // console.log(f.toString())
        // data = f.toString()
        // console.log(head + data + tail)
        // cb(err, fn(obj))
        // fn(obj)
    })
}

renderFile(path.resolve(__dirname, './my-template.html'), { name: 'zf', age: 11, arr: [1, 2, 3] }, (err, data) => {
    console.log(data)
})


