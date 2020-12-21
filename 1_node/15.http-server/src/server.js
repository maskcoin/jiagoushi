// ----------------------------------core----------------------------------

const http = require('http')
const fs = require('fs').promises
const { createReadStream, createWriteStream, readFileSync } = require('fs')
const url = require('url')
const path = require('path')
const crypto = require('crypto')

// ----------------------------------core----------------------------------
if (!process.env['DEBUG']) {
    process.env['DEBUG'] = 'server'
}

const ejs = require('ejs')
const debug = require('debug')('server')
const mime = require('mime')
const chalk = require('chalk')

const template = readFileSync(path.resolve(__dirname, 'template.ejs'), 'utf-8')

debug(chalk.green('hello'))
class Server {
    constructor(config) {
        this.port = config.port
        this.directory = config.directory
        this.host = config.host
        this.template = template
    }

    async handleRequest(req, res) {
        let { pathname } = url.parse(req.url)
        pathname = decodeURIComponent(pathname) // 将中文进行一次转译
        let filePath = path.join(this.directory, pathname)
        try {
            let statObj = await fs.stat(filePath)
            if (statObj.isFile()) {
                this.sendFile(req, res, filePath, statObj)
            } else {
                // 文件夹 先尝试找index.html
                let concatFilePath = path.join(filePath, 'index.html')

                try {
                    statObj = await fs.stat(concatFilePath)
                    this.sendFile(req, res, concatFilePath, statObj)
                } catch (e) {
                    this.showList(req, res, filePath, statObj, pathname)
                }
            }
        } catch (e) {
            this.sendError(req, res, e)
        }
    }

    async showList(req, res, filePath, statObj, pathname) {
        // 读取目录包含的信息
        let dirs = await fs.readdir(filePath)
        let pathArr = dirs.map(dir => ({
            dir,
            href: path.join(pathname, dir)
        }))
        // 渲染列表
        let templateStr = ejs.render(this.template, { pathArr })
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(templateStr)
    }

    gzip(req, res, filePath, statObj) {
        if (req.headers['accept-encoding'] && req.headers['accept-encoding'].includes('gzip')) {
            res.setHeader('content-encoding', 'gzip')
            return require('zlib').createGzip() // 创建转化流
        } else {
            return false
        }
    }

    async cache(req, res, filePath, statObj) {
        res.setHeader('Cache-Control', 'max-age=10')
        let fileContent = await fs.readFile(filePath)

        let ifNoneMatch = req.headers['if-none-match']
        let etag = crypto.createHash('md5').update(fileContent).digest('base64')

        let ifModifiedSince = req.headers['if-modified-since']
        let ctime = statObj.ctime.toUTCString()

        res.setHeader('Last-Modified', ctime)
        res.setHeader('Etag', etag)

        let cache = true

        if (ifModifiedSince !== ctime || ifNoneMatch !== etag) {//Last-Modified 不够准确 Etag
            cache = false
        }

        return cache
    }

    async sendFile(req, res, filePath, statObj) {
        // 缓存
        let cache = await this.cache(req, res, filePath, statObj)
        if (cache) { // 有缓存直接让用户查找缓存
            res.statusCode = 304
            return res.end()
        }

        res.setHeader('Content-Type', mime.getType(filePath) + '; charset=utf-8')
        // 这里需要掌握 header 来看一下浏览器是否支持gzip压缩 
        // 客户端和服务端定义的一个规则，相互能识别
        let gzip = this.gzip(req, res, filePath, statObj)
        if (gzip) {
            createReadStream(filePath).pipe(gzip).pipe(res)
        } else {
            createReadStream(filePath).pipe(res)
        }
    }

    sendError(req, res, e) {
        debug(e)
        res.statusCode = 404
        res.end('Not Found')
    }

    start() {
        const server = http.createServer(this.handleRequest.bind(this))

        server.listen(this.port, this.host, () => {
            console.log(chalk.yellow(`Starting up http-server, serving ${this.directory}`))
            console.log(chalk.green(`http://${this.host}:${this.port}`))
        })
    }
}

module.exports = Server
// gzip 压缩（前端可以通过webpack插件进行压缩）如果前端压缩了 那通过 后端直接返回即可,
// 如果前端没有压缩，那么后端在返回的时候再进行压缩
// 服务端优化 压缩 + 缓存