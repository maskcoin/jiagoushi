const express = require('express')
const app = express()

// 中间件的特点，可以决定是否向下执行，可以扩展属性和方法，可以权限校验，中间件的放置位置在路由之前

// 路径为/ 表示任何路径都能匹配到
// 如果以这个路径（匹配开头一段路径）也可以匹配到
// 和路由的路径完全一样，也可以匹配到
// 中间件不匹配get,post等方法
app.use('/', (req, res, next) => { // 路径参数默认为/
    console.log(1)
    // 执行某一步出错了，统一规定 调用next传递的参数就是错误的信息
    next('出错了')
})
app.use('/', (req, res, next) => { // 路径参数默认为/
    console.log(2)
    next()
})
app.use('/', (req, res, next) => { // 路径参数默认为/
    console.log(3)
    next()
})

app.get('/', (req, res, next) => {
    res.end('ok')
})

// app.use((err, req, res, next) => { // 错误处理中间件，里面必须要有4个参数（取函数的长度）
//     res.end(err)
// })

app.listen(8080)