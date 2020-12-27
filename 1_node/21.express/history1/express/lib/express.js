const Application = require('./application')

// 1.创建应用的过程 和应用本身也要进行分离
// 2.我希望将路由和创建应用的过程做一个分离
function createApplication() {
    return new Application()
}

module.exports = createApplication