// const fs = require('fs')
// let r = fs.readFileSync('./note.md')
// console.log(r.toString())

// base64 没有加密功能（只是编码转化base64） 加密（解密）
// base64可以传输数据，可以减少http请求（不是所有的图片都转成base64）
// 3*8的规则，改成了4*6的方式

let buffer = Buffer.from('珠')
console.log(buffer)//e7 8f a0
console.log((0xe7).toString(2))
console.log((0x8f).toString(2))
console.log((0xa0).toString(2))

// 111001 111000 111110 100000

console.log(parseInt('111001', 2))
console.log(parseInt('111000', 2))
console.log(parseInt('111110', 2))
console.log(parseInt('100000', 2))

// 57 56 62 32
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase()
str += '0123456789'
str += '+/'
console.log(str[57] + str[56] + str[62] + str[32])

// 小图标适合base64转码

// gzip 重复性高的可以压缩