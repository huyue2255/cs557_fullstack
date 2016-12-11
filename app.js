var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
// var books = require("./models/BooksMongoDB")();
var books = require("./models/BooksDB")();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Added to parse the post data
app.use(bodyParser());

// Added session for authentication
var session = require('express-session');
app.use(session({
    secret: 'app',
    cookie: {
        maxAge: 60000
    }
}));

app.use(function (req, res, next) {
    /**
     if (req.session.cart === undefined) {
     req.session.cart = [];
     req.session.cart.push({id: 1, title: 'Java', price: 56.7, date: '3/15/2016'});
     req.session.cart.push({id: 2, title: 'JavasSript', price: 56.7, date: '3/15/2015'});
     req.session.cart.push({id: 3, title: 'PHP', price: 56.7, date: '3/15/2014'});
     books.init(req.session.cart);
     }
     **/
    req.books = books;
    next();
});

app.get('/api/get', require("./routes/api/get"));
app.post('/api/add', require("./routes/api/add"));
app.post('/api/edit', require("./routes/api/edit"));
app.post('/api/delete', require("./routes/api/delete"));
app.use('/admin', require("./routes/admin"));
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
