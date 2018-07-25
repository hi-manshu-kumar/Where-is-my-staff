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
    dbOperations.init();
    function redirect(){
        if(!localStorage.StaffName){
          $location.path('/login');
        }
    };
    $scope.id = localStorage.userid;
    $scope.username = localStorage.StaffName;
  });
