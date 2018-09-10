'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('LogoutCtrl', function ($scope,$localStorage,$location) {
    localStorage.clear();
    // dbOperations.init();
    // $scope.showLogout = 'hidden';

    //-----------------------------------to redirect-------------------------
    localStorage.clear();
    redirect();
    function redirect(){
      $location.path('/login');
    };


  });
