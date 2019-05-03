'use strict'

const bunyan = require('bunyan')

let log = bunyan.createLogger({
  name: 'http-listener',
  streams: [
    {
      level: 'info',
      stream: process.stdout // log INFO and above to stdout
    },
    {
      level: 'error',
      stream: process.stdout
    },
    // {
    //   level: 'error',
    //   path: '/var/tmp/http-listener-error.log' // log ERROR and above to a file
    // }
  ]
})

module.exports = log
