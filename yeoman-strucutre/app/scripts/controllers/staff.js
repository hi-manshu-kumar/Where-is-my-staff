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
        if(!$localStorage.StaffName){
          $location.path('/login');
        }
    };
    $scope.username = $localStorage.StaffName;
  });
