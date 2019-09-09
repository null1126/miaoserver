var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')


var { Mongoose } = require('./untils/config')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

Mongoose.connect()

//配置session
app.use(session({
    secret: 'keyboard cat', //加密设置
    name: 'sessionId', //指定一个名字
    resave: false,
    saveUninitialized: false,
    cookie: {
        //设置过期时间 为一小时
        maxAge: 1000 * 60 * 60
    }
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//普通用户路由接口
app.use('/api2/users', usersRouter);
//管理员路由接口
app.use('/api2/admin', adminRouter)

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