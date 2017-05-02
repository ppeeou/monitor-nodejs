'use strict';
const uuidV4 = require('uuid/v4');
const basicAuth = require('basic-auth');
const analysisLib = require('v8-analytics');

module.exports = function (app, config, helper) {
    const logger = helper.logger;


};


console.log(
    uuidV4()
)// -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1' 


'use strict';
const fs = require('fs'); 
//or you can use following, they're equival  
 
//list all js function and it's execTime 
const json = JSON.parse(fs.readFileSync('./test.cpu.json'));
const str = v8Analytics(json);
console.log(str);
 
//list you heap memory info 
const json = JSON.parse(fs.readFileSync('./test.mem.json'));
const {leakPoint, heapMap, statistics} = analysisLib.memAnalytics(allData)