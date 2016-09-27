var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

//creating server
var server = http.createServer(function (req, res) {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    //verifica se eh uma requisicao GET
    if (req.method == 'GET') {
        var fileUrl;

        if (req.url == '/') {
            fileUrl = '/index.html';
        } else {
            fileUrl = req.url;
        }

        //pegar o caminho do arquivo dentro da pasta public 
        //(index.html ou aboutus.html)
        var filePath = path.resolve('./public' + fileUrl);

        //qual a extensao desse arquivo ?
        var fileExt = path.extname(filePath);

        //extensao eh html ?
        if (fileExt == '.html') {
            //funcao de callback (exists) se existe o filePath
            fs.exists(filePath, function (exists) {

                //se nao existe esse caminho [filePath] informe 404
                if (!exists) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<html><body><h1>Error 404: ' + fileUrl +
                        ' not found</h1></body></html>');
                    return;
                }

                //existe o caminho do arquivo e manda ler/abrir o .html
                res.writeHead(200, { 'Content-Type': 'text/html' });
                fs.createReadStream(filePath).pipe(res);

            });
        }
        //arquivo nao eh um .html 
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<html><body><h1>Error 404: ' + fileUrl +
                ' not a HTML file</h1></body></html>');
        }
    }
    //requisicao nao eh do tipo GET [404] not supported
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Error 404: ' + req.method +
            ' not supported</h1></body></html>');
    }
});

//fazendo o servidor rodar na porta 3000 [localhost]
server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});