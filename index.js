"use strict";

require('dotenv').config();
var request = require('request');
var winston = require('winston');
var Papertrail = require('winston-papertrail').Papertrail;

var myLogger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            json: false,
            expressFormat: true,
            colorize: true
        }),
        new winston.transports.Papertrail({
            host: 'logs4.papertrailapp.com',
            port: 32583,
            program: 'ziggy-main',
            colorize: true
        })
    ]
});

// emitter.setMaxListeners();

var url = 'http://my-weather-server.herokuapp.com/latest';

myLogger.info("about to get data");

var req = {
    url: url,
    method: "GET",
    headers: {
        "content-type": "application/json"
    }
};


request(req, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        myLogger.info('document read');
        myLogger.info(body);
        process.exit();
    } else {
        myLogger.error(error);
        myLogger.error(response.statusCode);
        myLogger.error(body);
        process.exit(1);
    }
});

