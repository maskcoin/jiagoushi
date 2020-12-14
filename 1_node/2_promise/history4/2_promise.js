const Promise = require('./promise')
let p = new Promise((resolve, reject) => {
    // resolve(1)
    reject(1)
})

p.then().then().then(data => {
    console.log('success', data)
}, reason => console.log('fail ', reason))

