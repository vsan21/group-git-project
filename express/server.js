var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
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
    // var newUser = {
    //   name: req.body.name,
    //   email: req.body.email
    // }
  //   // console.log(newUser);
    // console.log(req.body);
    const output = `
           <p>Here's the link to the resources doc you requested.<p>
           <a href="https://docs.google.com/document/d/1XDDsqAiT0WRTMoESiidBEgR_niBPyZJWWudoSTpJRtc/edit?usp=sharing">Resource Link</a>
           `;
  }

  // var email = req.body.email;
  //
  // res.send();


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    port: 587, // port for secure SMTP
    secure: false,
    auth: {
        user: "fake23480@gmail.com",
        pass: "fakegmail"
    },
    tls:{
      rejectUnauthorized: false
    }
});

// setup e-mail data with unicode symbols
let mailOptions = {
    from: "Git Ladies  ✔ <fake23480@gmail.com>", // sender address
    to: req.body.email, // list of receivers
    subject: "More Resources WOOO", // Subject line
    text: "Hello World?",
    html: output // html body
};

transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('index');

      });
});

server.listen(3000, function(){
  console.log('Server Started on Port 3000....')
});
