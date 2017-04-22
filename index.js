var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Welcome to Tw-Graph');
});

app.listen(3000, function() { 
  console.log('Now listening on port 3000');
});
