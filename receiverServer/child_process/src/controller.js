'use strict';


module.exports = function(app,config,helper){
    const logger = helper.logger;
    
    return {
        Index(req,res,next){

            res.statusCode = 200;
            res.send('hello world !!!!');
        }
    }
}