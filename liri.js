require("dotenv").config();

const keys = require("./keys");

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require("request");
const fs = require("fs");

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

let arg = process.argv[2];

//directions if user input is blank

	if (!arg) {

		console.log('Search for my latest tweets: my-tweets');
		console.log('Search for a song on spotify: spotify-this-song <name of song>');
		console.log('Search for a movie on IMDB: movie-this <name of movie>');
		console.log('Or: do-what-it-says');
	}

// twitter api

let params = {
  count: 20,
  exclude_replies: 'true'
}

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

		let argTwo = process.argv[3];

			if (typeof argTwo === 'string') {

				let song = process.argv;
				let songSearch = "";

				for (let i = 3; i < song.length; i++) {

				  if (i > 3 && i < song.length) {

				    songSearch = songSearch + "+" + song[i];

				  } else {

				    songSearch += song[i];

				  }
				}

				spotify.search({ type: 'track', query: songSearch }, function(err, data) {

					if (!err) {

							console.log('Artist: ' + data.tracks.items[0].artists[0].name);
							console.log('Track: ' + data.tracks.items[0].name);
							console.log('Preview link: ' + data.tracks.items[0].preview_url);
							console.log('Album: ' + data.tracks.items[0].album.name);
					}
				})

			} 

			if (!argTwo) {

				spotify.search({ type: 'track', query: 'swimming in the moonlight' }, function(err, data) {

					if (!err) {

						console.log('Artist: ' + data.tracks.items[0].artists[0].name);
						console.log('Track: ' + data.tracks.items[0].name);
						console.log('Preview link: ' + data.tracks.items[0].preview_url);
						console.log('Album: ' + data.tracks.items[0].album.name);
					}
				})
			}

	}

// omdb api

	if (arg === 'movie-this') { 

		let argTwo = process.argv[3];

			if (typeof argTwo === 'string') {

				let movie = process.argv;
				let movieSearch = "";

				for (let i = 3; i < movie.length; i++) {

				  if (i > 3 && i < movie.length) {

				    movieSearch = movieSearch + "+" + movie[i];

				  } else {

				    movieSearch += movie[i];

				  }
				}

				const queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";

				request(queryUrl, function(error, response, body) {

			  		if (!error && response.statusCode === 200) {

			    		console.log("Title: " + JSON.parse(body).Title);
			    		console.log("Release Year: " + JSON.parse(body).Year);
			    		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

			    		const ratingObject = JSON.parse(body).Ratings;
			    		console.log("Rotten Tomatoes Rating: " + (ratingObject[1].Value));

			    		console.log("Country: " + JSON.parse(body).Country);
			    		console.log("Language: " + JSON.parse(body).Language);
			    		console.log("Plot: " + JSON.parse(body).Plot);
			    		console.log("Actors: " + JSON.parse(body).Actors);

			  		}
				})
		}

		if (!argTwo) {

				const queryUrl = "http://www.omdbapi.com/?t=serenity&y=&plot=short&apikey=trilogy";
				console.log(queryUrl);

				request(queryUrl, function(error, response, body) {

			  		if (!error && response.statusCode === 200) {

			    		console.log("Title: " + JSON.parse(body).Title);
			    		console.log("Release Year: " + JSON.parse(body).Year);
			    		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

			    		const ratingObject = JSON.parse(body).Ratings;
			    		console.log("Rotten Tomatoes Rating: " + (ratingObject[1].Value));

			    		console.log("Country: " + JSON.parse(body).Country);
			    		console.log("Language: " + JSON.parse(body).Language);
			    		console.log("Plot: " + JSON.parse(body).Plot);
			    		console.log("Actors: " + JSON.parse(body).Actors);

			  		}
				})
		}

	};

// fs read file

	if (arg === 'do-what-it-says') {

		fs.readFile("random.txt", "utf8", function(error, data) {

			if (!error) {

				let randomSong = data

				spotify.search({ type: 'track', query: randomSong }, function(err, data) {

					if (!err) {

							console.log('Artist: ' + data.tracks.items[0].artists[0].name);
							console.log('Track: ' + data.tracks.items[0].name);
							console.log('Preview link: ' + data.tracks.items[0].preview_url);
							console.log('Album: ' + data.tracks.items[0].album.name);
					}
				})
			}
		})

	}
	




		

