const fs = require('fs')
const path = require('path')
const WriteStream = require('./writeStream')

let ws = new WriteStream(path.resolve(__dirname, 'name.txt'), {
    highWaterMark: 3
})

ws.on('drain', () => {
    console.log('------')
    write()
})

ws.on('close', () => {
    console.log('close')
})

let index = 0

function write() {
    let flag = true //标识 是否可以写入
    while (flag && index < 10) {
        flag = ws.write(index + '')
        index++
    }
    // if (index === 10) {
    //     ws.end('!!') //文件的关闭操作 ws.write + fs.close
    // }
}
// ws.write('hello')
// ws.write('world')
write()