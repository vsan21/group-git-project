var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var server = express();

//View Engine
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

//Express Validator Middleware
server.use(expressValidator());

server.get('/', function(req, res) {
  res.render('index');
});

// server.post('/url', function(req, res){
//   console.log(req.body.email);
// })

server.listen(3000, function(){
  console.log('Server Started on Port 3000....')
})
