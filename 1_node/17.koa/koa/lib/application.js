const EventEmitter = require('events')
const http = require('http')
const Stream = require('stream')
const context = require('./context')
const request = require('./request')
const response = require('./response')
class Application extends EventEmitter {
    constructor() {
        super()
        this.response = Object.create(response)
        this.request = Object.create(request)
        this.context = Object.create(context)
        this.middlewares = [] // 存储用户所有的callback
    }

    use(callback) { // 将用户传递的callback 全部组合起来
        this.middlewares.push(callback)
    }

    createContext(req, res) {
        // 每次请求都创建全新的上下文
        let request = Object.create(this.request)
        let response = Object.create(this.response)
        let context = Object.create(this.context)

        context.request = request
        context.response = response
        context.request.req = context.req = req
        context.response.res = context.res = res

        return context
    }

    compose(ctx) {
        // 从数组中取出第一个先执行，第一个执行后执行第二个
        const dispatch = i => {
            if (i === this.middlewares.length) {
                return Promise.resolve()
            }
            let middleware = this.middlewares[i]

            // await middleware(ctx, () => dispatch(i + 1))

            return Promise.resolve(middleware(ctx, () => dispatch(i + 1))) // next 方法指代的是这个箭头函数
        }

        return dispatch(0)
    }

    handleRequest(req, res) {
        let ctx = this.createContext(req, res)
        this.compose(ctx).then(() => {
            let body = ctx.body // 当组合后的promise完成后，拿到最终的结果，响应回去
            if (typeof body === 'string' || Buffer.isBuffer(body)) {
                res.end(body)
            } else if (body instanceof Stream) {
                res.setHeader('Content-Disposition', `attachment;filename=${encodeURIComponent('wo下载')}`)
                body.pipe(res)
            } else if (typeof body === 'object') {
                res.end(JSON.stringify(body))
            }
        }).catch(err => {
            console.log(err)
            res.end('my not found')
        })
    }

    listen(...args) {
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
}

module.exports = Application

// 每次请求都应该有一个全新的context
// 每次请求应该都是没有关系的