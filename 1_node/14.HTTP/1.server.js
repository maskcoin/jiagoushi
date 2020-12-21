// node中的核心模块 http 可以快速的创建一个web服务
const http = require('http')
const url = require('url') // 处理url路径

const server = http.createServer()

server.on('request', (req, res) => {
    console.log(req.method) // 方法名是大写的

    // 进行处理url pathnname query
    // console.log(url.parse(req.url, true))

    // req是一个可读流
    const arr = []
    req.on('data', (chunk) => {
        arr.push(chunk)
    })
    req.on('end', () => { // 请求发送过来后 一定会触发end事件
        console.log(Buffer.concat(arr).toString())
    })

    // console.log(req.httpVersion)
    // console.log(req.headers) // 所有的headers 获取时都是小写
    // 可写流 write end 可写流的方法
    res.statusCode = 222
    res.setHeader('a', 1)
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    res.write('你好')
    res.end('world')
})

const port = 3000
server.listen(port, () => {
    console.log('server start', port)
})

// events 模块 node中基本上所有的模块都继承于EventEmitter
server.on('error', (err) => {
    if (err.errno === 'EADDRINUSE') {
        server.listen(++port)
    }
})
// 需要实现文件变化后自动重新运行
// nodemon node monitor 可以监视自动重启 自动打包 (pm2)

