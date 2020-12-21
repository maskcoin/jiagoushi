// 服务端可以操作二进制 Buffer 可以和字符串进行相互转化
// Buffer代表的都是二进制数据 内存 （buffer不能扩容）

// 1.buffer的三种声明方式 通过长度来声明（大小）
// const buffer = Buffer.alloc(5)
// const buffer1 = Buffer.from('珠峰') //根据汉字来转换成buffer
// const buffer2 = Buffer.from([0x16, 0x32])
// console.log(buffer2)

// console.log(Buffer.isBuffer(buffer1))

// 文件操作 索引修改 更改内部内容 拼接buffer

// slice()
// length 可以获取buffer字节的长度
// Buffer.isBuffer

// Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart, sourceEnd) {
//     for (let index = sourceStart; index < sourceEnd; index++) {
//         targetBuffer[targetStart++] = this[index];
//     }
// }

const buf1 = Buffer.from('珠峰') //根据汉字来转换成buffer
const buf2 = Buffer.from('架构')
// const bigBuf = Buffer.alloc(12)
// buf1.copy(bigBuf, 0, 0, 6)
// buf2.copy(bigBuf, 6)

// console.log(bigBuf.toString())

Buffer.concat = function (bufferList, length = bufferList.reduce((accumulator, currentValue) => accumulator + currentValue.length, 0)) {
    let buffer = Buffer.alloc(length)
    let offset = 0
    bufferList.forEach(buf => {
        buf.copy(buffer, offset)
        offset += buf.length
    });

    return buffer.slice(0, offset)
}


let bigbuf = Buffer.concat([buf1, buf2, buf1, buf2])
console.log(bigbuf.toString())



// let buf = buffer.slice(0, 1)
// buf[0] = 100
// console.log(buffer)



// let myArr = [1, 2, 3]
// let arr = [myArr, 2, 3]
// let newArr = arr.slice(0)
// newArr[0][0] = 100
// console.log(myArr)