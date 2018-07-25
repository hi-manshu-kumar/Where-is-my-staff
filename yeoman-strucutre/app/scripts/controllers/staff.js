'use strict';

/**
 * @ngdoc function
 * @name whereApp.controller:staffCtrl
 * @description
 * # StaffCtrl
 * Controller of the whereApp
 */
angular.module('whereApp')
  .controller('staffCtrl', function ($scope,$localStorage) {
    redirect();
    function redirect(){
        if(!$localStorage.userid){
            location.href =  "index.html";
        }
    };
    $scope.username = $localStorage.userid;
  });
