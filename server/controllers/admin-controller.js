(function() {
    'use strict';

    let auth = require('../config/auth');

    function escapeHTML (unsafe_str) {
        return unsafe_str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/\'/g, '&#39;');
    }

    module.exports = function(data) {
        return {
            getContentControl: function (req, res) {
                let ret     = data.realEstateTypes;
                let rec     = data.constructionTypes;
                let rel     = data.locations;
                let aboutUs = data.aboutUsPage;
                let options = {};

                ret.all().then(function (dbResultRet) {
                    rec.all().then(function (dbResultRec) {
                        rel.all().then(function (dbResultRel) {
                            options.realEstateTypes        = dbResultRet;
                            options.realEstateLocations    = dbResultRel;
                            options.realEstateConstruction = dbResultRec;

                            aboutUs.getPage().then(function (dbResultPage) {
                                options.aboutUs = dbResultPage.content;
                                res.render('admin/content', {data: options});
                            }, function (err) {
                                console.log(err);
                                res.render('admin/content', {data: options});
                            });

                        }, function (err) {
                            console.log(err);
                            res.session.error = err;
                            res.render('/shared/badRequest');
                        });
                    }, function (err) {
                        console.log(err);
                        res.session.error = err;
                        res.render('/shared/badRequest');
                    });

                }, function (err) {
                    console.log(err);
                    res.session.error = err;
                    res.render('/shared/badRequest');
                });
            },
            removeLocationContentControl: function (req, res) {
                let locId = +req.params["location"];

                data.locations
                    .remove(locId)
                    .then(function (dbResult) {
                        res.redirect('/admin/content');
                    }, function (err) {
                        console.log(err);

                        res.session.error = err;
                        res.status(403);
                        res.end();
                    });
            },
            removeTypeContentControl: function (req, res) {
                let typeId = +req.params["type"];

                data.realEstateTypes
                    .remove(typeId)
                    .then(function (dbResult) {
                        res.redirect('/admin/content');
                    }, function (err) {
                        // res.session.error = err;
                        res.status(403);
                        res.end();
                        console.log(err);
                    });
            },
            removeConstructionContentControl: function (req, res) {
                let constrId = +req.params["constrId"];

                data.constructionTypes
                    .remove(constrId)
                    .then(function (dbResult) {
                        res.redirect('/admin/content');
                    }, function (err) {
                        console.log(err);
                        // res.session.error = err;
                        res.status(403);
                        res.end();
                    });
            },
            addTypeContent: function (req, res) {
                let typeName = escapeHTML(req.body.name);

                data.realEstateTypes
                    .add(typeName)
                    .then(function (result) {
                        res.redirect('/admin/content');
                    }, function (err) {
                        console.log(err);
                        res.session.error = err;
                        res.redirect(403, '/admin/content');
                    });
            },
            addConstructionContent: function (req, res) {
                let constrName = escapeHTML(req.body.name);

                data.constructionTypes
                    .add(constrName)
                    .then(function (result) {
                        res.redirect('/admin/content');
                    }, function (err) {
                        console.log(err);
                        res.session.error = err;
                        res.status(403);
                        res.redirect(403, '/admin/content');
                    });
            },
            addLocationContent: function (req, res) {
                let locName = escapeHTML(req.body.name);

                data.locations
                    .add(locName)
                    .then(function (result) {
                        res.redirect('/admin/content');
                    }, function (err) {
                        console.log(err);
                        res.session.error = err;
                        res.status(403);
                        res.redirect(403, '/admin/content');
                    });
            },
            getPendingPosts: function (req, res) {
                let pageSize = 10;
                let page     = (req.query.page != undefined && +req.query.page > 0) ? +req.query.page : 1;

                data.realEstates
                    .getPendingApproval()
                    .then(function (dbResponse) {
                        let posts = dbResponse.slice((page - 1) * pageSize, page * pageSize);

                        res.render('admin/pending', {
                            data: {
                                posts: posts,
                                page: page
                            }
                        });
                    }, function (err) {
                        console.log(err);
                        res.session.error = err;
                        res.redirect('/admin/pending');
                    });
            },
            updatePendingPost: function (req, res) {
                let approved = req.body.approved;
                let id       = req.params["id"];

                if (approved) {
                    data.realEstates
                        .approvePost(id)
                        .then(function (dbResponse) {
                            res.status(200);
                            res.send("OK");
                        }, function (err) {
                            console.log("approving post " + err);
                            res.session.error = err;
                            res.send(err);
                        });
                } else {
                    data.realEstates
                        .removePost(id)
                        .then(function (dbResponse) {
                            res.status(200);
                            res.send("OK");
                        }, function (err) {
                            console.log("removing post " + err);
                            res.session.error = err;
                            res.send(err);
                        });
                }
            },
            getAllPosts: function (req, res) {
                res.render('admin/posts');
            },
            removePost: function (req, res) {
                res.status(404);
                res.end();
            },
            getAllUsers: function (req, res) {
                let pageSize = 10;
                let page     = (req.query.page != undefined && +req.query.page > 0) ? +req.query.page : 1;

                data.users
                    .getAll({})
                    .then(function (dbResponse) {
                        let users = dbResponse.slice((page - 1) * pageSize, page * pageSize);

                        res.render('admin/users', {
                            data: {
                                users: users,
                                page: page
                            }
                        });
                    }, function (err) {
                        console.log(err);
                        res.json(err);
                    });
            },
            promoteUser: function (req, res) {
                let userId = req.params["id"];

                data.users
                    .promote(userId)
                    .then(function (dbResponse) {
                        res.status(200);
                        res.send("OK");
                    }, function (err) {
                        console.log("Promote err " + err);
                        res.json(err);
                    });
            },
            demoteUser: function (req, res) {
                let userId = req.params["id"];

                data.users
                    .demote(userId)
                    .then(function (dbResponse) {
                        res.status(200);
                        res.send("OK");
                    }, function (err) {
                        console.log("Demote err " + err);
                        res.session.error = err;
                        res.send(err);
                    });
            },
            editAboutUsPage: function (req, res) {
                let content = req.body.content;

                data.aboutUsPage
                    .editPage(content)
                    .then(function (dbResponse) {
                        res.status(200);
                        res.redirect('/admin/content');
                    }, function (err) {
                        console.log(err);
                        res.session.error = err;
                        res.end();
                    });
            }
        }
    }
}());