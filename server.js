(function() {
    'use strict';

    let env = 'development';

    let express = require('express'),
        server = express();

    let config = require('./server/config/config')[env];

    require('./server/config/express')(server, config);
    require('./server/config/mongoose')(config);
    require('./server/config/passport')();
    require('./server/config/routes')(server);

    server.listen(config.port, () => { console.log('Server running on ' + config.port) });
}());