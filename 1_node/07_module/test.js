function a(obj) {
    let str = '';
    with (obj) {
        str += `<!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
   </head>
   
   <body>
       
   `
        arr.forEach(item => {
            str += `
   
       <li>1</li>
       
   `
        })
        str += `
   
   </body>
   
   </html>`}
    return str;
}

console.log(a({ arr: [1, 2, 3] }))

// 1.需要把字符串中的{%%}替换掉，并且拼出一个结果的字符串，new Function的方式 with