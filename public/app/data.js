(function () {
'use strict';

    function data($http, $q, baseUrl) {

        function get(url, queryParams) {
            var defered = $q.defer();

            $http.get(baseUrl + '/' + url, { params: queryParams })
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function post(url, postData) {
            var defered = $q.defer();

            $http.post(baseUrl + '/' + url, postData)
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function put(url, putData) {
            var defered = $q.defer();
            
            $http.put(baseUrl + '/' + url, putData, { })
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    defered.reject(error);
                });

            return defered.promise;
        }
        
        function deleteData() {
            throw new Error('Not Implemented');
        }

        function getErrorMessage(response) {
            var error = response.data.modelState;
            if (error && error[Object.keys(error)[0]][0]) {
                error = error[Object.keys(error)[0]][0];
            }
            else {
                error = response.data.message;
            }

            return error;
        }

        return {
            get: get,
            post: post,
            put: put,
            delete: deleteData
        };
    }
    
    angular.module('Imotikar.data')
            .factory('data', ['$http','$q','baseUrl', data]);
} ());