const express = require('express'); 
const request = require('request'); 
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const { Buffer } = require('safe-buffer');

const app = express(); // use the express module to create a server 
const port = 3000; 

// only responds to http get requests with the specified url path '/'
app.get('/', (req, res) => {
    res.send('app responsive');
});

app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

/**/

let client_id = 'CLIENT_ID';
let client_secret = 'CLIENT_SECRET';
let redirect_uri = 'http://localhost:3000/callback';

/**
 * https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js#L20
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// request authorization
app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    var scope = 'user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    }));
});

let stateKey = 'spotify_auth_state';

// request refresh and access tokens
app.get('/callback', function(req, res) {

    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' + querystring.stringify({
            error: 'state_mismatch'
        }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };
    };

    request.post(authOptions, function(err, response, body) {
        if (!err && response.statusCode === 200) {

            let access_token = body.access_token;
            let refresh_token = body.refresh_token;

            let options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            }

            // use access token to access spotify web api
            request.get(options, function(err, response, body) {
                console.log(body);
            })

            // pass the token to the browser to request from there
            res.redirect('/#' + querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token
            }));
        } else {
            res.redirect('/#' + querystring.stringify({
                error: 'invalid_token'
            }));
        }
    });
});

// request access token from refresh token
app.get('/refresh_token', function(req, res) {

    let refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(err, response, body) {
        if (!err && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

/**/

// start the server by calling node in command prompt: node app.js
// use the server to listen for http requests on port 3000
app.listen(port, () => {
    // print a message to the console explaining the browser url to use to test the server
    console.log(`app listening on port ${port}!`); // uses interpolation with backticks ``
});