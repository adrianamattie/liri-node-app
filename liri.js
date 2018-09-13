require("dotenv").config();


// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";



var request = require('request');
var keys = require("./key.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var liriCommand = process.argv[2];
var userInput = process.argv[3];

//complete
switch (liriCommand) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifySong(userInput);
        break;

    case "movie-this":
        movie(userInput);
        break;

    case "do-what-it-says":
        doWhat();
        break;
}

function myTweets() {
    var params = {
        screen_name: "@AdrianaShulman"
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i <= 20; i++) {
                console.log("Tweet number " + [i] + ": " + tweets[i].text);
                console.log("This was tweeted on: " + tweets[i].created_at);
                console.log("<-===============================->");
            };
        };
    });
};


//  `spotify-this-song`
//node liri.js spotify-this-song '<song name here>'
//This will show the following information about the song in your terminal / bash window
function spotifySong(userInput) {

    if (!userInput) {
        noInput();
    } else {
        spotify.search({
            type: 'track',
            query: userInput
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(`Song Name: ${data.tracks.items[0].name}`);
            console.log("===============================");
            console.log(`click here to hear the song: ${data.tracks.items[0].preview_url}`);
            console.log("===============================");
            console.log(`The album is: ${data.tracks.items[0].album.name}`);
              fs.appendFile("log.txt", " , Song name: " + userInput, function (err) {
                  if (err) {
                      return console.log(err);
                  }
              });
        })
    }
};

function noInput() {
    spotify.search({
            type: 'track',
            query: 'the sign ace of base'
        })
        .then(function (response) {
            var songs = response.tracks.items;
            console.log(`You didn't choose a song but here is what I can do. Take a look at this song ${songs[0].name}`);
            console.log(`This song is by ${songs[0].artists[0].name}`);
            console.log(`The album is:  ${songs[0].album.name}`);
            console.log("===============================");
            console.log(`You can play the song here: ${songs[0].external_urls.spotify}`);

        })
        .catch(function (err) {
            console.log(err);
        });
};

function movie(userInput) {
    if (!userInput) {
       noMovieInput();
    } else {
        request('http://www.omdbapi.com/?t=' + userInput + '&apikey=trilogy', function (error, response, body) {
            var movie = JSON.parse(body);
            console.log("You have looked up the movie: " + movie.Title);
            console.log("===============================");
            console.log(`It was released on:  ${movie.Released} and has a rating of ${movie.Ratings[0].Value}`);
             console.log("It stars: " + movie.Actors);
             console.log("===============================");
             console.log("It was produced in: " + movie.Country);
             console.log("It was made in: " + movie.Language);
             console.log("===============================");
            console.log("A brief plot summary: " + movie.Plot);
            
        });
    };
};

function noMovieInput() {
    {
        request('http://www.omdbapi.com/?t=' + "mr-nobody" + '&apikey=trilogy', function (error, response, body) {
            var movie = JSON.parse(body);
            console.log("You have looked up the movie: " + movie.Title);
            console.log("===============================");
            console.log(`It was released on:  ${movie.Released} and has a rating of ${movie.Ratings[0].Value}`);
            console.log("It stars: " + movie.Actors);
            console.log("===============================");
            console.log("It was produced in: " + movie.Country);
            console.log("It was made in: " + movie.Language);
            console.log("===============================");
            console.log("A brief plot summary: " + movie.Plot);

        });
    };
};


//  `do-what-it-says`

function doWhat() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            logOutput.error(err);
        } else {
            var randomArray = [];
            var songName = data.split(",");
            //splitting at the comma and using position 1 of the array
            randomArray.push(songName[1]);
            spotifySong(randomArray);
        };
    });
}