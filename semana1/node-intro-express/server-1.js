var express = require('express');
var http = require('http');

var hostname = 'localhost';
var port = 3000;

//colocando express() na variavel app
var app = express();

app.use(function (req, res, next) {
    console.log(req.headers);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<html><body><h1>Hello World</h1></body></html>');
});

//create server
var server = http.createServer(app);

//fazendo o servidor rodar na porta 3000 [localhost]
server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});