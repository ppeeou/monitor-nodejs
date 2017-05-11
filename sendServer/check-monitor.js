const os = require('os');
const ostb = require('os-toolbox');
const diskspace = require('diskspace');

var ckMonitor = {};
//필요정보 
//os.hostname() 
//os.platform()  //win32
//os.totalmem()  //총 시스템 메모리 양
var sort = {
    type: 'cpu',
    order: 'desc'
}
ckMonitor.info = {
    os : os.hostname(),
    platform :os.platform()
}
ckMonitor.current = function () {
    var core = {
        search: function (npm, method, drive) {
            if (!drive) {
                var arg = (arg == 'process' ? sort : undefined);
                return npm[method](arg);
            } else {
                var promise = new Promise(function (resolve, reject) {
                    npm[method](drive, function (err, result) {
                        if (err) return reject(err); 
                        return resolve(result)
                    })
                }) 
                return promise;
            }
        }
    } 
    return {
        'cpu': function () {
            return core.search(ostb, 'cpuLoad')
        },
        'memory': function () {
            return core.search(ostb, 'memoryUsage');
        },
        'process': function () {
            return core.search(ostb, 'currentProcesses');
        },
        'diskspace': function (drive) {
            return core.search(diskspace, 'check', drive);
        }
    }
} 

// 메서드 호출 실행 방법 
/*ostb*/
// ckMonitor.current()
//     .process()  //cpu, memory,process
//     .then(callback.success)
//     .catch(callback.error);

/*diskspace*/
// ckMonitor.current()
//     .diskspace('D')
//     .then(callback.success)
//     .catch(callback.error); 

module.exports = ckMonitor;

 