var http = require('http');
var dt = require('./myfirstmodule');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("La hora en este momento: " + dt.myDateTime());
  res.end();
}).listen(8080);