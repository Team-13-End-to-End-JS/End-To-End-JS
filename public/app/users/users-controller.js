(function() {
    "use strict";

    function UsersController(data) {
        var vm = this;

        vm.demote = function() {
            var userId = vm.uId;
            data.put('admin/users/' + userId)
                .then(function(res) {
                    location.reload();
                }, function(err) {
                    console.log(err);
                });
        };

        vm.promote = function() {
            var userId = vm.uId;
            data.post('admin/users/' + userId)
                .then(function(res) {
                    location.reload();
            }, function(err) {
                    console.log(err);
                });
        };
    }

    angular.module('Imotikar.controllers')
        .controller('UsersController', ['data', UsersController])
}());