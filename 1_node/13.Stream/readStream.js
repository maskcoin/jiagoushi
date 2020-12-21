const EventEmitter = require('events')
const fs = require('fs')
class ReadStream extends EventEmitter {
    constructor(path, options) {
        super()
        this.path = path
        this.flags = options.flags || 'r'
        this.mode = options.mode || 0o666
        this.autoClose = options.autoClose || true
        this.start = options.start || 0
        this.end = options.end || Infinity
        this.highWaterMark = options.highWaterMark || 64 * 1024
        this.pos = this.start
        // 默认创建一个可读流 是非流动模式 不会触发data事件，如果用户监听了data事件后 需要变为流动模式
        this.flowing = false//是否是流动模式
        this.on('newListener', (eventName) => {
            if (eventName === 'data') {
                this.flowing = true
                this.read()
            }
        })
        this.open()
    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                return this.emit('error', err)
            }
            this.fd = fd //保存在实例上，用于稍后的读取操作
            this.emit('open', fd)
        })
    }

    read() {
        // 读取必须在打开文件成功之后
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this.read())
        }
        let howMuchToRead = this.end ? Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark
        let buffer = Buffer.alloc(this.highWaterMark)
        fs.read(this.fd, buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
            if (bytesRead) {
                this.pos += bytesRead
                this.emit('data', buffer.slice(0, bytesRead))
                if (this.flowing) {
                    this.read()
                }
            } else {
                this.emit('end')
                if (this.autoClose) {
                    fs.close(this.fd, (err) => {
                        this.emit('close')
                    })
                }
            }
        })
    }

    pause() {
        this.flowing = false
    }

    resume() {
        this.flowing = true
        this.read()
    }

    pipe(ws) { // 管道 优势 不会淹没可用内存 
        this.on('data', (data) => {
            let flag = ws.write(data)
            if (!flag) {
                this.pause()
            }
        })

        ws.on('drain', () => {
            this.resume()
        })
    }
}

module.exports = ReadStream