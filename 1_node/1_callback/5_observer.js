// 观察者模式 有观察者  肯定有被观察者 观察者需要放到被观察者中（信号与槽函数表）被观察者的状态发生变化
// 需要通知观察者
// 内部也是基于发布订阅模式 收集观察者 状态变化后要通知观察者

class Subject { // 被观察者 小宝宝
    constructor(name) {
        this.name = name
        this.state = '开心的'
        this.observers = []
    }
    attach(o) {
        this.observers.push(o)
    }
    setState(state) {
        this.state = state
        this.observers.forEach(o => o.update(this))
    }
}
class Observer { // 观察者 我  我媳妇
    constructor(name) {
        this.name = name
    }
    update(s) {
        console.log(`当前${this.name}被通知了，${s.name}的状态变成了${s.state}`)
    }
}
// 我和我媳妇 需要观察小宝宝的心理状态的变化
let baby = new Subject('小宝宝')
let father = new Observer('爸爸')
let mother = new Observer('妈妈')
baby.attach(father)
baby.attach(mother)
baby.setState('哭了')




