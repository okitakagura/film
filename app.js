var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var data;
MongoClient.connect(url,{useNewUrlParser:true},function (err,db) {
    if(err) throw err;
    var dbo = db.db("tencent");
    dbo.collection("jobs").find({}).toArray(function (err,result) {
        if(err) throw err;
        data = result;
        db.close();
    })
});

app.get('/123',function(req,res){
  res.status(200),
  res.json(data)
});

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});


module.exports = app;
