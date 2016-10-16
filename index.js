//npm install node-static
//node server.js

var static = require('node-static');

var file = new static.Server('./build');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8080);

console.log('Server is running on 8080');