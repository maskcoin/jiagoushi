const fs = require('fs')
const { resolve } = require('path')
// const util = require('util')

const promisify = fn => (...args) => new Promise((resolve, reject) => {
    fn(...args, (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

let read = promisify(fs.readFile)
read('./name.txt', 'utf-8').then((data) => {
    console.log(data)
})