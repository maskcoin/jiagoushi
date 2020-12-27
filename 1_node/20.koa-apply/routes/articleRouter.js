let Router = require('koa-router')
let Controller = require('../controller/articleController')
const router = new Router({ prefix: '/article' }) // 划分路由的作用域
const controller = new Controller()


router.get('/add', controller.add)

router.get('/remove', controller.remove)

module.exports = router