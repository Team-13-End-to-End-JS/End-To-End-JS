(function() {
    'use strict';

    let sinon = require('sinon'),
        chai = require('chai'),
        assert = require('assert'),
        expect = chai.expect;

    let data = {
        users: {
            create: function(user) {
                let promise = new Promise(function(resolve, reject) {
                    resolve(user);
                });

                return promise;
            }
        },
        locations: {
            remove: function(id) {
                let promise = new Promise(function(resolve, reject) {
                    if(id == 1 || id == 0) {
                        resolve(id);
                    } else {
                        return reject('invalid removal');
                    }
                });

                return promise;
            }
        }
    };

    let usersController = require('../server/controllers/users-controller.js')(data);

    let adminController = require('../server/controllers/admin-controller.js')(data);

    // let realEstateController = controller.realEstate;

    let testUser = {_id: "2131dsaf231254j6542dksadnkank23",
        username: "TestUser",
        firstName: "TestFName",
        lastName: "TestLName",
        phoneNumber: "088888888",
        roles: ["admin", "regular"]};

    let testRegUser = {_id:"14kdskml9800iokre",
        username: "TestRegularUser",
        firstName: "TestFName",
        lastName: "TestLName",
        phoneNumber: "088888888",
        roles: ["regular"]};

    function hasStatusCode(code) {
        return function (statusCode) {
            expect(statusCode).to.equal(code);
            return this.caller;
        }
    }

    describe('Users Controller', function() {
        describe('GET /login', function() {
            it('should render login form when user is not logged in', function() {
                let req = {};
                let res = { render: sinon.spy() };
                let spy = res.render;

                usersController.getLogin(req, res);

                expect(spy.calledOnce).to.equal(true);
            });
        });

        describe('GET /login', function() {
            it('should redirect to / when user is logged in', function() {
                let req = { user: testUser };
                let res = {
                    status: hasStatusCode(302),
                    redirect: sinon.spy()
                };
                let spy = res.redirect;

                usersController.getLogin(req, res);

                expect(spy.calledOnce).to.equal(true);
            });
        });

        describe('GET /register', function() {
            it('should redirect to / when user is logged in', function() {
                let req = { user: testUser };
                let res = {
                    status: hasStatusCode(302),
                    redirect: sinon.spy()
                };
                let spy = res.redirect;

                usersController.getRegister(req, res);

                expect(spy.calledOnce).to.equal(true);
            });
        });

        describe('POST /register', function() {
            it('should register correctly and redirect to /login when successful', function() {
                let req = {
                    body: testRegUser
                };

                let res = {
                    redirect: function(path) {
                        expect(path).to.equal('/login');
                    },
                    session: {
                        error: ""
                    }
                };

                usersController.register(req, res);
            });
        });
    });

    describe('Admin Controller /admin/', function() {
        describe('POST /content/locations/:location', function() {
            it('should properly remove location and THEN redirect to /admin/content', function() {
                let req = {
                    params: {
                        location: 0
                    }
                };

                let res = {
                    redirect: function(path) {
                        expect(path).to.equal('/admin/content');
                    }
                };

                adminController.removeLocationContentControl(req, res);
            });
        });

        describe('POST /content/locations/:location',  function() {
            it('should return error and correct status when removal is invalid', function() {
                let req = {
                    params: {
                        locations: 25
                    }
                };

                let res = {
                    status: hasStatusCode(403),
                    session: {
                        error: ''
                    }
                };

                Object.defineProperty(res.session, 'error', { set: function (err) { expect(err).to.equal('invalid removal');} });

                adminController.removeLocationContentControl(req, res);
            });
        });

        describe('PUT /pending/:id', function() {
            it('should update a post correctly to isApproved', function() {
               expect('').to.equal('Pesho');
            });
        })
    });
}());