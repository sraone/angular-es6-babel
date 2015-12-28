var express = require('express');
var setup = require('./setup');

var app = express();
setup(app)
    .parser()
    .router()
    .views()
    .errorHandler();