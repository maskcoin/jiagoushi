// referer 来源 iframe img ...

// 表示这个资源被谁引用过 防盗链
const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true)
    const filePath = path.join(__dirname, pathname)

    fs.stat(filePath, (err, statObj) => {
        if (err) {
            return res.end('Not Found')
        }

        if (statObj.isFile()) {
            // 只对图片进行防盗链
            if (/\.jpg/.test(filePath)) { // 如果请求路径是.jpg结尾的，要判断引用的来源
                let referer = req.headers['referer']
                if (referer) {
                    let host = req.headers.host
                    referer = url.parse(referer).host
                    if (host !== referer) {
                        return fs.createReadStream(path.join(__dirname, '2.jpg')).pipe(res)
                    }
                }
            }
            fs.createReadStream(filePath).pipe(res)
        } else {
            return res.end('Not Found')
        }
    })
})

server.listen(3000)