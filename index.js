var express = require('express');
var app = express();
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  var username = "no username entered";
  if (req.query.username){
  	username = req.query.username;
  }
  res.render('index', { 
    title: 'Welcome to Tw-Graph', 
    username: username
  } );
});

app.listen(3000, function() { 
  console.log('Now listening on port 3000');
});
