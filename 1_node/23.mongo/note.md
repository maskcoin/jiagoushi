## 关系型数据库 非关系型数据库
- mysql oracle sqlServer 用一种关系模型来组织数据的数据库（查询方便 不方便扩展）
- 非关系 Nosql Mongo redis memcache （不同于传统的关系数据库）

## mongo特点
- 分布式，文档类型，值就是传统的对象类型 key=>value BSON 存储复杂结构的数据
- 性能高 不需要通过SQL层来进行解析(分析的过程，操作的过程，浪费性能)，数据之间没有耦合，可以方便扩展。不适合复杂的查询

> 简单 前端操作对象的感觉

## mongo的安装方式

## mongo的语句
- 都用线上数据库（1）创建数据库 角色 先弄个根用户 (2)再创建一个数据库 分配这个数据库的权限
- show dbs 显示所有的数据库（默认免密的）
- use admin（如果不存在也可以使用）
- show collections
- db.system.users.find({})
- db.system.users.deleteOne({查询条件})
- db.createUser({user:'root', pwd:'root', roles:['root']})
- db.student.insert({name:'zf', age:11})
- db.student.find()
- use admin
- db.auth('root','root')

- 需要在/usr/local/etc/mongod.conf文件中添加：
    security:
        authorization: enabled


> 默认可以在admin中创建根用户，创建其他数据库，在针对某个数据库中，创建用户，赋予当前权限，下次链接这个数据库时可以登录这个账号

## robo 3T
- https://robomongo.org/