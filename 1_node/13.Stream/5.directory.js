// fs是文件系统 文件 文件夹
// 文件夹 删除操作
const fs = require('fs').promises

async function mkdirP(paths) {
    let arr = paths.split('/')
    for (let i = 0; i < arr.length; i++) {
        let currentPath = arr.slice(0, i + 1).join('/')
        // 如果文件夹存在 就不能再创建
        try {
            await fs.access(currentPath)
        } catch (e) {
            await fs.mkdir(currentPath)
        }
    }
}

mkdirP('b/c/d/e/f/g')

// 创建目录时需要保证父路径存在
// function mkdirP(paths) {
//     let arr = paths.split('/')
//     for (let i = 0; i < arr.length; i++) {
//         let currentPath = arr.slice(0, i + 1).join('/')
//         console.log(currentPath)
//         // 如果文件夹存在 就不能再创建
//         if (!fs.existsSync(currentPath)) {
//             fs.mkdirSync(currentPath)
//         }
//     }
// }

// const mkdirP = (paths, cb) => { // 异步的好处是 不阻塞主线程
//     let arr = paths.split('/')

//     let index = 0
//     function next(err) {
//         if (err) {
//             cb(err)
//         }
//         if (index === arr.length) return cb()
//         // 判断如果路径不存在就停止创建
//         let currentPath = arr.slice(0, ++index).join('/')
//         fs.access(currentPath, (err) => { // err如果没有文件就报错了
//             if (err) {
//                 fs.mkdir(currentPath, next) // 当前创建完毕后
//             } else {
//                 next()
//             }
//         })
//     }
//     next()
// }

// mkdirP('a/b/c/d/m/n/p', (err) => {
//     if (err) {
//         return console.log(err)
//     }
//     console.log('创建完成')
// })

