(function() {
    'use strict';

    angular.module('Imotikar.directives', []);
    angular.module('Imotikar.data', []);
    angular.module('Imotikar.controllers', ['Imotikar.data']);
    angular.module('Imotikar', ['Imotikar.controllers', 'Imotikar.directives'])
        .constant('baseUrl', 'http://localhost:6969');

    $.material.init();
}());