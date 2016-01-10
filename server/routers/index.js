(function() {
    'use strict';

    module.exports = function(app) {
        require('./account-router')(app);
        require('./admin-router')(app);
        require('./real-estate-router')(app);
        require('./location-router')(app);
        require('./construction-type-router')(app);
        require('./home-router')(app);
    }
}());