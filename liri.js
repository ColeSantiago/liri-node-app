require("dotenv").config();

const keys = require("./keys");

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

let params = {
  count: 20,
  exclude_replies: 'true'
}

let arg = process.argv[2];

// twitter api

	if (arg === 'my-tweets') {

		client.get("statuses/home_timeline", params, function(error, tweets, response) {

		// console.log(tweets);
			if (!error) {

				for (let i = 0; i < tweets.length; i++) {
			      
			      let date = tweets[i].created_at;
			      let text = tweets[i].text;

			      console.log('Date created: ' + date);
			      console.log('Tweet: ' + text);
			      
		     	}
		    }
		});
	};


// spotify api

	if (arg === 'spotify-this-song') {

		const argTwo = process.argv[3];

			if (argTwo) {
		
				spotify.search({ type: 'track', query: argTwo }, function(err, data) {

					if (!err) {

							console.log('Artist: ' + data.tracks.items[0].artists[0].name);
							console.log('Track: ' + data.tracks.items[0].name);
							console.log('Preview link: ' + data.tracks.items[0].preview_url);
							console.log('Album: ' + data.tracks.items[0].album.name);
					}

				})

			}

	}




		

