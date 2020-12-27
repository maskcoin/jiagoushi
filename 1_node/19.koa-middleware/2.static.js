const Koa = require('koa')
const app = new Koa()
const bodyParser = require('./koa-bodyparser')
const static = require('./koa-static')
const path = require('path')

// 中间件可以决定是否向下执行，如果自己可以处理，那么直接处理完毕结束，如果自己处理不了，next方法会继续向下执行

app.use(bodyParser())
app.use(static(__dirname)) // 看你是希望先匹配静态服务，还是匹配你的路由
app.use(static(path.resolve(__dirname, 'public')))
app.use(async (ctx, next) => {
    if (ctx.path === '/login' && ctx.method === 'GET') {
        ctx.body = `
        <form action='/login' method='post'>
            用户名 <input type='text' name='username'><br/>
            密码 <input type='text' name='password'/>
            <button>提交</button>
        </form>
    `
    } else {
        await next()
    }
})
app.use(async (ctx, next) => {
    if (ctx.path === '/login' && ctx.method === 'POST') {
        ctx.body = ctx.request.body
    } else {
        await next()
    }
})
app.listen(3000)