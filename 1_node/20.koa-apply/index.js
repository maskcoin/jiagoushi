const Koa = require('koa')
const app = new Koa()

const router = require('./routes/index')

var views = require('koa-views');

app.use(views(__dirname + '/views', { // await ctx.render()
    map: {
        html: 'ejs' // 内部会自动引入ejs模块
    }
}))


app.use(router())
// const router = new Router()

// router.get('/', async (ctx, next) => {
//     ctx.body = 'hello'
// })

// router.post('/add', async (ctx, next) => {
//     ctx.body = 'add'
// })

// 使用路由中间件 服务器只支持post 你发了一个get请求 405
app.listen(8080)