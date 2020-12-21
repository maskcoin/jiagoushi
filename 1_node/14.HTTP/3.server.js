const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

class Server {
    handleRequest(req, res) {
        
    }
    start(...args) {
        // 代码尽量不要嵌套 bind原理就是产生一个 新的函数
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
}

let server = new Server()
server.start(3000, () => {
    console.log('server started 3000')
})