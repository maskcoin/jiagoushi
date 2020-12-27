const mongoose = require('mongoose')

// 1.连接mongodb，返回连接成功后的对象
let conn = mongoose.createConnection('mongodb://maskcoin:maskcoin@localhost:27017/school', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) // 创建连接

conn.on('connected', () => {
    console.log('连接成功了')
})

// 主要的目的是操作数据 增删

// 1.增加数据 mongo 可以随机存储 （第一个对象可以有100个字段，第二个可以有200个字段）
// Schema 骨架 根据这个骨架来创建内容 
let studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    age: Number,
    birthday: {
        type: Date,
        default: Date.now
    }
})

// 通过骨架 来创建模型=>集合
let student = conn.model('students', studentSchema)

// 模型可以操作数据，多的字段不会插入，少的就是空
student.create({
    username: 'zf',
    aa: 1,
    password: 'zf',
    age: 11
}).then(doc => {
    console.log(doc)
    conn.close()
})

// mongo 库 （数据库）-> 集合（表）-> 文档（内容）
