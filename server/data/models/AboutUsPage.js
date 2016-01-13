(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports.init = function() {
        let aboutUsPageSchema = new Schema({
            content: {
                type: String
            }
        });

        let AboutUsPage = mongoose.model('AboutUsPage', aboutUsPageSchema);

        AboutUsPage.find({}).exec(function(err, page) {
            if (err) {
                console.log('Cannot find page: ' + err);
                return;
            }

            if (page.length === 0) {
                AboutUsPage.create({content: ""});
            }
        });
    };
}());