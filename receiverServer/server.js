'use strict';

// 클러스터를 할 경우 
// const cluster = require('./cluster-server');
const ldccConfig = {
  logLevel : 3,
  appName : 'ldcc-monitor',
  httpServerPort : 8888
}

const ldccMonitor = require('./ldcc-monitor');
ldccMonitor(ldccConfig); 
