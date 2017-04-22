var express = require('express');
var twit = require('twit');
var app = express();
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  var username = "no username entered";
  if (req.query.username){
    username = req.query.username;
    renderHistogram(username, res);
  }
  
});

app.listen(3000, function() { 
  console.log('Now listening on port 3000');
});

var renderHistogram = function (username, res){
    var twit = require('twit');
    var config = require('./creds.json');
    console.log(config);
    var client = new twit({
        consumer_key: config.tw_consumer_key,
        consumer_secret: config.tw_consumer_secret,
        access_token: config.tw_access_token,
        access_token_secret: config.tw_access_token_secret
    });
    var params = {screen_name: 'norvinyecla', count: 100};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error){
            console.log(tweets);
            res.render('index', { 
                title: 'Welcome to Tw-Graph', 
                username: username,
                tweets: tweets
            });
        }
        else {
            console.log(error)
        }
    });
    
}