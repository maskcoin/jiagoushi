// 中间层的方式
const http = require('http')
// http.get 默认发送get请求
// http.request 支持其他请求方式 post
let client = http.request({
    path: '/login',
    hostname: 'localhost',
    port: 3000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}, (res) => {
    res.on('data', (chunk) => {
        console.log(chunk.toString())
    })
})

client.end('{"name":"maskcoin"}')