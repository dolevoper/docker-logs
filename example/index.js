const http = require('http');

http
    .createServer((req, res) => {
        console.log(req.method, req.url);

        res.statusCode = 201;
        res.write('all good');
        res.end();
    })
    .listen(3000, () => console.log('server started on port 3000'));