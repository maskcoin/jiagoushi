// promise的特点以及概念
// https://promisesaplus.com/ promisea+ 规范 都通过这个规范来实现

// promise es6 内部已经实现了 ie不支持promise，需要polyfill es6-promise

// promise 为什么会产生 解决异步问题

// 1.多个异步请求并发（希望同步最终的结果） promise.all
// 2.链式异步请求的问题 上一个人的输出是下一个人的输入 Promise的链式调用可以解决这个问题
// 3.缺陷：还是基于回调的
let Promise = require('./promise')

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('成功')
        reject('失败')
    }, 1000)
})

// 1.promise调用then方法时，可能当前的promise并没有成功，pending
// 2.发布订阅模式 如果当前状态是pending时，我们需要将成功的回调和失败的回调存放起来，稍后调用resolve或者reject时重新执行
promise.then((value) => {
    console.log('success1', value)
}, (reason) => {
    console.log('fail1', reason)
})

promise.then((value) => {
    console.log('success2', value)
}, (reason) => {
    console.log('fail2', reason)
})

