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
    var config = require('./credentials.json');
    console.log(config);
    var client = new twit({
        consumer_key: config.tw_consumer_key,
        consumer_secret: config.tw_consumer_secret,
        access_token: config.tw_access_token,
        access_token_secret: config.tw_access_token_secret
    });
    var params = {screen_name: username, count: 200};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error){
            allTweets = tweets;
            lastId = tweets[tweets.length - 1].id_str;

            var params = {screen_name: username, count: 200, since_id: lastId};
            client.get('statuses/user_timeline', params, function(error, tweets, response){
                if (!error){
                    allTweets = allTweets.concat(tweets);
                    lastId = tweets[tweets.length - 1].id_str;
                    var params = {screen_name: username, count: 200, since_id: lastId};
                    client.get('statuses/user_timeline', params, function(error, tweets, response){
                        if (!error){
                            allTweets = allTweets.concat(tweets);
                            if (allTweets.length > 500){
                                allTweets = allTweets.slice(0, 500);
                            }
                            
                            distilledTweets = distillTweets(allTweets)
                            res.render('index.pug', {
                                title: 'Tweets from ' + username,
                                username: username,
                                tweets: distilledTweets,
                                tweetcount: allTweets.length
                            });
                        }
                        else {
                            console.log(error)
                        }
                    });
                }
                else {
                    console.log(error)
                }
            });
        }
        else {
            console.log(error)
        }
    })
}

var distillTweets = function(tweets){
    var list = {};
    tweets.forEach(function(tweet){
        var date = new Date(Date.parse(tweet.created_at));
        var hour = date.getHours();
        console.log(hour);

        if (list[hour]) list[hour]++;
        else list[hour] = 1; 
    });
    return list;
}