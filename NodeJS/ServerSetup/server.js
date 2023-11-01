const http = require('http');
const path  = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');

const eventEmitter = require('events');
class MyEmitter extends eventEmitter {};
const myEmitter = new MyEmitter();

myEmitter.on('Log', (msg, fileName) => logEvents(msg, fileName));

const serveFile = async (filePath, contentType, response) => {
    try{
        // const data = await fsPromises.readFile (filePath, 'utf8'); 
        // for noraml data  
        // response.writeHead(200, {'Content-Type': contentType});
        // response.end(data);
        // fdor managuibng json files too 
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image')? 'utf8' : ''
        );   
        const data = contentType === 'application/json' 
            ? JSON.parse(rawData) : rawData;

            response.writeHead(
                // 200,
                filePath.includes('404.html') ? 404 : 200, 
                
                {'Content-Type': contentType === 'application/json' 
            ? 'text/plain' : contentType
        });

response.end(
    contentType === 'application/json'
        ? JSON.stringify(data)
        : data
);
    } catch (err) {

        console.log(err);
        myEmitter.emit('Log', `${err.name}\t ${err.message} `, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) =>{

    console.log(req.url, req.method);
    myEmitter.emit('Log', `URL: ${req.url} \t Method: ${req.method}`, 'reqLog.txt');

    if (req.url === '/') {
        serveFile(path.join(__dirname, 'views', 'index.html'), 'text/html', res);
        return;
    }
    // let filePath;
    const extension = path.extname(req.url);

    let contentType;

    switch  (extension){
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;

        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        default:
            contentType = 'text/plain';
    }

    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url)

    // for the files without .html extension

    if(!extension && req.url.slice(-1) !== '/'){
        filePath += '.html';
    }

    const fileExistes = fs.existsSync(filePath);

    if(fileExistes){
// serve the file   
        serveFile(filePath, contentType, res);
    }else{  
        // 404
        // 301 redirect
        // console.log(path.parse(filePath));
        switch(path.parse(filePath).base){
            case 'old.html':
                res.writeHead(301, {'Location': '/new-page.html'});
                res.end();  
                break;

            case 'www-page.html':
                res.writeHead(301, {'Location': '/'});
                res.end();  
                break;
            default :   
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);

                
        }

    }

    // if(req.url === '/' || req.url === '/index.html'){
    //     res.statusCode = 200;
    //     res.setHeader = ('Content-Type', 'text/html');
        
    //     filePath = path.join(__dirname, 'views', 'index.html');
    //     fs.readFile(path, 'utf8', (err, data) => {
    //         if(err) throw err;
    //         res.end(data);
    //     });
    // } 
    // ///////////
    // switch (req.url) {
    //     case '/':
    //         res.statusCode = 200;
    //         res.setHeader = ('Content-Type', 'text/html');
            
    //         filePath = path.join(__dirname, 'views', 'index.html');
    //         fs.readFile(filePath, 'utf8', (err, data) => {
    //             if(err) throw err;
    //             res.end(data);
    //         });
    //         break;
    // }

});

server.listen(PORT, () => console.log(`listening on PORT ${PORT}`));



