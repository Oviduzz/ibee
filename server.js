var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");

var Twitter = require('twitter');

// twitter dev app keys
var client = new Twitter({
    consumer_key: 'SslhXz9ojX6cwFlDbwkdWOCF1',
    consumer_secret: 'VGUqb9F4MgE8xZFB7yAEFlT10kKDcATxndKV39FIauMPnZpOQk',
    access_token_key: '828010236430651393-wzD0YJww6ANmqcNjJE3pc3R4BeKfoyq',
    access_token_secret: 'U0uHnmb416CRnGTYSZcRKQTkCpR2TZLj5lMz9jnTISK8g'
});

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


app.use(express.static(path.resolve(__dirname,'app')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res){

    res.sendFile(path.resolve(__dirname,'app/index.html'));
});


app.post('/api/tweets', function(req, res){
    if (!req.body) return res.sendStatus(400);
    
    client.get('statuses/user_timeline',{screen_name: req.body.screen_name, count: 5}, function(error, tweets, response) {
        if (!error) {
            res.send( { tweets: tweets });
        }

    });
    

});
app.post('/api/retweets/', function(req, res){
    var tweetId = req.body.id;
    if (!req.body) return res.sendStatus(400);
    
    client.post('statuses/retweet/' + tweetId +'.json', function(error, retweets, response) {
        if (!error) {
            res.send( { retweets: retweets });
        }

    });
});

app.post('/api/favorites/', function(req, res){
    if (!req.body) return res.sendStatus(400);
    
    client.post('favorites/create', {id: req.body.id}, function(error, favs, response) {
        if (!error) {
            res.send( { favorites: favs });
        }

    });
});


var port = 3030;
app.listen(port, function(){
    console.log('server running on port 3030');
});
