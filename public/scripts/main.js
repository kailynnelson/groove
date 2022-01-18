/* 
AUTH STEPS
1. app requests auth to access data - sends client_id, response_type, redirect_uri, state, scope
2. spotify displays scopes and prompts user to log in
3. user logs in and authorizes access 
4. app receives code, state 
5. app requests access and refresh tokens - sends client_id, client_secret, grant_type, code, redirect_uri 
6. spotify returns access and refresh tokens 
7. app receives access_token, token_type, expires_in, refresh_token
8. app uses access token in requests to spotify web api - sends access_token
9. spotify web api returns requested data as a json object
 */
