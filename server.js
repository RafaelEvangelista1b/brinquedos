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

const server = http.createServer((req, res) =>{

    //log para ver qual URL está sendo acessada no terminal
    console.log(`Requisição recebida: ${req.url}` .green);

    //rota da API retorna a tabela em formato JSON
    if (req.url === '/api/roupas'){
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        return res.end(JSON.stringify(roupas));
    }
    //Lógica para servir arquivos estáticos da pasta "public" (index.html, 404.html, css, js, etc)
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html': req.url);
    const extname = path.extname(filePath);

    //Tipos de conteudo basicos
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'

    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';




    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                //Arquivo não encontrado, serve o 404
                const path404 = path.join(__dirname, 'public', '404.html');
                fs.readFile(path404, (err404, content404) => {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(content404 || 'Página não encontrada');
                });
            } else {
                //Erro do servidor
                res.writeHead(500);
                res.end(`Erro do servidor: ${err.code}`);
            }
        }else{
            //sucesso ao encontrar o arquivo
            res.writeHead(200, {'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

    // //roteamento simple (caminho da URL)
    // if (req.url === '/roupas') {
    //     //lê o arquivo 'index.html' que está na pasta public
    //     const filePath = path.join(__dirname, 'public', 'index.html');

    //     fs.readFile(filePath, 'utf8', (err, content) => {
    //         if (err) {
    //             res.writeHead(500);
    //             res.end('Erro do servidor');
    //         } else {
    //             res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //             res.end(content);
    //         }
    //     });
    // }

    //rota da API retorna a tabela em formato JSON
    //localhost:3000/api/roupas que pode ser consomida no front-end
//     else if (req.url === '/api/roupas'){
//         res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
//         res.end(JSON.stringify(roupas));
//     }

//     else{
    
//         //lê o arquivo '404.html' que está na pasta public
//         const path404 = path.join(__dirname, 'public', '404.html');

//         fs.readFile(path404, (err, content) => {
//             if (err) {
//                 res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
//                 res.end('Página não encontrada (404)');
//             }else {
//                 res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
//                 res.end(content);
//             }
//         });


//     }
// });

//configurar a porta do servidor
const PORT = 3000;

//iniciar o servidor usar o listem para ouvir a porta
server.listen(PORT, () =>{
    console.log(`Servidor rodando http://localhost:${PORT}` .green.bold);
});