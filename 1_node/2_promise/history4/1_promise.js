const Promise = require('./promise')
let p = new Promise((resolve, reject) => {
    resolve(1)
})

let promise2 = p.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('错误')
            resolve(new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(200)
                }, 1000)
            }))
        }, 1000)
    })
})

promise2.then(data => {
    console.log('success', data)
}, err => {
    console.log('fail', err)
})

