
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var request = require("request");
var moment = require("moments");
var fs = require("fs");

var nodeLine = process.argv;
var input = process.argv[2];

var searchReq = "";

for (var i = 3; i < nodeLine.length; i++) {
  if (i > 3 && i < nodeLine.length) {
    searchReq = searchReq + "+" + nodeLine[i];
  } else {
    searchReq = searchReq + nodeLine[i];
  }
};
//console.log(searchReq);

switch (input) {
  case "spotify-this-song":
    spotifySong(searchReq);
    break;

  case "concert-this":
    concertThis(searchReq);
    break;

  case "movie-this":
    movieThis(searchReq);
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
};

function spotifySong(searchReq) {
  spotify.search({ type: "track", query: searchReq, limit: 2 }, function (err, result) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("=======================================")
    console.log("Artist: " + result.tracks.items[0].artists[0].name);
    console.log("Song Name: " + result.tracks.items[0].name);
    console.log("Album: " + result.tracks.items[0].album.name);
    console.log("Song Link: " + result.tracks.href);
    console.log("=======================================");
  });
};

function concertThis(searchReq) {
  var bandsInTown = "https://rest.bandsintown.com/artists/" + searchReq + "/events?app_id=codingbootcamp"
  request(bandsInTown, function (body) {
    var concertInfo = JSON.parse(body);
    console.log("=======================================");
    console.log("Name of Venue: " + concertInfo[0].venue.name);
    console.log("Venue Location: " + concertInfo[0].venue.city + "," + concertInfo[0].venue.region);
    console.log("Date of Event: " + moment(concertInfo[0].datetime).format("MM/DD/YYYY"));
    console.log("=======================================");
  })
};

function movieThis(searchReq) {
  var omdbURL = "http://www.omdbapi.com/?t=" + searchReq + "&y=&plot=short&apikey=trilogy"
  request(omdbURL, function (error, response, body) {
    var movieInfo = JSON.parse(body);
    console.log("=======================================");
    console.log("Title: " + movieInfo.Title);
    console.log("Movie Release Year: " + movieInfo.Year);
    console.log("IMDB Rating: " + movieInfo.imdbRating);
    console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
    console.log("Country: " + movieInfo.Country);
    console.log("Language: " + movieInfo.Language);
    console.log("Movie Plot: " + movieInfo.Plot);
    console.log("Movie Actors: " + movieInfo.Actors);
    console.log("=======================================");
  })
};

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);
    console.log(error);
  });
}


