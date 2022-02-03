const http = require('http');
const obj = [[],[]];
http.createServer(obj, function(request, response) {
    response.writeHead(200);
    response.end('hello, world!');
}).listen(3000);

// whyyy is this here