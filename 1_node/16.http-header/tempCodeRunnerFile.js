const crypto = require('crypto')
console.log(crypto.createHash('md5').update('abc').digest('base64'))