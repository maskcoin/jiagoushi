// 高阶函数
// 一个函数的参数 是一个函数（回调）
// 一个函数 返回一个函数 (拆分函数)

// 函数的before
// 希望将核心的逻辑提取出来，在外面再添加功能

// 重写原型上的方法
Function.prototype.before = function (beforeFn) {
    return () => {
        beforeFn()
        this()
    }
}

// AOP 切片 装饰
const say = () => {
    console.log('说话')
}

const newSay = say.before(() => {
    console.log('您好')
})

const newSay1 = say.before(() => {
    console.log('天气很好')
})

newSay()
newSay1()