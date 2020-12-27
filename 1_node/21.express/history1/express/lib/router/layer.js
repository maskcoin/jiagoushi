function Layer(path, handler) {
    this.path = path
    this.handler = handler
}

Layer.prototype.match = function (pathname) {
    // 这里可以扩展
    return this.path === pathname
}

module.exports = Layer