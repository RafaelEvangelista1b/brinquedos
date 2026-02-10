const http = require('http');

const colors = require('colors');

const fs = require('fs');

const path = require('path');

const dados = [
    {id: 1, brinquedo: "Cubo mágico" , preco: 79.90 , disponivel: true},
    {id: 2, brinquedo: "Boneca" , preco: 119.90 , disponivel: true},
    {id: 3, brinquedo: "Urso de pelúcia" , preco: 89.90 , disponivel: true},
    {id: 4, brinquedo: "carrinho" , preco: 19.90 , disponivel: false}
];

const server = http.createServer((req, res) => {
    console.log('Requisição recebida: ${req.url}'.green)

    if(req.url === "/") {
        const filePath = path.join(__dirname, 'public', 'index.html')

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Erro do servidor');
            }else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf'});
                res.end(content);
            }
        });
    }

    else if(req.url === '/api/dados'){
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(dados));
    }

    else{
        const Path404 = path.join(__dirname, 'public', '404.html')

          fs.readFile(Path404, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Página não encontrada');
            }else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf'});
                res.end(content);
            }
        });

        res.writeHead(400, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('Página não encontrada (404)');
    }
});

const PORT = 3000;
server.listen(PORT, () =>{
    console.log(`Servidor rodando http://localhost:${PORT}`.green.bold);
});