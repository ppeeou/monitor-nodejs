
var util = {};

util.callback = {
    success: function (receive, _client) {
        _client.on('data', (data) => {
            console.log(data.toString());
            client.end();
        });
    },
    error: function (data, client) {
        console.log('error', JSON.parse(data));
    }
};


module.exports = util;