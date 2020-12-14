const fs = require('fs').promises

const Promise = require('./promise')

// promise 缺陷默认无法中断，只是不采用返回的结果
// promise 缺陷默认无法中断，只是不采用返回的结果
Promise.all([1, 2, fs.readFile('name.txt', 'utf-8'), fs.readFile('age.txt', 'utf-8')]).then(data => {
    console.log(data)
})

