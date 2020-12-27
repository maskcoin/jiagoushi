const context = {

}

function getter(target, key) {
    context.__defineGetter__(key, function () {
        return this[target][key]
    })
}

getter('request', 'url')
getter('request', 'path')
getter('request', 'query')

getter('response', 'body')

function setter(target, key) {
    context.__defineSetter__(key, function (val) {
        this[target][key] = val
    })
}

setter('response', 'body')

module.exports = context