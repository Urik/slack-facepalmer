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
    var response = {
        text: body.text,
        attachments: [{ image_url: config_1.FACEPALM_URL }]
    };
    res.write(JSON.stringify(response), function () {
        res.end();
    });
});
http_1.createServer(app);
//# sourceMappingURL=index.js.map