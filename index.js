var express = require('express');
var app = express();
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index',
	{ title: 'Welcome to Tw-Graph' } );
});

app.listen(3000, function() { 
  console.log('Now listening on port 3000');
});
