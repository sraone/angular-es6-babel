var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var express = require('express');

module.exports = function (app) {
    return {
        views: setupViews,
        parser: setupParser,
        router: setupRouter,
        errorHandler: errorHandler
    };

    function setupViews() {
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'jade');
        app.use(express.static(path.join(__dirname, '../client')));
        return this;
    };

    function setupParser() {
        app.use(bodyParser);
        app.use(cookieParser);
        return this;
    };

    function setupRouter() {
        return this;
    };

    function errorHandler() {
        app.use(function (err, req, res, next) {
            res.status(500)
                .render('error', {
                    message: err.message,
                    error: err
                });
        });

        return this;
    };
};