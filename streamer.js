var twitter = require('twitter'),
    habitat = require('habitat');

var env = habitat.load('.env'),
    twit = new twitter({
        consumer_key: env.get('consumer_key'),
        consumer_secret: env.get('consumer_secret'),
        access_token_key: env.get('access_token'),
        access_token_secret: env.get('access_token_secret')
    });

twit.stream('statuses/filter', { track: '#constantweetsselfie' }, function(stream) {
    stream.on('data', function(data) {
        console.log('New hashtag posted by ' + data.user.name);
    });
});

