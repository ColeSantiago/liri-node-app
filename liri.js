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

client.get("statuses/home_timeline", params, function(error, tweets, response) {

	// console.log(tweets);

	if (!error) {

		 for (let i = 0; i < tweets.length; i++) {
	      
	      let date = tweets[i].created_at
	      let text = tweets[i].text

	      console.log(date);
	      console.log(text);
	     
	     
     	}
    }

});

		

