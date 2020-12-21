const express = require('express')

const app = express()

app.get('/server', (req, res) => {
    // 设置响应头 设置允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send('HELLO AJAX')
})

app.listen(8000, () => {
    console.log("服务已经启动，8000端口监听中....")
})