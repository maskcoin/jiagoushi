// 实现一个http服务器 客户端会发送请求个 GET? / POST（请求体）
// 要处理不同的请求体的类型（表单格式 a=1&b=2 formData）(JSON "{}") 文件格式（二进制）
// ajax（跨域问题） 提交数据 表单数据 (可以直接通信)
const http = require('http')
const path = require('path')
const url = require('url')
const mime = require('mime')
const fs = require('fs')
const querystring = require('querystring')
let server = http.createServer()

server.on('request', (req, res) => {
    let { pathname } = url.parse(req.url)
    pathname = decodeURIComponent(pathname)

    // 1）配置跨域
    // 需要配置跨域头 你访问我 如果不支持跨域
    // cors 允许跨域 允许携带header
    // console.log(req.headers.origin)
    // console.log(req.method)
    // res.setHeader('Access-Control-Allow-Origin', '*') // 我允许 任何网站来访问我
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')

    // 可以设置 当前options的发送频率
    // res.setHeader('Access-Control-Max-Age', '30')
    // 默认支持 GET 和 POST

    // 如果碰到OPTIONS请求，直接成功即可
    // 预检请求：先发一个尝试的请求，如果能跑通再发送真正的请求
    // if (req.method === 'OPTIONS') {
    //     res.statusCode = 200
    //     res.end()
    // }

    // 2）解析请求体 
    const bufs = []
    req.on('data', (chunk) => {
        bufs.push(chunk)
    })
    req.on('end', () => {
        let result = Buffer.concat(bufs).toString()
        let obj
        if (req.headers['content-type'] === "application/x-www-form-urlencoded") {
            obj = querystring.parse(result.toString())
            res.setHeader('Content-Type', 'application/json')
        } else if (req.headers['content-type'] === "application/json") {
            obj = JSON.parse(result)
        }

        // 3）根据不同路径，返回对应内容 路由
        if (pathname === '/login' && req.method === 'POST') {
            console.log(obj)
            res.end('login')
        }

        if (pathname === '/reg' && req.method === 'POST') {
            console.log(obj)
            res.end(JSON.stringify(obj))
        }
    })
})

server.listen(3000)