const http = require('http');

const server = http.createServer((request, response)=> {
    response.end('hi worlllldooo')
})

server.listen(8080, () => console.log('server prrrrendido!'))