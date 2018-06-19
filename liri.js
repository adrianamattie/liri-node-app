require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

var nodeArgs = process.argv;
var movieName = "";

for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {

        movieName = movieName + "+" + nodeArgs[i];

    } else {

        movieName += nodeArgs[i];

    }
}



//THINGS LIRI SHOULD DO
//  *`my-tweets`
        //node liri.js my-tweets - 
        //This will show your last 20 tweets and when they were created at in your terminal/bash window.

//  `spotify-this-song`
    //node liri.js spotify-this-song '<song name here>'
    //This will show the following information about the song in your terminal / bash window


    // Artist(s)
        // The song 's name
        // A preview link of the song from Spotify
        // The album that the song is from

        //If no song is provided then your program will default to "The Sign" by Ace of Base.
        //Client ID 423b4b6a4e8b4d6fa852b59a253e98de
        //Client Secret 6d3a351048124f65a37bffde7e09b7b7

//  `movie-this`


//  `do-what-it-says`