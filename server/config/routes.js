(function() {
    "use strict";

    var auth = require('./auth'),
        controllers = require('../controllers');

    module.exports = function(app) {
        app.get('/partials/:partialArea/:partialName', function(req, res) {
            res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
        });

        app.post('/login', auth.login);
        app.post('/logout', auth.logout);

        app.get('/*', function(req, res) {
            res.status(404);
            res.end();
        });

        app.get('*', function(req, res) {
            res.render('index', {currentUser: req.user});
        });
    }
}());