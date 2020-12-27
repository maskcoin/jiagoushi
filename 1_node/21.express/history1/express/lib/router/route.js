const Layer = require('./layer')

function Route() {
    this.stack = []
}

Route.prototype.get = function (handlers) {
    handlers.forEach(handler => {
        let layer = new Layer('', handler) // 路径没有意义
        layer.method = 'get' // layer上是什么方法 
        this.stack.push(layer)
    })
}

Route.prototype.dispatch = function (req, res, out) {
    // 稍后调用此方法时，会去栈中拿出对应的handler 依次执行
    let idx = 0
    const next = () => {
        if (idx == this.stack.length) {
            return out() // 遍历完后还是没找到，那就直接走出路由系统即可
        }
        let layer = this.stack[idx++]
        // 需要查看 layer上的path 和 当前请求的路径是否一致，如果一致调用dispatch方法
        if (layer.method === req.method.toLowerCase()) {
            // 路径匹配到了，需要让layer上对应的dispatch执行
            layer.handler(req, res, next) // 将遍历路由系统中下一层的方法传入
        } else {
            next()
        }
    }
    next()
}

module.exports = Route