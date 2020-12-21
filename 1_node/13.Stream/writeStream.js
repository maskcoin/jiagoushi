const EventEmitter = require('events')
const fs = require('fs')
class WriteStream extends EventEmitter {
    constructor(path, options) {
        super()
        this.path = path
        this.flags = options.flags || 'w'
        this.mode = options.mode || 0o666
        this.autoClose = options.autoClose || true
        this.start = options.start || 0
        this.highWaterMark = options.highWaterMark || 64 * 1024

        // 维护当前存入的数据个数
        this.len = 0 // 每次调用write方法 会根据写入的内容的个数累加给len属性（缓存的长度）
        this.writing = false // 当前写入数据的时候（是否正在写入）
        this.needDrain = false // 是否需要触发drain事件（触发drain事件）
        this.offset = this.start
        this.cache = [] // 用来缓存 多次的写入操作（除了第一次）
        this.open() // 默认先打开文件
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

    // 数据的格式 可以是string or buffer
    write(chunk, encoding = 'utf8', cb = () => { }) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
        this.len += chunk.length
        let flag = this.len < this.highWaterMark
        this.needDrain = !flag

        if (this.writing) {
            // 有其他线程正在落盘
            this.cache.push({
                chunk, encoding, cb
            })
        } else {
            // 没有正在写入
            this.writing = true
            this._write(chunk, encoding, () => {
                cb() // 原来的用户传入的callback
                // 当写完之后 取this.cache中的内容
                this.clearBuffer()
            }) //真正写入的逻辑
        }
        return flag
    }

    _write(chunk, encoding, cb) {
        // 真正写入的逻辑 肯定是fs.write
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, encoding, cb))
        }
        // 将用户的数据写入到文件中
        fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
            this.len -= written
            this.offset += written
            cb()
        })
    }

    clearBuffer() {
        let data = this.cache.shift()
        if (data) {
            let { chunk, encoding, cb } = data
            this._write(chunk, encoding, () => {
                cb()
                this.clearBuffer()
            })
        } else {
            this.writing = false
            if (this.needDrain) {
                this.needDrain = false
                this.emit('drain')
            }
        }
    }
}

module.exports = WriteStream