#!/usr/local/bin/node
console.log(process.argv.slice(2).reduce((accumulator, currentValue) => accumulator += currentValue))