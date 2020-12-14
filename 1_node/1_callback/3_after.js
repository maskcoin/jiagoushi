// 多个异步请求 如何同时获取最终结果
let fs = require('fs')
let school = {}

// let index = 0
// const cb = () => {
//     if (++index === 2) {
//         console.log(school)
//     }
// }

function after(times, callback) {
    return () => { // 闭包函数 函数的定义作用域和函数执行的作用域 不在同一个作用域下
        if (--times === 0) {
            callback()
        }
    }
}

let cb = after(2, () => {
    console.log(school)
})

fs.readFile('./name.txt', 'utf8', (err, data) => {
    school.name = data
    cb()
})

fs.readFile('./age.txt', 'utf8', (err, data) => {
    school.age = data
    cb()
})
