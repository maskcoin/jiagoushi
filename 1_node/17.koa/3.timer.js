const Koa = require('./koa')
// 调用next 表示执行下一个中间件
const app = new Koa()
const fs = require('fs').promises

app.use(async (ctx, next) => {
    // ctx.body = fs.createReadStream('./3.timer1.js')
    ctx.body = await fs.readFile('./3.timer1.js')
})

// const log = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('logger')
//             resolve()
//         }, 3000);
//     })
// }

// app.use(async (ctx, next) => { //fn1
//     // 1
//     console.time('start')
//     console.log(1)
//     await next()
//     console.log(2)
//     // ctx.body = 'hello1'

//     // 2
//     console.timeEnd('start')
// })
// app.use(async (ctx, next) => { //fn2
//     console.log(3)
//     await next()
//     console.log(4)
// })
// app.use(async (ctx, next) => { //fn3
//     console.log(5)
//     await next()
//     console.log(6)
// })

app.listen(3000)