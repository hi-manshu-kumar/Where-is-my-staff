'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('LogoutCtrl', function ($localStorage,$location) {
    $localStorage.$reset();
    redirect();
    function redirect(){
      $location.path('/login');
    };
  });
