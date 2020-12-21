#! /usr/local/bin/node
const Server = require('../src/server')


let argv = require('yargs')
    .option('p', {
        alias: 'port',
        default: 8080,
        describe: 'set your server port',
        type: 'number'
    })
    .option('d', {
        alias: 'directory',
        default: process.cwd(),
        describe: 'set your hostname',
        type: 'string'
    })
    .option('h', {
        alias: 'host',
        default: 'localhost',
        describe: 'set your start directory',
        type: 'string'
    })
    .argv

let { port, directory, host } = argv
let config = { port, directory, host }

let server = new Server(config)
server.start()


