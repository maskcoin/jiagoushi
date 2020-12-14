// Promise.resolve()  

// const Promise = require("./promise");

// Promise.reject()

// 区别在于 resolve会等待里面的promise执行完毕 reject不会有等待效果

// let Promise = require('./promise')

// Promise.resolve(new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('ok')
//     }, 1000);
// })).then(data => {
//     console.log(data)
// })

// finally不是最终的意思，而是无论如何都会执行的意思
// 如果返回一个promise 会等待这个promise 也执行完毕（如果是失败的promise 会用它的失败原因传给下一个）
Promise.resolve(123).finally(() => {
    console.log('finnaly')
})