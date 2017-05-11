'use strict';

module.exports = function(app,config,helper){

    const controller = require('./controller')(app,config,helper);
    app.get('/',controller.Index);
    
}