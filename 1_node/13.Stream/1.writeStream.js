const fs = require('fs')
const path = require('path')

// 内部也是基于Events模块，默认会清空文件并写入，如果文件不存在会创建文件
// fs.open fs.write
let ws = fs.createWriteStream(path.resolve(__dirname, 'name.txt'), {
    flags: 'w',
    encoding: 'utf-8',
    mode: 0o666,
    autoClose: true,
    start: 0,
    highWaterMark: 3
})

let flag = ws.write('h')
flag = ws.write('e')

// 内部会维护一个变量，这个变量会统计写入的个数，当达到highWaterMark时 会返回false，内容写入后，会在统计的数量
// 的基础上减少
flag = ws.write('l')

// drain 触发的条件是 1.必须达到预期或者过预期 2.内存中的内容全部清空后会触发drain事件
ws.on('drain', () => {
    console.log('drain')
})



// ws.write('world', (err) => {
//     console.log('成功2')
// })

// ws.end('!!!', () => {
//     console.log('成功3')
// })

// ws.write 写入的内容
// ws.end 可以关闭文件
// ws.on('drain', ()=>{})

// ws.open
// ws.close
