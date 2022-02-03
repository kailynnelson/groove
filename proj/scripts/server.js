import { createServer, get } from 'https';

// create an http server to handle responses
createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('hello, world!');
    response.end();
}).listen(8888);