const fs = require('fs')
const Promise = require('./promise')
// function read(filename) {
//     let dfd = Promise.defer()
//     fs.readFile(filename, 'utf8', (err, data) => {
//         if (err) dfd.reject(err)
//         dfd.resolve(data)
//     })
//     return dfd.promise
// }

// read('name.txt').then((data) => {
//     return read(data)
// }).then((data) => {
//     console.log(data)
// }, reason => console.log(reason))

new Promise((resolve, reject) => {
    reject(1)
}).then((data) => {
    console.log(data)
}).catch(err => {
    console.log('err', '---')
})