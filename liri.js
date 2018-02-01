require("dotenv").config();

const keys = require('keys');

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);