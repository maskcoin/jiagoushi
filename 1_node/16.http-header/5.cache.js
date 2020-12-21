// 后端的缓存 配置强制缓存 和 协商缓存

// 强制：以后的请求都不需要访问服务器 200

// 协商：你每次来我都判断一下，告诉你是否需要找缓存 304

const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
// md5 摘要算法：不是加密算法（不可逆）
// 1.不可逆  2.不同内容转化的结果不相同 3.转化后的结果都是一样长的 4.同样的东西产生的结果相同 5.雪崩效应
const crypto = require('crypto')

http.createServer((req, res) => {
    console.log(req.headers)
    const { pathname } = url.parse(req.url)
    const filePath = path.join(__dirname, pathname)
    res.setHeader('Cache-Control', 'no-cache')
    let hashCode = crypto.createHash('md5').update(fs.readFileSync(filePath)).digest('base64')
    res.setHeader('Etag', hashCode)

    let ifNoneMatch = req.headers['if-none-match']

    // etag = ifNoneMatch 可以实现对比缓存，比较的方式比较精准，但是默认我们不会根据完整内容生产hashCode，
    // 可以取文件的某一部分 (开头几行 作为hash)，为了保证精确度 内容的一部分+文件的总大小来作为hashCode

    // 项目中 会使用 强制缓存 + 对比缓存（两个策略都使用）

    if (ifNoneMatch === hashCode) {
        res.statusCode = 304
        return res.end()
    }

    fs.stat(filePath, (err, statObj) => {
        if (err) {
            res.statusCode = 404
            return res.end('Not Found')
        }

        // 第一次请求我，我需要根据内容产生一个唯一标识：对应当前的文件

        if (statObj.isFile()) {

            fs.createReadStream(filePath).pipe(res)
        } else {
            res.statusCode = 404
            return res.end('Not Found')
        }
    })
}).listen(3000)