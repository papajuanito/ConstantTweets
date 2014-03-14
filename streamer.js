var twitter = require('twitter'),
    habitat = require('habitat'),
    levelup = require('levelup');

var env = habitat.load('.env'),
    twit = new twitter({
        consumer_key: env.get('consumer_key'),
        consumer_secret: env.get('consumer_secret'),
        access_token_key: env.get('access_token'),
        access_token_secret: env.get('access_token_secret')
    });

var tweet_db = levelup('./mydb');

twit.stream('statuses/filter', { track: '#constantweetsselfie' }, function(stream) {
    stream.on('data', function(data) {
        var ops = [
            { type: 'put', key: 'tweet_id', value: data.id_str }
          , { type: 'put', key: 'tweet_id', value: data.created_at }
          , { type: 'put', key: 'text', value: data.text }
          , { type: 'put', key: 'user_image', value: data.user.profile_image_url }
          , { type: 'put', key: 'user_id', value: data.user.id_str }
        ];

        tweet_db.batch(ops, function(err) {
            if(err) console.log(err);
            tweet_db.get('text', function(err, value) {
                console.log(value);
            });
        });
    });
});
