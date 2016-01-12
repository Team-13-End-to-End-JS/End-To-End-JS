(function() {
    "use strict";

    function PendingPostsController(data) {
        var vm = this;

        vm.approve = function(approved, id) {
            var postId = id;

            data.put('admin/pending/' + postId, { approved: approved })
                .then(function(res) {
                    location.reload();
                }, function(err) {
                    console.log(err);
                });
        };
    }

    angular.module('Imotikar.controllers')
        .controller('PendingPostsController', ['data', PendingPostsController])
}());