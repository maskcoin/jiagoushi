const Koa = require('koa')
const static = require('koa-static')
const app = new Koa()
const bodyParser = require('./koa-bodyparser')
const path = require('path')

app.use(bodyParser(path.join(__dirname, 'upload'))) // 这是使用中间件(函数)的方式
app.use(static(path.resolve(__dirname, 'public')))
app.use(async (ctx, next) => {
    if (ctx.path === '/login' && ctx.method === 'POST') {
        ctx.body = ctx.request.body
    }
})

app.listen(3000)