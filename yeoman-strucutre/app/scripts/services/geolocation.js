'use strict';

/**
 * @ngdoc service
 * @name whereApp.geoLocation
 * @description
 * # geoLocation
 * Factory in the whereApp.
 */
angular.module('whereApp')
  .factory('geoLocation', function ($q, $window) {

    var object = {};
      
    // object.getCurrentPosition = function () {
    //   var deferred = $q.defer();
  
    //     if (!$window.navigator.geolocation) {
    //         deferred.reject('Geolocation not supported.');
    //     } else {
    //         $window.navigator.geolocation.getCurrentPosition(
    //             function (position) {
    //                 deferred.resolve(position);
    //             },
    //             function (err) {
    //                 deferred.reject(err);
    //     });
    //   }

    //   return deferred.promise;
    // };

  function getCurrentPosition() {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }

        return deferred.promise;
    }

    return {
        getCurrentPosition: getCurrentPosition
    };


    // return object;
  });


