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

			      let tweetArray = [
			      'Date created: ' + date,
			      'Tweet: ' + text ];

			    	let tweetsInfo = JSON.stringify(tweetArray, null, 2);
					console.log(tweetsInfo);
					writeFile(tweetsInfo);
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

			// for loop so no quotations are needed for searches with more then one word
				for (let i = 3; i < song.length; i++) {
				  if (i > 3 && i < song.length) {
				    songSearch = songSearch + "+" + song[i];
				  } else {
				    songSearch += song[i];
				  }
				}

				spotify.search({ type: 'track', query: songSearch }, function(err, data) {

					if (!err) {

						let songSearchArray = [

						'Artist: ' + data.tracks.items[0].artists[0].name,
						'Track: ' + data.tracks.items[0].name,
						'Preview link: ' + data.tracks.items[0].preview_url,
						'Album: ' + data.tracks.items[0].album.name ];

						let songInfo = JSON.stringify(songSearchArray, null, 2);
						console.log(songInfo);
						writeFile(songInfo);

					}
				})

			} 

			// default song search if no user input

			if (!argTwo) {

				spotify.search({ type: 'track', query: 'swimming in the moonlight' }, function(err, data) {

					if (!err) {

						let defaultsongArray = [

						'Artist: ' + data.tracks.items[0].artists[0].name,
						'Track: ' + data.tracks.items[0].name,
						'Preview link: ' + data.tracks.items[0].preview_url,
						'Album: ' + data.tracks.items[0].album.name ];

						let defaultsongInfo = JSON.stringify(defaultsongArray, null, 2);
						console.log(defaultsongInfo);
						writeFile(defaultsongInfo);
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

			  			const ratingObject = JSON.parse(body).Ratings;

			    		let movieArray = [
			    		"Title: " + JSON.parse(body).Title,
			    		"Release Year: " + JSON.parse(body).Year,
			    		"IMDB Rating: " + JSON.parse(body).imdbRating,
			    		"Rotten Tomatoes Rating: " + (ratingObject[1].Value),
			    		"Country: " + JSON.parse(body).Country,
			    		"Language: " + JSON.parse(body).Language,
			    		"Plot: " + JSON.parse(body).Plot,
			    		"Actors: " + JSON.parse(body).Actors ];

			    		let movieInfo = JSON.stringify(movieArray, null, 2);
						console.log(movieInfo);
						writeFile(movieInfo);
			  		}
				})
		}

		// default movie search if no user input

		if (!argTwo) {

				const queryUrl = "http://www.omdbapi.com/?t=serenity&y=&plot=short&apikey=trilogy";

				request(queryUrl, function(error, response, body) {

			  		if (!error && response.statusCode === 200) {

			  			const ratingObject = JSON.parse(body).Ratings;

			    		let defaultMovieArray= [
			    		"Title: " + JSON.parse(body).Title,
			    		"Release Year: " + JSON.parse(body).Year,
			    		"IMDB Rating: " + JSON.parse(body).imdbRating,
			    		"Rotten Tomatoes Rating: " + (ratingObject[1].Value),
			    		"Country: " + JSON.parse(body).Country,
			    		"Language: " + JSON.parse(body).Language,
			    		"Plot: " + JSON.parse(body).Plot,
			    		"Actors: " + JSON.parse(body).Actors ];

			    		let defaultMovie = JSON.stringify(defaultMovieArray, null, 2);
						console.log(defaultMovie);
						writeFile(defaultMovie);
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

						let randomSongArray = [
							'Artist: ' + data.tracks.items[0].artists[0].name,
							'Track: ' + data.tracks.items[0].name,
							'Preview link: ' + data.tracks.items[0].preview_url,
							'Album: ' + data.tracks.items[0].album.name];

						let randomSongs = JSON.stringify(randomSongArray, null, 2);
						console.log(randomSongs);
						writeFile(randomSongs);


					}
				})
			}
		})

	}

// function to log results onto text file
	
	function writeFile(data) { 
		fs.appendFile('./log.txt', data, function(err) {
						  
			if (err) {
				console.log(err);
			} 
		})
	}



		

