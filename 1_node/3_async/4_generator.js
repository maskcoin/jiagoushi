// generator 生成器 => 迭代器  => 数组 => 类数组 长得像数组?

// const likeArray = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 };
// likeArray[Symbol.iterator] = function () {
//     let i = 0
//     return { // 迭代器
//         next: () => {
//             return { value: this[i], done: i++ === this.length }
//         }
//     }
// };

// likeArray[Symbol.iterator] = function* () { // generator 函数可以生产迭代器
//     let i = 0
//     while (i !== this.length) { // generator 固定语法 yield 必须要配合*来使用
//         yield this[i++]
//     }
// }


// 原理就是遍历这个对象，将结果放到数组中，这个数据必须得有个迭代器，
// console.log([...likeArray])

// 普通函数默认会从头到尾执行，没有暂停功能
// generator函数是es6提供的语法，如果碰到yield 就会暂停执行（redux-sage）
// function* read() {
//     yield 1
//     yield 2
//     yield 3
// }

// let it = read()  //it就是迭代器，迭代器上有一个next方法
// let flag = false
// do {
//     let { value, done } = it.next()
//     if (!done) {
//         console.log(value)
//     } else {
//         flag = done
//     }
// } while (!flag)

// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())

// function* read() {
//     let a = yield 1
//     console.log(a)
//     let b = yield 2
//     console.log(b)
//     let c = yield 3
//     console.log(c)
//     return c
// }

// 蛇形执行，除了第一次之外的next方法，都是把next中的参数传递给上一次yield的返回的结果
// let it = read()
// it.next()// 第一次的next传递参数没有任何意义
// it.next(7)
// it.next(8)
// it.next(9)

const fs = require('fs').promises

async function read() { // 代码编写更像是同步的，执行还是异步的
    let name = await fs.readFile('./name.txt', 'utf-8')
    let age = await fs.readFile(name, 'utf-8')
    return age
}

let it = read()

const co = it => {
    return new Promise((resolve, reject) => {
        // 异步迭代 靠的是 递归调用
        function next(data) {
            let { value, done } = it.next(data)
            if (!done) {
                Promise.resolve(value).then(next, reject)
            } else {
                resolve(value)
            }
        }
        next()
    })
}

// async + await = generator + co
// co(read()).then(data => {
//     console.log(data)
// }, err => console.log(err))

// 把yield改为await，把function后面的*去掉，在function前面加上 async，把co去掉就可以了
// 默认async函数执行后返回的就是一个promise
read().then(data => {
    console.log(data)
}, err => console.log(err))
