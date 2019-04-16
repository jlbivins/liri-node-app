var axios = require("axios");
require("dotenv").config();

var keys = require('./keys')
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

const liriCommand = process.argv[2];
//var queryParameter = process.argv.slice(3);
var queryParameter = "";

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
var value = " ";
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        // queryParameter = queryParameter + "+" + nodeArgs[i];
        queryParameter += nodeArgs[i] + " ";
        //value. += nodeArgs[i];
    }
    else {
        queryParameter += nodeArgs[i] + " ";
    }
}

switch (liriCommand) {
    case "concert-this":
        var queryUrl ="https://rest.bandsintown.com/artists/" + queryParameter.split(" ") + "/events?app_id=codingbootcamp";
        console.log(queryUrl);      
        axios.get(queryUrl).then(
            function(response) {
                var jsonData = response.data;
                console.log(jsonData)
                
                 for (var i = 0; i < jsonData.length; i++) {
                    var show = jsonData[i];
                    console.log(show)
                }	
                
            });
           // });
        break;
    case "spotify-this-song":
        console.log("spotify for song " + queryParameter);
        spotify.search({ type: 'track', query: queryParameter })
  .then(function(response) {
    //for (var i = 0; i < response.tracks.items.length; i++) {
      console.log(response.tracks.items[0].artists[0]);
   // }
  //console.log(response.tracks);
  })
  .catch(function(err) {
    console.log(err);
  });
        break;
    case "movie-this":
        console.log("movie wanted " + queryParameter);
        var queryUrl = "http://www.omdbapi.com/?t=" + queryParameter + "&y=&plot=short&apikey=trilogy";
        console.log(queryUrl);

        axios.get(queryUrl).then(
            function (response) {
                console.log("Title: " +  response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("ImdbRating: " +  response.data.imdbRating);
                console.log("Country: " +  response.data.Country);
                console.table(response.data.Ratings)
                console.log("Rotten Tomatoes: " +  response.data.Ratings[1].Value);
                console.log("Language: " +  response.data.Lauguage);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);

                
              // console.log("Response: " + response.data);
              //  console.log(JSON.stringify(response, null, 4));
               //console.log(JSON.stringify(response));
            });
        break;
    case "do-what-it-says":
        console.log("do what it says " + queryParameter);
        break;
    default:
        console.log("default case, do nothing");

}




var movieName;

// Then run a request with axios to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + queryParameter + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

// axios.get(queryUrl).then(
//     function (response) {
//         console.log("Release Year: " + response.data.Year);
//     }
// );
