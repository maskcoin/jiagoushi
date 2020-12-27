const http = require('http')
const Router = require('./router')
const methods = require('methods')

// 2.应用和路由的分离
function Application() { // 每次创建一个应用 路由系统应该是毫无关系的，创建一个全新的路由系统
    // 路由的懒加载

}

Application.prototype.lasy_router = function () { // 调用此方法才开始创建路由，并不是创建应用时直接装载路由
    if (!this._router) {
        this._router = new Router()
    }
}

Application.prototype.use = function (...args) {
    this.lasy_router()
    this._router.use(...args)
}

methods.forEach(method => {
    Application.prototype[method] = function (path, ...handlers) {
        this.lasy_router()
        this._router[method](path, handlers)
    }
})



Application.prototype.listen = function (...args) {
    const server = http.createServer((req, res) => {
        this.lasy_router()
        const done = () => {
            res.end(`Cannot my ${req.method} ${req.url}`)
        }
        this._router.handle(req, res, done)
    })
    server.listen(...args)
}

module.exports = Application