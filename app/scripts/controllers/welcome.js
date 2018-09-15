'use strict';

/**
 * @ngdoc function
 * @name staffApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the staffApp
 */
angular.module('staffApp')
  .controller('WelcomeCtrl', function () {
    dbOperations.init();
  });
