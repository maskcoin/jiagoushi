const fs = require('fs')
const path = require('path')
const ReadStream = require('./readStream')
const WriteStream = require('./writeStream')
// 可读流.pipe(可写流) 1.异步的 2.可以实现 读一点写一点
// fs.createReadStream('name.txt').pipe(fs.createWriteStream(path.resolve(__dirname, 'copy.txt')))

let rs = new ReadStream('./name.txt', { highWaterMark: 4 })
let ws = new WriteStream('./copy.txt', { highWaterMark: 1 })

rs.pipe(ws)
