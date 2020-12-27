// Koa 对http的一个封装，实现了一个node框架 => 根据这个框架去实现自己的mvc框架

// 每个人用koa的方式都不大一样 无法做到约定性 => egg 基于koa封装的约定性的框架

// koa
// lib
// application.js   创建应用
// context.js   上下文
// request.js   request koa中自己实现的request对象
// response.js  response koa中自己实现的response对象

const Koa = require('./koa/lib/application')
const app = new Koa()

// app.use((ctx, next) => {
//     ctx.body = 'hello koa'
// })
// 1.实现基本的逻辑
// 2.ctx是什么东西？
app.use((ctx) => {
    // ctx中整合了 request response req和res
    // koa自己实现的request response
    // http源生的req和res
    // console.log(ctx.req.url)
    // console.log(ctx.request.req.url)

    // -------------------------------------
    // console.log(ctx.request.path)
    // console.log(ctx.request.url)
    // console.log(ctx.url) // ctx.__proto__.__proto__ = 
    // console.log(ctx.path)
    // console.log(ctx.request.query)
    // console.log(ctx.query)
    ctx.body = 'hello' // 给响应写入一个结果
    // throw new Error('eee')
    console.log(ctx.response.body)
})

app.on('error', (err) => {
    console.log('111')
    console.log(err)
})

app.listen(3000)

// listen use on('error', (err)=>{})