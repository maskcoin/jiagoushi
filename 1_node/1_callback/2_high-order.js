// 函数柯里化  函数反柯里化


// 判断变量的类型
// 常用的判断类型的方法有四种：
// 1.typeof 不能判断对象类型 typeof [] typeof {}
// 2.constructor 可以找到这个变量是通过谁构造出来的
// 3.instanceof 判断谁是谁的实例 __proto__
// 4.Object.prototype.toString.call() 缺陷是不能细分是谁的实例

// function isType(value, type) {
//     return Object.prototype.toString.call(value) === `[object ${type}]`
// }

// 能不能将方法细分 isType => isString isArray
// console.log(isType([], 'Array'))

// function isType(type) {
//     return function (value) {
//         return Object.prototype.toString.call(value) === `[object ${type}]`
//     }
// }

// console.log(isArray([1, 2, 3]))
// console.log(isArray('hello'))

// 通过一个柯里化函数 实现通用的柯里化方法
function isType(type, value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
}

const currying = (fn, arr = []) => {
    let len = fn.length;
    return function (...args) { //高阶函数
        arr = [...arr, ...args]
        if (arr.length < len) {
            return currying(fn, arr)
        } else {
            return fn(...arr)
        }
    }
}

let isArray = currying(isType)('Array')
let isString = currying(isType)('String')

// console.log(isArray([]))
// console.log(isString('book'))

// function sum(a, b, c, d, e, f) {
//     return a + b + c + d + e + f
// }

// let r = sum(1, 2)(3, 4)(5)(6)

let fn1 = function (a, b, c) {
    console.log(arguments)
    return a + b + c
}

console.log(fn1(1, 2, 3))





