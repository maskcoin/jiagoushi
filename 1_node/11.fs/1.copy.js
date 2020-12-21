const fs = require('fs')
const path = require('path')

const copy = (source, target, callback) => {
    const SIZE = 3
    const buffer = Buffer.alloc(SIZE)
    let readOffset = 0
    let writeOffset = 0
    fs.open(source, 'r', (err, rfd) => {
        if (err) {
            return callback(err)
        }
        fs.open(target, 'a', (err, wfd) => {
            if (err) {
                return callback(err)
            }

            // 读和写的操作都耦合在一起了
            const next = () => {
                fs.read(rfd, buffer, 0, SIZE, readOffset, (err, bytesRead) => {
                    if (bytesRead !== 0) {
                        fs.write(wfd, buffer, 0, bytesRead, writeOffset, (err, written) => {
                            if (err) {
                                return callback(err)
                            }
                            readOffset += bytesRead
                            writeOffset += written
                            next()
                        })
                    } else {
                        fs.close(rfd, (err) => {
                            if (err) {
                                return callback(err)
                            }
                            fs.close(wfd, (err) => {
                                if (err) {
                                    return callback(err)
                                } else {
                                    callback(null)
                                }
                            })
                        })
                    }
                })
            }
            next()
        })
    })
}

// 不会淹没系统的可用内存，边读边写入的方式
copy(path.resolve(__dirname, 'name.txt'), path.resolve(__dirname, 'copy.txt'), (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('拷贝成功')
})