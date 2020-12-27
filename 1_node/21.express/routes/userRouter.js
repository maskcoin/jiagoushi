const express = require('../express')

let router = express.Router() // 是个构造函数

router.get('/add', (req, res) => {
    res.end('/user-add')
})

router.get('/remove', (req, res) => {
    res.end('/user-remove')
})

module.exports = router