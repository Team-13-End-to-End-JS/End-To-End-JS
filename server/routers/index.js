(function() {
    'use strict';

    module.exports = function(app) {
        require('./home-router')(app);
        require('./account-router')(app);
    }
}());