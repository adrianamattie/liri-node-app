require("dotenv").config();


// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";



var request = require('request');
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var twitter = require('twitter');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var liriCommand = process.argv[2];
var userInput = process.argv[3];

switch (liriCommand) {
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":
    spotify();
    break;

    case "movie-this":
    movie();
    break;

    case "do-what-it-says":
    doWhat();
    break;
}

//THINGS LIRI SHOULD DO
//  *`my-tweets`
//node liri.js my-tweets - 
//This will show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets() {
    
        //api call to twitter
        //show 20 tweets
  
}


//  `spotify-this-song`
//node liri.js spotify-this-song '<song name here>'
//This will show the following information about the song in your terminal / bash window
function spotify(userInput) {

    if (!userInput) {
        break;
    }

    else {

    spotify.search({
        type: 'track',
        query: userInput
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    })

    .then(function (response) {
            console.log(response);
        })
    }
};


// Artist(s)
// The song 's name
// A preview link of the song from Spotify
// The album that the song is from

//If no song is provided then your program will default to "The Sign" by Ace of Base.
//Client ID 423b4b6a4e8b4d6fa852b59a253e98de
//Client Secret 6d3a351048124f65a37bffde7e09b7b7

//  `movie-this`
function movie() {

}

//  `do-what-it-says`

function doWhat() {

}