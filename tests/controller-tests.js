(function() {
    'use strict';

    let sinon = require('sinon'),
        chai = require('chai'),
        assert = require('assert'),
        expect = chai.expect;

    let controllers = require('../server/controllers/index.js');
    let adminController = controller.admin;
    let usersController = controller.users;
    let realEstateController = controller.realEstate;

    let testUser = {_id: ObjectId("2131dsaf231254j6542dksadnkank23"),
        username: "TestUser",
        firstName: "TestFName",
        lastName: "TestLName",
        phoneNumber: "088888888",
        roles: ["admin", "regular"]};

    let testRegUser = {_id: ObjectId("14kdskml9800iokre"),
        username: "TestRegularUser",
        firstName: "TestFName",
        lastName: "TestLName",
        phoneNumber: "088888888",
        roles: ["regular"]};

    // thanks to KonstantinSimeonov
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
                    render: sinon.spy(),
                    status: hasStatusCode(302)
                };
                let spy = res.render;

                usersController.getLogin(req, res);

                expect(spy.calledOnce).to.equal(true);
            });
        });

        describe('GET /register', function() {
            it('should redirect to /when user is logged in', function() {
                let req = { user: testUser };
                let res = {
                    render: sinon.spy(),
                    status: hasStatusCode(302)
                };
                let spy = res.render;

                usersController.getLogin(req, res);

                expect(spy.calledOnce).to.equal(true);
            });
        });
    });
}());