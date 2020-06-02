var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const DAL = require('./dataAccessLayer');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const PORT = process.env.PORT;
var cors = require('cors');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var app = express();
DAL.Connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// Get all endpoint
app.get('/api/schedules', cors(), async function(req, res) {

  const result = await DAL.Find();

  res.send(result);
});

// get by id endpoint
app.get('/api/schedules/:id', cors(), async function(req, res) {
  const id = req.params.id;
  const schedule = {
    _id: ObjectId(id)
  };
  const result = await DAL.Find(schedule);
  if (result) {
    res.send(result);
  }
  else {
    res.send('No schedule with ID: ' + id + ' found!');
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, function(){
  console.log('Server is running on port:', PORT);
});

module.exports = app;