const axios = require('axios').default;

const apiKey = process.env.SPOTIFY_CLIENT_SECRET;

// documentation https://www.npmjs.com/package/axios

function BasicFunction() {
    console.log("basic function");
}

// This one will not be available outside this file
function PrivateFunction() {
    console.log("private function");
}

function MakeGetRequestWithAxios() {
    console.log("axios function");

    axios.get('someSpotifyFunction/parameter')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

// Defines anything usable outside this file
module.exports = {
    BasicFunction,
    MakeSampleRequestWithAxios
}