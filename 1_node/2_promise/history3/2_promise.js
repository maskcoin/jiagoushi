let fs = require('fs')
const Promise = require('./promise')

new Promise((resolve, reject) => {
    resolve(100)
}).then((data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok')
        }, 1000)
    })
}, reason => {
    return '失败'
}).then((data) => {
    console.log(data, '***')
})