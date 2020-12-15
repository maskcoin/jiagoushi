// 发布订阅  事件驱动，事件通知 发布订阅模式
// node中自己实现了一个发布订阅
const EventEmitter = require('events')

const util = require('util')

function Girl() {

}

util.inherits(Girl, EventEmitter)

let girl = new Girl()

girl.on('newListener', (eventName) => { // newListener
    if (eventName === '女生失恋') {
        process.nextTick(() => {
            girl.emit(eventName)
        })
        // girl.emit(eventName)
    }
})

const cry = () => {
    console.log('哭')
}

const eat = () => {
    console.log('吃')
}

// 发布订阅“发布” “订阅” [fn, fn, fn...]
girl.on('女生失恋', cry)

girl.on('女生失恋', eat)

// girl.off('女生失恋', cry)

// console.log(girl._events)

// girl.emit('女生失恋', '小美')
// girl.emit('女生失恋', '小美')

// on emit off once newListener 发布订阅模式中应该有的方法（好处：可以实现解耦合）


