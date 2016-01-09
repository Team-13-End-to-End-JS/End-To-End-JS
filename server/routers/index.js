(function() {
    'use strict';

    module.exports = function(app) {
        require('./account-router')(app);
        require('./real-estate-router')(app);
    }
}());