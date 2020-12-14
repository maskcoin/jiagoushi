const fs = require('fs').promises

const Promise = require('./promise')

// promise 缺陷默认无法中断，只是不采用返回的结果
// promise 缺陷默认无法中断，只是不采用返回的结果
// Promise.race([fs.readFile('name.txt', 'utf-8'), fs.readFile('age.txt', 'utf-8')]).then(data => {
//     console.log(data)
// }).catch(err => console.log(err))

// 中断promise 一个promise正在走向成功，3s之后成功，如果超过2s就认为失败了
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok 成功了')
    }, 10000);
})

const wrap = promise => {
    let abort
    let myP = new Promise((resolve, reject) => {
        abort = reject
    })
    let p = Promise.race([promise, myP])
    p.abort = abort
    return p
}

let p = wrap(promise)
p.then(data => {
    console.log(data)
}, err => {
    console.log(err)
})

setTimeout(() => {
    p.abort('promise 超时')
}, 2000);

