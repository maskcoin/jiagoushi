// 通过fs模块实现copy功能
const fs = require('fs')

// 不会阻塞主线程
// 读取默认不指定编码都是buffer类型
// let r = fs.readFileSync('./name.txt')
// fs.writeFileSync('./age.txt', r)
// fs.readFile('./name.txt', (err, data) => {
//     fs.writeFile('./name2.txt', data, (err) => {
//         console.log('写入成功')
//     })
// })

// 会默认把要拷贝的文件“整个”读取到内存中，特点不能读取比内存大的文件
// stream 边读边写(采用分块读取写入的方式 来实现拷贝)

