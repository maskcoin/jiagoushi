const url = require('url')
const Layer = require('./layer')
const Route = require('./route')

function Router() {
    this.stack = []

}

Router.prototype.route = function (path) {
    let route = new Route() // 产生route
    // 产生layer 让layer和route进行关联
    let layer = new Layer(path, route.dispatch.bind(route))
    layer.route = route

    this.stack.push(layer)
    return route
}

Router.prototype.get = function (path, handlers) {
    // 1.用户调用get时，需要保存成一个layer 放到stack中
    // 2.产生一个Route实例和当前的layer产生关系
    // 3.要将route的dispatch方法存到layer中
    let route = this.route(path)

    // 用户调用get方法时，传入的handler就不一定时一个了
    route.get(handlers) // 让route记录用户传入的handler，并且标记这个handler是什么方法
}

Router.prototype.handle = function (req, res, done) {
    let { pathname } = url.parse(req.url)
    // 1.需要取出路由系统中Router 存放的layer 依次执行，next
    let idx = 0
    let next = () => {
        if (idx == this.stack.length) {
            return done() // 遍历完后还是没找到，那就直接走出路由系统即可
        }
        let layer = this.stack[idx++]
        // 需要查看 layer上的path 和 当前请求的路径是否一致，如果一致调用dispatch方法
        if (layer.match(pathname)) { // 我们的原则是让layer 自己进行匹配
            // 路径匹配到了，需要让layer上对应的dispatch执行
            layer.handler(req, res, next) // 将遍历路由系统中下一层的方法传入
        } else {
            next()
        }
    }

    next()
}

module.exports = Router