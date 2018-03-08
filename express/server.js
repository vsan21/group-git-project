var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var server = express();

//View Engine
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

//Global Vars
server.use(function(req, res, next) {
  res.locals.errors = null;
  next();
})

//Body Parser Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

//Express Validator Middleware
server.use(expressValidator());

server.get('/', function(req, res) {
  res.render('index');
});

server.post('/url', function(req, res){

  req.checkBody('name', 'Name is Required').notEmpty();
  req.checkBody('email', 'Email is Required').notEmpty();

  var errors = req.validationErrors();

  if(errors) {
    res.render('index', {
      errors: errors
    })
  } else {
    var newUser = {
      name: req.body.name,
      email: req.body.email
    }
    console.log(newUser);
  }

  // var email = req.body.email;
  //
  // res.send();
});

server.listen(3000, function(){
  console.log('Server Started on Port 3000....')
})
