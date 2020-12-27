const Koa = require('koa')
// 调用next 表示执行下一个中间件
const app = new Koa()

const log = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('logger')
            resolve()
        }, 3000);
    })
}

// fn1() 1 fn2() 3 2 
// koa 中要求  每个next方法前面都必须增加await 否则不存在等待效果
app.use(async (ctx, next) => { //fn1
    console.log(1)
    await next()
    console.log(2)
    ctx.body = 'hello1'
})
app.use(async (ctx, next) => { //fn2
    console.log(3)
    await log()
    ctx.body = 'hello2'
    next()
    console.log(4)
})
app.use(async (ctx, next) => { //fn3
    console.log(5)
    ctx.body = 'hello3'
    next()
    console.log(6)
})

// koa的中间件原理 会将所有的中间件 组合成一个大的promise,当这个promise执行完毕后，会采用ctx.body进行结果的响应
// next前面必须有await，或者 return 否则执行顺序可能达不到预期
// 如果都是同步的，加不加await都无所谓，我不知道后续是否有异步逻辑，写的时候都要加await

// next() 1.可以把多个模块通过next方法来链接起来 2.可以决定是否向下执行(可以实现后台权限)
// 3.可以封装一些方法在中间件中，封装后向下执行

app.listen(3000)