function EventEmitter() {
    this._events = {}
}
EventEmitter.prototype.on = function (eventName, callback) {
    if (!this._events) {
        this._events = {}
    }
    if (eventName !== 'newListener') {
        this.emit('newListener', eventName, callback)
    }
    if (!this._events[eventName]) {
        this._events[eventName] = []
    }
    this._events[eventName].push(callback)
}
EventEmitter.prototype.off = function (eventName, callback) {
    if (this._events && this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(cb => (cb !== callback && cb.l !== callback))
    }
}
EventEmitter.prototype.emit = function (eventName, ...args) {
    if (this._events && this._events[eventName]) {
        this._events[eventName].forEach(event => {
            event(...args)
        });
    }
}
EventEmitter.prototype.once = function (eventName, callback) {
    let newcb = (...args) => {
        callback(...args)
        this.off(eventName, newcb)
    }
    newcb.l = callback
    this.on(eventName, newcb)
}
module.exports = EventEmitter