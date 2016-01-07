(function() {
    'use strict';

    module.exports = function(app) {
        require('./account-router')(app);
    }
}());