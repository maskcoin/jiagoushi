## koa和express的区别
- Koa 内部原理用es6 来编写（promise async+await） express es5代码编写（内部是基于回调实现的）
- Express 内置了很多中间件（功能会比koa强大一些 内部就集成了路由 静态服务 模版引擎）express本身会大一些（koa主要关注核心）
- koa(promise) 和 express(回调) 中间件有一些差异 错误处理也不一样
- webpack-dev-server 内部使用的是express
- Koa ctx 上下文（req, res, request, response）
- express 直接对req和res进行了扩展