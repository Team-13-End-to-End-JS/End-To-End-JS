(function() {
    'use strict';

    angular.module('Imotikar.services', []);
    angular.module('Imotikar.directives', []);
    angular.module('Imotikar.controllers', ['Imotikar.services']);
    angular.module('Imotikar', ['Imotikar.controllers', 'Imotikar.directives', 'Imotikar.services'])
        .constant('baseServiceUrl', 'http://localhost:6969');

    $.material.init();
}());