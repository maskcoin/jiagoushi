const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    const filePath = path.join(__dirname, pathname)
    // 先判断文件是否存在 fs.access  fs.stat
    fs.stat(filePath, (err, statObj) => {
        if (err) {
            res.end('Not Found')
        } else {
            if (statObj.isFile()) {
                fs.createReadStream(filePath).pipe(res)
            } else {
                let file = path.join(filePath, 'index.html')
                fs.stat(file, (err, statObj) => {
                    if (err) {
                        res.end('Not Found')
                    } else {
                        fs.createReadStream(file).pipe(res)
                    }
                })
            }
        }
    })


    // 处理请求是单线程的 （代码尽量采用异步的 否则会阻塞主线程）
    // fs.readFile(filePath, (err, data) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     res.end(data)
    // })

})
server.listen(3000)