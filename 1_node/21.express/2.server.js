const express = require('./express')

const app = express()

app.get('/', function (req, res, next) {
    res.end('get ok')
})

app.post('/', function (req, res, next) {
    res.end('post ok')
})

app.put('/', function (req, res, next) {
    res.end('put ok')
})

app.delete('/', function (req, res, next) {
    res.end('delete ok')
})

app.options('/', function (req, res, next) {
    res.end('options ok')
})

app.listen(8080, () => {
    console.log('server started on 8080')
})