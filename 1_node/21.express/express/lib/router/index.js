const url = require('url')
const Layer = require('./layer')
const Route = require('./route')
const methods = require('methods')

function Router() { // new 的特点 当new一个函数时，这个函数返回一个引用类型，那么这个引用类型会作为this
    let router = (req, res, next) => {
        // 二级路由在这里
        // 当请求到来时 会执行此方法

        // 处理请求
        router.handle(req, res, next) // 让对应的路由系统 去进行匹配操作
    }

    // 老的逻辑
    router.stack = []
    router.__proto__ = proto // 路由的实例可以通过链 找到 原来的方法
    return router
}

let proto = {}
proto.route = function (path) {
    let route = new Route() // 产生route
    // 产生layer 让layer和route进行关联
    let layer = new Layer(path, route.dispatch.bind(route))
    layer.route = route

    this.stack.push(layer)
    return route
}

proto.use = function (path, ...handlers) {
    // 默认第一个是路径 后面是一个个的方法，路径可以不传
    // 1.如果就传了一个方法
    if (typeof path === 'function') { // 没有传路径
        handlers.unshift(path)
        path = '/'
    }
    for (let i = 0; i < handlers.length; i++) {
        let layer = new Layer(path, handlers[i])
        // 中间件不需要route
        this.stack.push(layer)
    }
}

methods.forEach(method => {
    proto[method] = function (path, handlers) {
        // 1.用户调用get时，需要保存成一个layer 放到stack中
        // 2.产生一个Route实例和当前的layer产生关系
        // 3.要将route的dispatch方法存到layer中
        let route = this.route(path)

        // 用户调用get方法时，传入的handler就不一定时一个了
        route[method](handlers) // 让route记录用户传入的handler，并且标记这个handler是什么方法
    }
})



proto.handle = function (req, res, done) {
    let { pathname } = url.parse(req.url)
    // 1.需要取出路由系统中Router 存放的layer 依次执行，next
    let idx = 0
    let removed = ''
    let next = (err) => {
        if (idx == this.stack.length) {
            return done() // 遍历完后还是没找到，那就直接走出路由系统即可
        }
        let layer = this.stack[idx++]

        if (removed) {
            req.url = removed + pathname
            removed = ''
        }

        if (err) {
            return res.end(err)
        }
        // 需要查看 layer上的path 和 当前请求的路径是否一致，如果一致调用dispatch方法
        if (layer.match(pathname)) { // 我们的原则是让layer 自己进行匹配
            if (layer.route) {
                // 路径匹配到了，需要让layer上对应的dispatch执行
                if (layer.route.methods[req.method.toLowerCase()]) { // 用户注册过这个类型的方法
                    layer.handler(req, res, next) // 将遍历路由系统中下一层的方法传入
                } else {
                    next()
                }
            } else {
                if (layer.path !== '/') {
                    removed = layer.path // 中间件的路径
                    req.url = pathname.slice(removed.length)
                }
                layer.handler(req, res, next)
            }
        } else {
            next()
        }
    }

    next()
}

module.exports = Router