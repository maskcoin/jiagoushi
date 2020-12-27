const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const querystring = require('querystring')

const messages = {
    en: {
        message: {
            hello: 'hello world'
        }
    },
    'zh-CN': {
        message: {
            hello: '你好'
        }
    }
}

// 多语言 实现方案非常多 1.一个网站多个路径来实现多语言 2.前端来实现多语言（先配置好两种语言，动态的切换内容） i18n
// 2.服务端的header 来实现切换多语言 
// accept - language: zh - CN, zh; q = 0.9, en; q = 0.8 浏览器会发送给我这样一个信息

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true)
    const filePath = path.join(__dirname, pathname)

    fs.stat(filePath, (err, statObj) => {
        if (err) {
            return res.end('Not Found')
        }
        let lans = req.headers['accept-language']
        if (lans) {
            let r = querystring.parse(lans, ',', ';')
            let arr = []
            // { 'zh-CN': '', zh: 'q=0.9', en: 'q=0.8' }
            // 根据权重进行排序
            Object.keys(r).forEach(key => {
                if (r[key] === '') {
                    arr.push({ name: key, q: 1 })
                } else {
                    arr.push({ name: key, q: r[key].split('=')[1] })
                }
            })
            arr.sort((a, b) => b.q - a.q)
            let message
            for (let i = 0; i < arr.length; i++) {
                let currentLan = arr[i]
                message = messages[currentLan.name]
                if (message) {
                    break
                }
            }
            if (message) {
                res.end(message.message.hello)
            } else {
                res.end(messages['en'].message.hello)
            }
        }
    })
})

server.listen(3000)