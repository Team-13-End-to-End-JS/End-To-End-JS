(function() {
    'use strict';

    let AboutUsPage = require('mongoose').model('AboutUsPage');

    function getPage() {
        let promise = new Promise(function(resolve, reject) {
            AboutUsPage.findOne({}, function(err, page) {
                if (err) {
                    return reject(err);
                }

                resolve(page);
            });
        });

        return promise;
    }

    function editPage(newContent) {
        let promise = new Promise(function(resolve, reject) {
            AboutUsPage.findOne({}, function(err, page) {
                if(err) {
                    return reject(err);
                }

                page.content = newContent;
                page.save(function(err) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(page);
                });
            });
        });

        return promise;
    }

    module.exports =  {
        getPage: getPage,
        editPage: editPage
    };
}());