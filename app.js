var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var welcomeRouter = require('./routes/welcome');
var catalogRouter = require('./routes/catalog');
var buyTicketRouter = require('./routes/buyTicket');
var listTemplatesRouter = require('./routes/listTemplates');
var deleteLessonPlanRouter = require('./routes/deleteLessonPlan');
var createLessonPlanRouter = require('./routes/createLessonPlan');
var sendLessonPlanRouter = require('./routes/sendLessonPlan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/welcome', welcomeRouter);
app.use('/catalog', catalogRouter);
app.use('/buyTicket', buyTicketRouter);
app.use('/listTemplates', listTemplatesRouter);
app.use('/deleteLessonPlan', deleteLessonPlanRouter);
app.use('/createLessonPlan', createLessonPlanRouter);
app.use('/sendLessonPlan', sendLessonPlanRouter);

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

module.exports = app;