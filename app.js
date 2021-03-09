var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoute');
var bookRouter = require('./routes/bookRoute');
var instanceRouter = require('./routes/instanceRoute');

var app = express();

app.options('*', cors());
app.use(cors({ origin: true }));

var corsMiddleware = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, PUT, PATCH, POST, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, X-Requested-With, Authorization'
  );

  next();
};

app.use(corsMiddleware);
mongoose.connect(
  'mongodb+srv://satsangTest:kIxgwdtAZyYClS7A@cluster0-mdil5.mongodb.net/satsang?retryWrites=true&w=majority',
  () => console.log('DB Connected')
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', bookRouter);
app.use('/instances', instanceRouter);

module.exports = app;
