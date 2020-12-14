// node和前端的区别 前端里面有dom bom 服务器中没有window

// 服务端中有global
// console.log(Object.keys(global))

// console.log(global.process)
// 1.process 默认取值时，会在global中去查找，node中有模块化系统，以文件为单位的，模块中的this被更改了
// console.log(process.platform)
// console.log(process.argv)
// console.log(process.cwd())
// console.log(process.env)
// console.log(process.nextTick)
// let args = process.argv.slice(2)
// console.log(args)
// let obj = {}
// args.forEach((item, index) => {
//     if (item.startsWith('--')) {
//         obj[item.slice(2)] = args[index + 1]
//     }
// });
// console.log(obj)

// (commander TJ) (yargs webpack)

// const commander = require('commander') // -- 开头的是key 不带--的是值
// commander.option('-p, --port <v>', 'set your port', 8080)
// let r = commander.parse(process.argv)
// console.log(r)
// console.log(__dirname) //__dirname 当前文件所在的目录

// node中自己实现的微任务
// console.log(process.nextTick + '')

// setTimeout(() => {
//     console.log(2)
// }, 0);

// node中还增加了一个queueMicrotask 微任务
// queueMicrotask(() => {
//     console.log(1)
// })

// node中的 setImmediate

// 常见面试题 node中的事件环和浏览器中的区别

// 微任务有哪些 宏任务有哪些

// 浏览器的eventloop和node的eventloop 执行效果现在是一致的了
// setTimeout(() => { // 进入事件环时，setTimeout 有可能没有完成
//     console.log('time out')
// }, 0);

// setImmediate(() => {
//     console.log('setImmediate')
// })

// process.nextTick 并不属于事件环的一部分 在本轮代码执行后执行
// process.nextTick是一个微任务，比promist.then()的微任务更快一些
setTimeout(() => {
    console.log(1)
    Promise.resolve().then(() => {
        console.log('then')
    })
    process.nextTick(() => {
        console.log('nextTick')
    })
}, 0);

setTimeout(() => {
    console.log(2)
}, 0);

