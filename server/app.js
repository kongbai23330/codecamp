var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const mongoose = require('mongoose')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var postsRouter = require('./routes/posts')
var app = express()
const cors = require('cors')
app.use(cors())

const mongoDB = 'mongodb://localhost:27017/CodeCamp2024'
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/posts', postsRouter)
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

module.exports = app
