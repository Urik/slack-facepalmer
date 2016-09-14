"use strict";
var http_1 = require('http');
var connect = require('connect');
var bodyParser = require('body-parser');
var config_1 = require('./config');
var app = connect()
    .use(bodyParser.urlencoded({ extended: true }))
    .use(function (_a, res) {
    var body = _a.body;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    var response = {
        response_type: 'in_channel',
        attachments: [{ image_url: config_1.FACEPALM_URL, text: body.text || '' }]
    };
    res.write(JSON.stringify(response), function () {
        res.end();
    });
});
var PORT = process.env.PORT || 3000;
http_1.createServer(app).listen(PORT, function () {
    console.log("Listening in " + PORT);
});
//# sourceMappingURL=index.js.map