const Koa = require('koa')
const app = new Koa()
const bodyParser = require('./koa-bodyparser')

app.use(bodyParser()) // 这是使用中间件(函数)的方式

app.use(async (ctx, next) => {
    // 当路径是 /login get
    // ctx 包含了 request response / req res
    if (ctx.path === '/login' && ctx.method === 'GET') {
        ctx.body = `
        <form action='/login' method='post'>
            用户名 <input type='text' name='username'><br/>
            密码 <input type='text' name='password'/>
            <button>提交</button>
        </form>
    `
    } else {
        return next()
        // 后续代码就不执行了，一般情况没有后续逻辑 直接return 即可
    }
})

// koa中不能使用回调的方式来实现，因为async函数执行时不会等待回调完成 
// 1.koa中所有的异步都必须包装成promise，只有promise才会有等待效果
// 2.必须所有的next方法前 需要有 await或者return 否则没有等待效果
app.use(async (ctx, next) => {
    if (ctx.path === '/login' && ctx.method === 'POST') {
        ctx.body = ctx.request.body
        // 我希望等待这两个方法执行完毕再继续
        // await new Promise((resolve, reject) => {
        //     const bufs = []
        //     ctx.req.on('data', (chunk) => { // 处理结果是异步的
        //         bufs.push(chunk)
        //     })
        //     ctx.req.on('end', () => {
        //         let result = Buffer.concat(bufs).toString()
        //         console.log(result)
        //         ctx.body = result
        //         resolve()
        //     })
        // })
    } else {
        await next()
    }
})
app.listen(3000)