const net = require('net');
const server = net.createServer((c) => {
    // 'connection' listener
    console.log('client connected');
    
    c.write('hello\r\n');  
    c.on('data',(data)=>{
        console.log('data',data.toString());
    })
    c.pipe(c);
    c.on('end', () => {
        console.log('client disconnected');
    });
});
server.on('error', (err) => {
    throw err;
});

module.exports = server;