(function() {
    'use strict';

    let express = require('express'),
        stylus = require('stylus'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        passport = require('passport'),
        path = require('path');

    module.exports = function(app, config) {
        app.set('view engine', 'jade');
        app.set('views', path.join(config.rootPath ,'server/views'));
        app.use(cookieParser());
        app.use(bodyParser.urlencoded({extended: true }));
        app.use(bodyParser.json());
        app.use(session({
            secret: 'magic unicorns',
            resave: true,
            saveUninitialized: true}));
        app.use(stylus.middleware(
            {
                src:  path.join(config.rootPath, 'public'),
                compile: function(str, path) {
                    return stylus(str).set('filename', path);
                }
            }
        ));
        app.locals.moment = require('moment');
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(express.static(path.join(config.rootPath, 'public')));
    }
}());
