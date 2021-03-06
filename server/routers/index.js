(function() {
    'use strict';

    module.exports = function(app) {
        // this middleware ensures that the user is displayed all the time when logged in, despire the page they are on
        app.all("*", function(req, res, next) {
            res.locals.currentUser = req.user;
            next();
        });

        require('./account-router')(app);
        require('./admin-router')(app);
        require('./statistics-router')(app);
        require('./real-estate-router')(app);
        require('./home-router')(app);
    }
}());