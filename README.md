# liri-node-app

This project is a command line node app that takes in certain parameters and gives you back specific data.

Possible parameters include: 

* my-tweets
  * This will return the 20 latest tweets from a test Twitter account of mine.

* spotify-this-song `<song search here>`
  * This will return information about the specific track you searched for, as well as a preview link for the track.
  *  If no song is searched for information for a default song will show up.

* movie-this `<movie search here>`
  * This will return information about the specific movie you searched for from IMDB.
  * If no movie is searched for information about a default movie will show up.

* do-what-it-says
  * This will return information about a song that is located in the random.txt file.

All search results will be recoreded in the log.txt file.

Dependencies are up to date in the package.json file.