// 异步 串行 并发
const fs = require('fs')
const path = require('path')

// 1.删除文件  fs.unlinkSync fs.rmdirSync fs.readdirSync fs.statSync (isFile isDirectory)
// let dirs = fs.readdirSync('m')
// dirs = dirs.map(item => path.join('m', item))
// dirs.forEach(item => {  // 获取文件的状态信息
//     let statObj = fs.statSync(item)
//     if (statObj.isFile()) {
//         fs.unlinkSync(item)
//     } else {
//         fs.rmdirSync(item)
//     }
// })
// fs.rmdirSync('m')

// console.log(dirs)

// 同步删除目录 先序
// function rmdirSync(dir) {
//     // 1.判断dir是不是一个目录
//     let statObj = fs.statSync(dir)
//     if (statObj.isDirectory()) {
//         let dirs = fs.readdirSync(dir)
//         dirs = dirs.map(d => path.join(dir, d))
//         dirs.forEach(d => rmdirSync(d))
//         fs.rmdirSync(dir)
//     } else {
//         fs.unlinkSync(dir)
//     }
// }

// rmdirSync('a')

// 异步串行删除
// function rmdir(dir, cb) {
//     fs.stat(dir, (err, statObj) => {
//         if (statObj.isDirectory()) {
//             fs.readdir(dir, (err, dirs) => {
//                 dirs = dirs.map(item => path.join(dir, item))
//                 let index = 0
//                 function next() {
//                     if (index === dirs.length) {
//                         return fs.rmdir(dir, cb)
//                     }
//                     let current = dirs[index++]
//                     rmdir(current, next)
//                 }
//                 next()
//             })
//         } else {
//             fs.unlink(dir, cb) // 删除文件即可
//         }
//     })
// }

function rmdir(dir, cb) {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isDirectory()) {
            fs.readdir(dir, (err, dirs) => {
                dirs = dirs.map(item => path.join(dir, item))
                if (dirs.length === 0) {
                    return fs.rmdir(dir, cb)
                }
                let index = 0
                function done() {
                    if (++index === dirs.length) {
                        fs.rmdir(dir, cb)
                    }
                }
                dirs.forEach(d => rmdir(d, done))
            })
        } else {
            fs.unlink(dir, cb) // 删除文件即可
        }
    })
}

rmdir('a', (err) => {
    if (err) {
        throw err
    }
    console.log('删除成功')
})