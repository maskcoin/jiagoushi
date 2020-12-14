// promise就是一个类
// 1.promise 有三个状态：成功态(resoved) 失败态(rejected) 等待态(pending)
// 2.用户自己决定失败的原因和成功的原因 成功和失败也是用户定义的
// 3.promise 默认执行器立即执行
// 4.promise的实例都拥有一个then方法，一个参数是成功的回调，另一个是失败的回调
// 5.如果执行函数时发生了异常，也会执行失败逻辑
// 6.如果promise一旦成功就不能再失败，反过来也一样（只有pending态的适合才能去更改状态）

const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'

class Promise {
    constructor(executor) {
        console.log('my')
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = [] // 专门用来存放成功的回调
        this.onRejectedCallbacks = [] // 专门用来存放失败的回调
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject) // 立即执行
        } catch (error) {
            // console.log(error)
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        if (this.status === RESOLVED) {
            onFulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
        if (this.status === PENDING) {
            this.onResolvedCallbacks.push(() => {
                // todo...
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                // todo...
                onRejected(this.reason)
            })
        }
    }
}

module.exports = Promise
