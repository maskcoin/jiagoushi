// 内置了 设置cookie的方法
const Koa = require('koa')
const Router = require('@koa/router')
const crypto = require('crypto')
const uuid = require('uuid')
const session = require('koa-session')
// console.log(crypto.createHmac('sha1', 'zfpx').update('visit=1001').digest('base64'))
const app = new Koa()

// iSzT223z6tOIcJ3iGW4cRJzugSE

let router = new Router()
app.keys = ['zfpx']

// 办卡的例子 给你一个固定的卡号
// const session = {}
const cardName = 'zf.sid' // 卡的名字，店铺名

app.use(session({}, app))

router.get('/visit', async (ctx, next) => {
    let visit = ctx.session.visit || 0
    visit++
    ctx.session.visit = visit
    ctx.body = `你是第${visit}次来访问我的`
})

// router.get('/visit', async (ctx, next) => {
//     let cardId = ctx.cookies.get(cardName)
//     if (cardId && session[cardId]) {
//         session[cardId].count--
//         ctx.body = `你有${session[cardId].count}次机会`
//     } else {
//         let cardId = uuid.v4()
//         session[cardId] = { count: 3 }
//         ctx.cookies.set(cardName, cardId, { maxAge: 3000 }) // redis 也可以设置存储的过期时间

//         ctx.body = `你有${session[cardId].count}次机会`
//     }
// })

// session是基于cookie的

app.use(router.routes())

app.listen(8080)