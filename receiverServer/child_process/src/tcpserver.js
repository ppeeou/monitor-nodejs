'use strict';
const net = require('net'); 

module.exports = function(config,helper){
    const logger = helper.logger;
     const event = helper.event;
 
    const server = net.createServer((socket)=>{
        let chunks = [];
        let size = 0; 
        socket.write('hello\r\n'); 
        socket.on('data',chunk =>{
            console.log(JSON.parse(chunk))
        }) 
        socket.on('end', () => {
            helper.deleteCacheSocket(socket.__pid__);
            logger.error(`tcpserver->end This Socket closed, pid is ${socket.__pid__}`);
        });

        socket.on('error', err => {
            logger.error(`tcpserver->error ${err}`);
        });
    }); 
    server.on('error', err => {
        logger.error(`tcpserver->error ${err}`);
    });
    return server;
}
 
 
 

