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
};

// twitter api
// This goes to the timeline of the user provided, grabs the 20 latest tweets, and console logs them onto the command line
let params = {
  count: 20,
  exclude_replies: 'true',
  user_id: 'coletsantiagot1'
}
if (arg === 'my-tweets') {
	client.get("statuses/user_timeline", params, function(error, tweets, response) {
		if (!error) {	
			for (let i = 0; i < tweets.length; i++) {
			    const tweetObject = {
			      	Date: tweets[i].created_at,
			      	Tweet: tweets[i].text, 
					printTweets: function() {
					    console.log(`Date Created: ${this.Date}`);
					    console.log(`Tweet: ${this.Tweet}`);
					    writeFile(`Tweet: ${this.Tweet}`);
					    writeFile(`Date Created: ${this.Date}`);
					}
		     	}
		     	tweetObject.printTweets();		
		     }
		}
	});
};

// spotify api
if (arg === 'spotify-this-song') {
	let argTwo = process.argv[3];
		// so no quotations are needed for searches with more then one word
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
			// Takes in the user input and searches for the song on spotify, and console logs the results
			spotify.search({ type: 'track', query: songSearch }, function(err, data) {
				if (!err) {
					let songSearchObject = {
						Artist: data.tracks.items[0].artists[0].name,
						Track: data.tracks.items[0].name,
						Preview: data.tracks.items[0].preview_url,
						Album: data.tracks.items[0].album.name, 
						printSong: function() {
							console.log(`Artist: ${this.Artist}`);
							console.log(`Track: ${this.Track}`);
							console.log(`Preview URL: ${this.Preview}`);
							console.log(`Album: ${this.Album}`);
							// updates text file
							writeFile(`Artist: ${this.Artist}`);
							writeFile(`Track: ${this.Track}`);
							writeFile(`Preview URL: ${this.Preview}`);
							writeFile(`Album: ${this.Album}`);
						}
					}
					songSearchObject.printSong();
				}
			})

		} 
		// default song search if no user input
		if (!argTwo) {
			spotify.search({ type: 'track', query: 'swimming in the moonlight' }, function(err, data) {
				if (!err) {
					let songSearchObject = {
						Artist: data.tracks.items[0].artists[0].name,
						Track: data.tracks.items[0].name,
						Preview: data.tracks.items[0].preview_url,
						Album: data.tracks.items[0].album.name, 
						printSong: function() {
							console.log(`Artist: ${this.Artist}`);
							console.log(`Track: ${this.Track}`);
							console.log(`Preview URL: ${this.Preview}`);
							console.log(`Album: ${this.Album}`);
							// updates text file
							writeFile(`Artist: ${this.Artist}`);
							writeFile(`Track: ${this.Track}`);
							writeFile(`Preview URL: ${this.Preview}`);
							writeFile(`Album: ${this.Album}`);
						}
					}
					songSearchObject.printSong();
				}
			})
		}
};

// omdb api
if (arg === 'movie-this') { 
	let argTwo = process.argv[3];
		// so no quotation marks are needed on the users side
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
			// takes in the user search, gets everything from the json objects and console logs the result
			const queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";
			request(queryUrl, function(error, response, body) {
			  	if (!error && response.statusCode === 200) {
			  		const ratingObject = JSON.parse(body).Ratings;
			    	let movieObject = {
				    	Title: JSON.parse(body).Title,
				    	releaseYear: JSON.parse(body).Year,
				    	imdbRating: JSON.parse(body).imdbRating,
				    	rottenTomatoesRating: ratingObject[1].Value,
				    	Country: JSON.parse(body).Country,
				    	Language: JSON.parse(body).Language,
				    	Plot: JSON.parse(body).Plot,
				    	Actors: JSON.parse(body).Actors,
				    	printMovie: function() {
				    		console.log(`Title: ${this.Title}`);
				    		console.log(`Release Year: ${this.releaseYear}`);
				    		console.log(`IMDB Rating: ${this.imdbRating}`);
				    		console.log(`Rotten Tomatoes Rating: ${this.rottenTomatoesRating}`);
				    		console.log(`Country: ${this.Country}`);
				    		console.log(`Language: ${this.Language}`);
				    		console.log(`Plot: ${this.Plot}`);
				    		console.log(`Actors: ${this.Actors}`);
				    		// updates text file
				    		writeFile(`Title: ${this.Title}`);
				    		writeFile(`Release Year: ${this.releaseYear}`);
				    		writeFile(`IMDB Rating: ${this.imdbRating}`);
				    		writeFile(`Rotten Tomatoes Rating: ${this.rottenTomatoesRating}`);
				    		writeFile(`Country: ${this.Country}`);
				    		writeFile(`Language: ${this.Language}`);
				    		writeFile(`Plot: ${this.Plot}`);
				    		writeFile(`Actors: ${this.Actors}`);
				    	}
					}
					movieObject.printMovie();
			  	}
			})
	}
	// default movie search if no user input
	if (!argTwo) {
		const queryUrl = "http://www.omdbapi.com/?t=serenity&y=&plot=short&apikey=trilogy";
		request(queryUrl, function(error, response, body) {
			if (!error && response.statusCode === 200) {
			  	const ratingObject = JSON.parse(body).Ratings;
			  	let movieObject = {
				    Title: JSON.parse(body).Title,
				    releaseYear: JSON.parse(body).Year,
				    imdbRating: JSON.parse(body).imdbRating,
				    rottenTomatoesRating: (ratingObject[1].Value),
				    Country: JSON.parse(body).Country,
				    Language: JSON.parse(body).Language,
				    Plot: JSON.parse(body).Plot,
				    Actors: JSON.parse(body).Actors,
				    printMovie: function() {
				    	console.log(`Title: ${this.Title}`);
				    	console.log(`Release Year: ${this.releaseYear}`);
				    	console.log(`IMDB Rating: ${this.imdbRating}`);
				    	console.log(`Rotten Tomatoes Rating: ${this.rottenTomatoesRating}`);
				    	console.log(`Country: ${this.Country}`);
				    	console.log(`Language: ${this.Language}`);
				    	console.log(`Plot: ${this.Plot}`);
				    	console.log(`Actors: ${this.Actors}`);
				    	// updates text file
				    	writeFile(`Title: ${this.Title}`);
				    	writeFile(`Release Year: ${this.releaseYear}`);
				    	writeFile(`IMDB Rating: ${this.imdbRating}`);
				    	writeFile(`Rotten Tomatoes Rating: ${this.rottenTomatoesRating}`);
				    	writeFile(`Country: ${this.Country}`);
				    	writeFile(`Language: ${this.Language}`);
				    	writeFile(`Plot: ${this.Plot}`);
				    	writeFile(`Actors: ${this.Actors}`);
				    	}
					}
					movieObject.printMovie();
			  	}
			})
	}
};

// fs read file
if (arg === 'do-what-it-says') {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (!error) {
			let randomSong = data
			// pulls the text form the selected text file, and uses that to search on spotify
			spotify.search({ type: 'track', query: randomSong }, function(err, data) {
				if (!err) {
					let randomSongObject = {
						Artist: data.tracks.items[0].artists[0].name,
						Track: data.tracks.items[0].name,
						Preview: data.tracks.items[0].preview_url,
						Album: data.tracks.items[0].album.name,
						printSong: function() {
							console.log(`Artist: ${this.Artist}`);
							console.log(`Track: ${this.Track}`);
							console.log(`Preview URL: ${this.Preview}`);
							console.log(`Album: ${this.Album}`);
							// updates text file
							writeFile(`Artist: ${this.Artist}`);
							writeFile(`Track: ${this.Track}`);
							writeFile(`Preview URL: ${this.Preview}`);
							writeFile(`Album: ${this.Album}`);
						}
					}
					randomSongObject.printSong();
				}
			})
		}
	})
};

// function to log results onto text file
function writeFile(data) { 
	fs.appendFile('./log.txt', data, function(err) {			  
		if (err) {
			console.log(err);
		} 
	})
};