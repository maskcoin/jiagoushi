// 流 有方向的 读 => 写 node中实现了stream模块
// 文件也想实现流，所以内部文件模块继承了stream模块
// const stream = require('stream')

const fs = require('fs')
const path = require('path')

const ReadStream = require('./readStream')

// 创建一个可读流（可读流对象），这个方法默认并不会读取内容
let rs = new ReadStream(path.resolve(__dirname, 'name.txt'), {
    flags: 'r',
    encoding: null,
    mode: 0o666,
    autoClose: true,
    start: 2, //2-8 包前又包后
    end: 8,
    highWaterMark: 3 //每次读取的个数
})

// 为了多个异步方法可以解耦，发布订阅模式
// 可读流继承了events模块，这里的名字必须叫data rs.emit('data') 如果监听了data，读文件的线程会不停的读取
// 达到最高水位线时，rs.emit('data')会发布事件，发布事件运行时会把回调函数传入到主线程的eventloop中

let bufferArr = []

rs.on('data', (chunk) => { // 默认会直到文件读取完毕
    rs.pause()
    setTimeout(() => {
        rs.resume()
    }, 1000);
    console.log('触发')
    bufferArr.push(chunk)
    console.log(chunk.toString())
})

rs.on('end', () => {
    console.log(Buffer.concat(bufferArr).toString())
})

rs.on('error', (err) => {
    console.log(err)
})

rs.on('open', (fd) => {
    // console.log(fd, '---')
})

rs.on('close', () => {
    console.log('close')
})

// 文件流有两个特殊的事件，不是文件流，是普通的流，就没有这两个事件
