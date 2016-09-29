var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

//colocando express() na variavel app
var app = express();

app.use(morgan('dev'));

// __dirname eh um param do metodo static do express
// __dirname pega o nome do arquivo da pasta '/public'
app.use(express.static(__dirname + '/public'));

//fazendo o servidor app rodar na porta 3000 [localhost]
app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});