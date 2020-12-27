const http = require('http')
const querystring = require('querystring')
const crypto = require('crypto')
// crypto.createHmac('sha256', 'zf').update('123').digest('base64')
const secret = 'zfpx'
const sign = (value) => crypto.createHmac('sha256', secret).update(value).digest('base64').replace(/\/|+|\=/, '')

// jwt 就是signed cookie不能存敏感信息
http.createServer((req, res) => {
    req.getCookie = function (key, options = {}) {
        let cookieObj = querystring.parse(req.headers.cookie, '; ', '=')
        if (options.signed) {
            let [value, s] = (cookieObj[key] + '').split('.')
            let newSign = sign(value)
            if (newSign === s) {
                return value
            } else {
                return undefined // cookie被串改了 不能使用了
            }
        }
        return cookieObj[key]
    }
    let arr = []
    res.setCookie = function (key, value, options = {}) {
        let opts = []
        if (options.domain) {
            opts.push(`domain=${options.domain}`)
        }
        if (options.max_age) {
            opts.push(`max-age=${options.max_age}`)
        }
        if (options.httpOnly) {
            opts.push(`httpOnly=${options.httpOnly}`)
        }
        if (options.signed) {
            value = value + '.' + sign(value)
        }
        arr.push(`${key}=${value}; ${opts.join('; ')}`)
        res.setHeader('Set-Cookie', arr)
    }
    // 通过服务端写入cookie
    if (req.url === '/read') {
        res.end(req.getCookie('name', { signed: true }) || 'empty')
    } else if (req.url === '/write') {
        // domain 域名设置  .zf.cn  a.zf.cn b.zf.cn 默认就是当前域名（cookie特点就是默认发送）
        // path / 任意路径 同 （express中间件）
        // expires 绝对实际 / max-age
        // httpOnly 是否客户端可以操作cookie

        // 当给浏览器设置cookie时，可以增加签名，根据数据内容创建一个唯一的签名 md5
        // 加盐算法 根据内容和密钥 算出一个签名（不能反解）相同的密钥签名的结果是相同的
        res.setCookie('name', 'zf', { //1.可以多设置一个字段 sign_name:xxxx
            httpOnly: true,
            max_age: 10,
            signed: true
        })
        res.setCookie('age', '100')
        // 设置cookie
        // res.setHeader('Set-Cookie', ['name=zf; httpOnly=true', 'age=11'])
        res.end('write ok')
    } else {
        res.end('Not Found!')
    }
}).listen(8080)