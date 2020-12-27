const express = require('./express')

const app = express()

app.get('/', function (req, res, next) {
    res.end('get ok')
})

app.post('/', function (req, res, next) {
    res.end('post ok')
})

app.listen(8080, () => {
    console.log('server started on 8080')
})