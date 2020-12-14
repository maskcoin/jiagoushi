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

const resolvePromise = (x, promise2, resolve, reject) => {

}

class Promise {
    constructor(executor) {
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
            console.log(error, 'inner')
            reject(error)
        }
    }

    // 1. promise 成功和失败的回调的返回值 可以传递到外层的then
    // 2. 如果返回的是普通值的话（传递到下一次的成功中），throw出错的情况（传递到下一次的失败），可能还有promise的情况，
    // (会采用promise的状态，决定下一次的成功还是失败)
    // 3. 错误处理，如果离自己最近的then 没有错误处理(没有写错误处理函数) 会向下找
    // 4. 每次执行完promise.then方法后返回的都是一个新的promise
    then(onFulfilled, onRejected) {
        // 为了实现链式调用
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            }
        })

        return promise2
    }
}

module.exports = Promise
