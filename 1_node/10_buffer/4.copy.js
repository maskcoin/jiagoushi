// 文件系统中内置了操作文件的方法（精确的读取文件中的部分内容）
const fs = require('fs')

// i/o操作 输入 和 输出
// 先读取三个到内存中
const buffer = Buffer.alloc(3)

let index = 0
let position = 0

fs.open('./name.txt', 'r', (err1, fd1) => {
    fs.open('./age.txt', 'w', (err2, fd2) => {
        fs.read(fd1, buffer, 0, buffer.length, index, (err, bytesRead) => {
            if (bytesRead != 0) {
                fs.write(fd, buffer, 0, bytesRead, position, (err, writen) => {
                    
                })
            }
        })
    })
})

// 写操作
// w 表示的是写入 默认会先清空 
// const wBuffer = Buffer.from('比特币')
// fs.open('./age.txt', 'w', (err, fd) => {
//     fs.write(fd, wBuffer, 0, 3, 0, (err, writen) => {
//         console.log('写入完成')
//     })
// })