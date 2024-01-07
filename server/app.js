var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var app = express();
const cors = require('cors');
app.use(cors());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CodeCamp2024', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/posts', postsRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

var postSchema = new mongoose.Schema({
    title: String,
    content: String,
    images: [String], // Array of image paths or URLs
    createdAt: { type: Date, default: Date.now }
});

var Post = mongoose.model('Post', postSchema);

module.exports = app;
