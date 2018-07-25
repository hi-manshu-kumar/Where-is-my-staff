'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:staffCtrl
 * @description
 * # StaffCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('staffCtrl', function ($scope,$localStorage,$location) {
    redirect();
    function redirect(){
        if(!$localStorage.userid){
          $location.path('/login');
        }
    };
    $scope.username = $localStorage.userid;
  });
