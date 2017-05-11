
const ckMonitor = require('./check-monitor');
const util = require('./util');
const net = require('net');
const netBuf = require('net-buffer');
const _ = require('./common_library/partial'); 

const helper = require('./lib/helper');
const config = helper.loadConfig();
const logger = helper.logger;


const client = net.connect({ port: config.TCP_INFO.PORT }, () => {
    // 'connect' listener
    console.log('connected to server!');
    client.setEncoding('utf8');
    setInterval(function () {
        ckMonitor.current()
            .cpu()  //cpu, memory,process 
            .then(function (receive) {
                receive = data_arrange({ title: 'cpu', desc: receive });
                writeData(client, JSON.stringify(receive));
            })
        /*memory*/
        ckMonitor.current()
            .memory()  //cpu, memory,process
            .then(function (receive) {
                receive = data_arrange({ title: 'memory', desc: receive });
                writeData(client, JSON.stringify(receive));
            })

        /*diskspace*/
        ckMonitor.current()
            .diskspace('D')
            .then(function (receive) {
                receive = data_arrange({ title: 'DISK', drive: 'D', desc: receive });
                writeData(client, JSON.stringify(receive));
            })
        /*diskspace*/
        ckMonitor.current()
            .diskspace('C')
            .then(function (receive) {
                receive = data_arrange({ title: 'DISK', drive: 'C', desc: receive });
                writeData(client, JSON.stringify(receive));
            })

        function data_arrange(desc) {
            return _.extend(desc, { hostname: ckMonitor.info.os });
        }
        function writeData(socket, data) {
            // 데이터의 버퍼가 빈경우를 체크해 줄 수있게 생성한다. 
            if (socket.write(data)) {
                (function (socket, data) {
                    socket.once('drain', function () {
                        writeData(socket, data);
                    });
                })(socket, data);
            }
        }
    }, config.CPU_PROFILING_TIME)

});
client.on('end', () => {
    console.log('disconnected from server');
});
