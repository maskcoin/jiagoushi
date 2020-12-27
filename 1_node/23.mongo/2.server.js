const mongoose = require('mongoose')

const conn = mongoose.createConnection('mongodb://maskcoin:maskcoin@localhost:27017/school', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
conn.on('connected', () => {
    console.log('数据库连接成功')
})

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
    },
    hobby: []
})

let student = conn.model('students', studentSchema);

(async () => {
    // （1）插入操作
    // 批量的插入 要采用数组的方式可以实现多次的插入合并成一次操作
    // let arr = []
    // for (let i = 0; i < 10; i++) {
    //     arr.push({
    //         username: 'zf' + i,
    //         password: 'zf' + i,
    //         age: i
    //     })
    // }
    // let r = await student.create(arr)
    // console.log(r)
    // conn.close()

    // (2)查询操作 findOne是查询一个，find是查询一组
    // let r = await student.findOne({ username: 'zf1' }, { username: 1, password: 1 })
    // let r = await student.findById("5fe80cd26301618d070078df")
    // console.log(r)

    // 写项目是不需要close，此处为了演示方便

    // (3)修改操作 操作符 参数（查询条件，修改成的结果）
    // 修改所有年龄大于6的年龄都增加10
    let r = await student.updateOne({ age: { $gt: 6 } }, { $inc: { age: 10 } });
    console.log(r)
    conn.close()
})()