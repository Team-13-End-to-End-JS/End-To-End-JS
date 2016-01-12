(function() {
    "use strict";

    function ProfileController(data) {
        var vm = this;

        vm.changeInfo = function(user) {

            data.post('profile/edit', user)
                .then(function(res) {
                    location.reload();
                }, function(err) {
                    console.log(err);
                });
        }
    }

    angular.module('Imotikar.controllers')
        .controller('ProfileController', ['data', ProfileController])
}());