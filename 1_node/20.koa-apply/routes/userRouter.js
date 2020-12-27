const Router = require('koa-router')
const router = new Router({ prefix: '/user' }) // 划分路由的作用域
const Controller = require('../controller/userController')
const controller = new Controller()

router.get('/add', controller.add)

router.get('/remove', controller.remove)

module.exports = router