- 创建一个服务器必须要有 一个特定的ip地址 一个端口号
- 客户端给服务器发的request对象 （request客户端的信息）
- 服务端给客户端发信息response对象（response服务端可以给客户端写入数据）

- http 里面包含很多header信息  http 是基于tcp（http中header的应用）
- http特定 1.默认无状态的（cookie来管理状态） 2.http 1.1之后 keep-alive 不会断开连接 复用的策略 3.默认管线化 (不是一个个请求，是并发请求 可以提高发送请求的个数) 针对同一个域名 cdn的方式提高加载速度
- 缺点不安全 无法校验返回数据的完整性，https

- http服务

/user POST "{username:"zf", password: "zf"}"
/user GET
> 请求方法 GET（通过url参数传递数据）/ POST（请求体传递数据）(RESTFul风格)
    - get 请求获取数据
    - post 增加数据
    - delete 删除数据 
    - put 修改数据
    - options （请求什么时候出现）预检请求 跨域

- 跨域：协议 域名 端口号 有任一个不相等都是跨域 http://zf.cn http://a.zf.cn 也是跨域的
    - 跨域有哪些方式解决方案: cors 服务端解决跨域（添加跨域头） jsonp nginx（反向代理）websocket (ifram, window.name...，postMessage)

> 简单请求和复杂请求 get 和 post 默认就是简单请求(如果你增加了 自定义的header中的数据，会变成复杂请求)，其他的方法都是复杂请求 如果发送的是复杂请求并且跨域时，默认会先发送options请求

## 响应的状态码
101 websocket 创建链接时
200 成功了 204 成功了但是没有响应体 206 断点续传（返回部分数据）
301（永久重定向）302（临时重定向）304（服务器缓存）
404（客户端参数不正确）401（没有权限 没登陆） 403（没权限 登陆了没权限）405（服务器不支持此方法）
404（Not Found）
5xx 服务端的问题  

## 请求中 数据分为三部分（请求的报文）
- 请求行 请求方法 请求路径（pathname 后面的部分，#hash前面的内容），http version
    可以通过？传递参数
- 请求头 也可以传递数据 自定义的header
- 请求体 可以放数据  传递数据是二进制格式

## 响应中 数据分为三部分
- 响应行 http version 状态码 响应短语
- 响应头 自定义响应信息
- 响应体 返回给浏览器的内容


## http 基于tcp的协议（规范），在tcp的基础上增加了一些规范(header)
- 每个header有什么作用


- curl
- postman