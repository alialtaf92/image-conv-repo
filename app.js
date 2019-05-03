// var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
// var logger = require('morgan')
var routes = require('./config/routes')
var logger = require('./helpers/logger')
var catchMe = require('./middlewares/catch')
require('dotenv').config()

// Import the mongoose module
var socketIo   = require( "socket.io" );
var app = express()
app.disable('etag')
var io = socketIo();

app.io = io;
global.io = io
// app.use(logger('dev'))
app.use(express.json(({limit: '50mb', extended: true})))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Set up default mongoose connection
// var mongoDB = ''
// if (!process.env.ENVIRONMENT || process.env.ENVIRONMENT === 'development') {
//     mongoDB = 'mongodb://localhost/arthur'
// } else {
//     addAuthDB = process.env.ENVIRONMENT === 'staging' ? '?authSource=admin' : ''
//     mongoDB = 'mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS + '@' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DATABASE + addAuthDB
// }
//
// console.log('mongoDB is : ', mongoDB);
// mongoose.connect(mongoDB)
// // Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise
//
// // Get the default connection
// var db = mongoose.connection
//
// // Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.use(catchMe)
routes(app)

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404))
// })

// error handler
app.use(function (err, req, res, next) {
  logger.error(err)
  res.status(err.status || 500)
  res.json(err)
})

module.exports = app
