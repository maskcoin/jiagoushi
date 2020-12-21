// 后端的缓存 配置强制缓存 和 协商缓存

// 强制：以后的请求都不需要访问服务器 200

// 协商：你每次来我都判断一下，告诉你是否需要找缓存 304

const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    const filePath = path.join(__dirname, pathname)

    // 对比缓存？我要比较一下 再决定用缓存好，还是用最新的好
    // 客户端 If-Modified-Since
    // 服务端 Last-Modified 对比最后修改时间返回内容

    // 缺点是 内容没变 修改时间变化了 也会重新读取内容 时间不精准 精确到秒，如果一秒内 改了多次 也监控不到
    res.setHeader('Cache-Control', 'no-cache')
    let ifModifiedSince = req.headers['if-modified-since']

    fs.stat(filePath, (err, statObj) => {
        if (err) {
            return res.end()
        }
        let lastModified = statObj.ctime.toUTCString()
        if (ifModifiedSince === lastModified) {
            res.statusCode = 304
            return res.end()
        }

        res.setHeader('Last-Modified', lastModified)
        if (err) {
            res.statusCode = 404
            return res.end('Not Found')
        }
        if (statObj.isFile()) {
            console.log(statObj.ctime)
            fs.createReadStream(filePath).pipe(res)
        } else {
            res.statusCode = 404
            return res.end('Not Found')
        }
    })
}).listen(3000)