const http = require('http')
const Router = require('./router')

// 2.应用和路由的分离
function Application() { // 每次创建一个应用 路由系统应该是毫无关系的，创建一个全新的路由系统
    this._router = new Router()
}

Application.prototype = {
    get(path, ...handlers) {
        this._router.get(path, handlers)
    },
    listen(...args) {
        const server = http.createServer((req, res) => {
            const done = () => {
                res.end(`Cannot my ${req.method} ${req.url}`)
            }
            this._router.handle(req, res, done)
        })
        server.listen(...args)
    }
}

module.exports = Application