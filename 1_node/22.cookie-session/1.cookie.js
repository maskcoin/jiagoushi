const http = require('http')
const querystring = require('querystring')

http.createServer((req, res) => {
    // 通过服务端写入cookie
    if (req.url === '/read') {
        res.end(JSON.stringify(querystring.parse(req.headers.cookie, '; ', '=')))
    } else if (req.url === '/write') {
        // domain 域名设置  .zf.cn  a.zf.cn b.zf.cn 默认就是当前域名（cookie特点就是默认发送）
        // path / 任意路径 同 （express中间件）
        // expires 绝对实际 / max-age
        // httpOnly 是否客户端可以操作cookie

        // 设置cookie
        res.setHeader('Set-Cookie', ['name=zf; httpOnly=true', 'age=11'])
        res.end('write ok')
    } else {
        res.end('Not Found!')
    }
}).listen(8080)