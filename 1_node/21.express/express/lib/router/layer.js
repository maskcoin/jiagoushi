function Layer(path, handler) {
    this.path = path
    this.handler = handler
}

Layer.prototype.match = function (pathname) {
    // 这里可以扩展
    if (this.path === pathname) {
        return true
    }

    if (!this.route) { // 中间件
        if (this.path === '/') {
            return true
        }
        return pathname.startsWith(this.path + '/') // 中间件的匹配规则
    }
    return false
}

module.exports = Layer