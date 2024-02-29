var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');

var app = express();

const PORT = 6000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
