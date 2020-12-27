// 整合
const combineRoutes = require('koa-combine-routers')
let articleRouter = require('./articleRouter')
let userRouter = require('./userRouter')

module.exports = combineRoutes(articleRouter, userRouter)

