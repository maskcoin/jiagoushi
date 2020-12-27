const querystring = require('querystring')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

// 中间件的功能可以扩展属性、或者方法
module.exports = function (uploadDir) {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            const bufs = []
            ctx.req.on('data', (chunk) => {
                bufs.push(chunk)
            })
            ctx.req.on('end', () => {
                if (ctx.get('content-type') === 'application/x-www-form-urlencoded') {
                    let result = Buffer.concat(bufs).toString()
                    ctx.request.body = querystring.parse(result)
                    ctx.body = result
                }
                if (ctx.get('content-type').includes('multipart/form-data')) { //二进制不能直接toString可能会乱码
                    let result = Buffer.concat(bufs)
                    let boundary = '--' + ctx.get('content-type').split('=')[1]
                    let lines = result.split(boundary).slice(1, -1)
                    let obj = {} // 服务器收到的结果全部放在这个对象中

                    lines.forEach(line => {
                        let [head, body] = line.split('\r\n\r\n')
                        head = head.toString()
                        let key = head.match(/name="(.+?)"/)[1]
                        if (!head.includes('filename')) { // 不是文件
                            obj[key] = body.toString().slice(0, -2)
                        } else {
                            // 是文件 文件上传 名字是随机的
                            let content = line.slice(head.length + 4, -2)
                            let filePath = path.join(uploadDir, uuid.v4())
                            obj[key] = {
                                filePath,
                                size: content.length
                            }
                            fs.writeFileSync(filePath, content)
                        }
                    });

                    ctx.request.body = obj
                }
                resolve()
            })
        })
        await next()
    }
}

Buffer.prototype.split = function (sep) { // 分隔符肯能是中文，我希望将它转化为buffer来 计数
    let sepLen = Buffer.from(sep).length
    let arr = []
    let offset = 0
    let currentIndex = 0

    while ((currentIndex = this.indexOf(sep, offset)) !== -1) {
        arr.push(this.slice(offset, currentIndex))
        offset = currentIndex + sepLen
    }
    arr.push(this.slice(offset))

    return arr
}





// const co = it => {
//     return new Promise((resolve, reject) => {
//         const next = (data) => {
//             let { value, done } = it.next(data)
//             if (!done) {
//                 Promise.resolve(value).then(next, reject)
//             } else {
//                 resolve(value)
//             }
//         }
//         next()
//     })
// }

// async 函数不就是上面的co()函数吗？